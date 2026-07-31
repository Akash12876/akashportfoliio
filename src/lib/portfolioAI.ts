export type ChatMessage = { role: "user" | "assistant"; content: string };

export const AI_QUICK_PROMPTS = [
  "What are your top skills?",
  "Tell me about your projects",
  "Do you know Amazon Connect?",
  "How can I hire you?",
] as const;

const profile = {
  name: "Akash Pandey",
  role: "Full Stack Developer · Amazon Connect · AWS",
  email: "pandeyakash85296@gmail.com",
  education: "BCA (2025)",
  highlights: [
    "Web: React, Next.js, TypeScript, Tailwind",
    "Amazon Connect: contact flows, IVR, CCP, Contact Lens",
    "AWS: Amplify, S3, Lambda, EC2, RDS, API Gateway",
    "Cloud: Cognito, DynamoDB, CloudFront, IAM, CloudWatch",
  ],
  projects: [
    "Modern Portfolio (Next.js + Framer Motion)",
    "IPARX MEDIA — digital solutions startup site",
    "AR Group of Education, College Dunias, Movatobags",
    "Random Quote Generator (Flutter)",
  ],
};

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

export function getPortfolioAIReply(input: string): string {
  const q = input.trim().toLowerCase();
  if (!q) return "Ask me anything about Akash's skills, projects, or how to collaborate.";

  if (includesAny(q, ["hi", "hello", "hey", "namaste"])) {
    return `Hi! I'm Akash's AI guide. I can walk you through his ${profile.role} work, projects, and how to get in touch. What would you like to know?`;
  }

  if (includesAny(q, ["skill", "stack", "tech", "expert", "know"])) {
    return `Akash specializes in:\n\n• ${profile.highlights.join("\n• ")}\n\nScroll to **My Skills** for **Amazon Connect** and **AWS** sections.`;
  }

  if (includesAny(q, ["connect", "contact center", "ivr", "ccp", "contact lens", "call center", "headset"])) {
    return "Yes — Akash works with **Amazon Connect**: contact flows, IVR routing, Agent Workspace, CCP integration, Contact Lens analytics, and Lex chatbots. See the **Amazon Connect** card under My Skills.";
  }

  if (includesAny(q, ["cyber", "security", "kali", "pentest", "hack", "owasp", "burp", "nmap", "devops"])) {
    return "Akash focuses on full-stack web, **Amazon Connect**, and **AWS**. Check My Skills for Connect contact centers and the full AWS stack.";
  }

  if (includesAny(q, ["project", "portfolio", "work", "built", "demo"])) {
    return `Featured projects:\n\n• ${profile.projects.join("\n• ")}\n\nOpen the **Projects** section below Skills for live demos and GitHub links.`;
  }

  if (includesAny(q, ["amplify", "cloud", "aws", "s3", "lambda", "ec2", "serverless", "rds", "dynamodb", "cognito", "deploy", "ci"])) {
    return "AWS is a core strength: **Amplify**, S3, EC2, Lambda, RDS, DynamoDB, Cognito, API Gateway, CloudFront, IAM, and CloudWatch — plus **Amazon Connect**. See the **AWS** card under My Skills.";
  }

  if (includesAny(q, ["react", "next", "web", "frontend", "tailwind"])) {
    return "For web, Akash ships polished UIs with React, Next.js, TypeScript, Tailwind CSS, and Framer Motion — exactly what powers this portfolio's animations and performance.";
  }

  if (includesAny(q, ["flutter", "app", "mobile", "android", "ios"])) {
    return "Akash has shipped mobile work (including a Flutter quote app) and now focuses mainly on web, **Amazon Connect**, and **AWS** cloud.";
  }

  if (includesAny(q, ["hire", "contact", "collaborate", "email", "reach", "job", "freelance"])) {
    return `Ready to collaborate? Email **${profile.email}** or use the **Contact** section. You can also connect on LinkedIn and Instagram from the footer.`;
  }

  if (includesAny(q, ["ai", "assistant", "bot", "chat"])) {
    return "You're already using it! This portfolio includes an AI assistant trained on Akash's profile — ask about skills, Amazon Connect, AWS, projects, or hiring anytime.";
  }

  if (includesAny(q, ["who", "about", "akash", "you", "introduce"])) {
    return `${profile.name} is a ${profile.role} (${profile.education}). He delivers real-world web, contact-center, and cloud solutions with clean code and strong UX.`;
  }

  return `Great question! Akash is a ${profile.role}. Try asking about **skills**, **Amazon Connect**, **AWS**, **projects**, or **how to hire**. Or tap a quick prompt below.`;
}
