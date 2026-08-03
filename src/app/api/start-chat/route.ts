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

    // Trim — Vercel/env pastes often include trailing newlines that break AWS JSON signing
    const region = (process.env.AWS_REGION ?? "us-west-2").trim();
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
    const instanceId = process.env.CONNECT_INSTANCE_ID?.trim();
    const contactFlowId = process.env.CONNECT_CONTACT_FLOW_ID?.trim();

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
      // Optional attributes for your contact flow / agent CCP
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
    const message = err instanceof Error ? err.message : String(err);
    console.error("[start-chat]", err);
    return json({ error: "Failed to start Amazon Connect chat", details: message }, 500);
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
