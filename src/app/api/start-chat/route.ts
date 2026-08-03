import { NextResponse } from "next/server";
import { ConnectClient, StartChatContactCommand } from "@aws-sdk/client-connect";

/** CORS so the widget can call this API from any deployed origin. */
const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

function cleanEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;
  // Strip BOM, quotes, and all control chars from Vercel/env pastes
  return value
    .replace(/^\uFEFF/, "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
}

/**
 * AWS sometimes returns JSON with raw newlines inside string values (signature help text).
 * The SDK then throws SyntaxError "Bad control character..." and hides the real fault.
 */
async function explainAwsError(err: unknown): Promise<string> {
  if (!(err instanceof Error)) return String(err);

  const withResponse = err as Error & {
    $response?: {
      statusCode?: number;
      headers?: Record<string, string>;
      body?: { transformToString?: () => Promise<string> } | string;
    };
    $metadata?: { httpStatusCode?: number };
  };

  const errorType =
    withResponse.$response?.headers?.["x-amzn-errortype"] ||
    withResponse.$response?.headers?.["x-amzn-ErrorType"];

  let bodyText = "";
  try {
    const body = withResponse.$response?.body;
    if (body && typeof body === "object" && typeof body.transformToString === "function") {
      bodyText = await body.transformToString();
    } else if (typeof body === "string") {
      bodyText = body;
    }
  } catch {
    // ignore body read failures
  }

  if (
    errorType?.includes("InvalidSignatureException") ||
    bodyText.includes("InvalidSignatureException") ||
    bodyText.includes("signature we calculated does not match")
  ) {
    return "AWS credentials invalid (InvalidSignatureException). Create a new IAM Access Key, update AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY in Vercel/.env.local (no quotes), then redeploy.";
  }

  if (errorType?.includes("UnrecognizedClientException") || bodyText.includes("security token")) {
    return "AWS Access Key ID is invalid or deactivated. Create a new IAM key and update env vars.";
  }

  if (errorType?.includes("AccessDenied") || bodyText.includes("AccessDenied")) {
    return "IAM user is missing connect:StartChatContact permission on this Connect instance.";
  }

  if (err.message.includes("Bad control character") && bodyText) {
    try {
      const sanitized = bodyText.replace(/[\u0000-\u001F\u007F]+/g, " ");
      const parsed = JSON.parse(sanitized) as { message?: string; Message?: string };
      return parsed.message || parsed.Message || `${errorType || "AWS error"}: ${sanitized.slice(0, 240)}`;
    } catch {
      return `${errorType || "AWS error"} (HTTP ${withResponse.$response?.statusCode ?? "?"}): ${bodyText.slice(0, 240)}`;
    }
  }

  return err.message;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

/**
 * POST /api/start-chat
 * Starts an Amazon Connect Chat contact and returns participant credentials for ChatJS.
 * Body: { name: string, email?: string, topic?: string }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body?.name ?? "").trim();

    if (!name) {
      return json({ error: "name is required" }, 400);
    }

    const region = cleanEnv(process.env.AWS_REGION) ?? "us-west-2";
    const accessKeyId = cleanEnv(process.env.AWS_ACCESS_KEY_ID);
    const secretAccessKey = cleanEnv(process.env.AWS_SECRET_ACCESS_KEY);
    const instanceId = cleanEnv(process.env.CONNECT_INSTANCE_ID);
    const contactFlowId = cleanEnv(process.env.CONNECT_CONTACT_FLOW_ID);

    if (!accessKeyId || !secretAccessKey || !instanceId || !contactFlowId) {
      return json(
        {
          error:
            "Missing AWS Connect env vars. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, CONNECT_INSTANCE_ID, CONNECT_CONTACT_FLOW_ID.",
        },
        500
      );
    }

    const client = new ConnectClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const email = body?.email ? String(body.email).trim() : undefined;
    const topic = body?.topic ? String(body.topic).trim() : undefined;

    const command = new StartChatContactCommand({
      InstanceId: instanceId,
      ContactFlowId: contactFlowId,
      ParticipantDetails: {
        DisplayName: name,
      },
      Attributes: {
        customerName: name,
        ...(email ? { customerEmail: email } : {}),
        ...(topic ? { topic } : {}),
      },
      SupportedMessagingContentTypes: ["text/plain"],
    });

    const result = await client.send(command);

    const contactId = result.ContactId;
    const participantId = result.ParticipantId;
    const participantToken = result.ParticipantToken;

    if (!contactId || !participantId || !participantToken) {
      return json(
        { error: "StartChatContact succeeded but missing contact credentials", raw: result },
        500
      );
    }

    return json({
      contactId,
      participantId,
      participantToken,
      region,
    });
  } catch (err) {
    const details = await explainAwsError(err);
    console.error("[start-chat]", details, err);
    return json({ error: "Failed to start Amazon Connect chat", details }, 500);
  }
}

export async function GET() {
  return json({ error: "Method not allowed. Use POST." }, 405);
}

export async function PUT() {
  return json({ error: "Method not allowed. Use POST." }, 405);
}

export async function DELETE() {
  return json({ error: "Method not allowed. Use POST." }, 405);
}
