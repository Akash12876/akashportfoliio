export type ChatMessage = { role: "user" | "assistant"; content: string };

export const AI_QUICK_PROMPTS = [
  "What are your top skills?",
  "Tell me about Nexiora AI",
  "Do you know Amazon Connect?",
  "How can I hire you?",
] as const;

const profile = {
  name: "Akash Pandey",
  role: "Software Engineer · Amazon Connect Developer",
  email: "pandeyakash85296@gmail.com",
  education: "BCA (2025)",
  company: "AR Group of Education",
  experience: "~2 years",
  linkedin: "https://www.linkedin.com/in/akash-pandey-5b9494315",
  highlights: [
    "Full Stack: Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma",
    "Amazon Connect: contact flows, IVR, Lex, queues, Lambda, EventBridge",
    "AWS Cloud: EC2, S3 buckets, Lambda, RDS, IAM, EventBridge, CloudWatch, Amplify",
    "AI: Nexiora AI — evidence-first search with citations & SSE streaming",
  ],
  projects: [
    "Nexiora AI — evidence-first AI research platform (Next.js + NestJS)",
    "Sales CRM SaaS with Amazon Connect integration",
    "Modern Portfolio (Next.js + Framer Motion + Live Connect chat)",
    "IPARX MEDIA, AR Group of Education, Movatobags, College Dunias",
  ],
};

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export function getPortfolioAIReply(input: string): string {
  const q = input.trim().toLowerCase();
  if (!q) return "Ask me anything about Akash's skills, projects, or how to collaborate.";

  if (includesAny(q, ["hi", "hello", "hey", "namaste"])) {
    return `Hi! I'm Akash's AI guide. He's a ${profile.role} at ${profile.company}. Ask about **Nexiora AI**, Amazon Connect, AWS, or his projects.`;
  }

  if (includesAny(q, ["skill", "stack", "tech", "expert", "know"])) {
    return `Akash specializes in:\n\n• ${profile.highlights.join("\n• ")}\n\nSee **My Skills** for Amazon Connect and AWS sections.`;
  }

  if (includesAny(q, ["nexiora", "nova", "evidence", "citation", "research platform"])) {
    return "**Nexiora AI** is Akash's evidence-first AI research platform — live retrieval from Wikipedia, OpenAlex, Hacker News & BBC RSS, trust-scored citations, SSE streaming, auth, and Razorpay subscriptions.\n\nLive: nexiora-ai-api.vercel.app\nGitHub: github.com/akashconnect-sudo/Nexiora-AI";
  }

  if (includesAny(q, ["connect", "contact center", "ivr", "ccp", "contact lens", "call center", "headset", "lex"])) {
    return "Yes — Akash is an **AWS Certified Amazon Connect Developer**. He builds contact flows, IVR (including Lex V2 + DTMF), queues, routing profiles, Lambda CRM integrations, and live chat. See the **Amazon Connect** card under My Skills.";
  }

  if (includesAny(q, ["cyber", "security", "kali", "pentest", "hack", "owasp", "burp", "nmap"])) {
    return "Akash holds LinkedIn cybersecurity certifications and focuses professionally on full-stack web, **Amazon Connect**, **AWS**, and **AI platforms** like Nexiora AI.";
  }

  if (includesAny(q, ["project", "portfolio", "work", "built", "demo"])) {
    return `Featured projects:\n\n• ${profile.projects.join("\n• ")}\n\nOpen the **Projects** section for live demos and GitHub links.`;
  }

  if (includesAny(q, ["amplify", "cloud", "aws", "s3", "bucket", "lambda", "ec2", "serverless", "rds", "dynamodb", "cognito", "deploy", "ci", "eventbridge", "cloudwatch", "vpc", "cloudfront"])) {
    return "AWS hands-on work: **EC2** (Linux instances, Nginx/Node deploys), **S3 buckets** (assets, policies, CloudFront origins), **Lambda**, **RDS/PostgreSQL**, **IAM**, **EventBridge**, **CloudWatch**, **Amplify**, and **API Gateway**. See the interactive AWS panel in **About** and the **AWS Cloud** skills card.";
  }

  if (includesAny(q, ["react", "next", "web", "frontend", "tailwind", "nestjs", "prisma"])) {
    return "For web, Akash ships with **Next.js**, React, TypeScript, Tailwind, NestJS, PostgreSQL/Prisma, and Framer Motion — including this portfolio and Nexiora AI.";
  }

  if (includesAny(q, ["flutter", "app", "mobile", "android", "ios"])) {
    return "Akash has shipped mobile work (Flutter quote app) and now focuses on full-stack web, **Amazon Connect**, **AWS**, and **AI SaaS** platforms.";
  }

  if (includesAny(q, ["hire", "contact", "collaborate", "email", "reach", "job", "freelance", "linkedin"])) {
    return `Ready to collaborate? Email **${profile.email}** or connect on [LinkedIn](${profile.linkedin}). Use the **Contact** section on this site.`;
  }

  if (includesAny(q, ["ai", "assistant", "bot", "chat", "openai"])) {
    return "You're using Akash's portfolio AI! He also built **Nexiora AI** — a production evidence-first research platform with live citations, streaming answers, and subscriptions.";
  }

  if (includesAny(q, ["who", "about", "akash", "you", "introduce", "experience"])) {
    return `${profile.name} is a ${profile.role} at ${profile.company} (${profile.experience}, ${profile.education}). He builds scalable web apps, CRM SaaS, Amazon Connect contact centers, and AI platforms with clean code and strong UX.`;
  }

  return `Great question! Akash is a ${profile.role}. Try asking about **Nexiora AI**, **Amazon Connect**, **AWS**, **projects**, or **how to hire**.`;
}
