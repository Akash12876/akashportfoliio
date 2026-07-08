export type ChatMessage = { role: "user" | "assistant"; content: string };

export const AI_QUICK_PROMPTS = [
  "What are your top skills?",
  "Tell me about your projects",
  "Do you know AWS cloud?",
  "How can I hire you?",
] as const;

const profile = {
  name: "Akash Pandey",
  role: "Full Stack Developer · AWS Amplify · Cloud",
  email: "pandeyakash85296@gmail.com",
  education: "BCA (2025)",
  highlights: [
    "Web: React, Next.js, TypeScript, Tailwind",
    "Mobile: Flutter, React Native",
    "AWS Amplify: hosting, CI/CD, serverless APIs",
    "Cloud: AWS S3, EC2, Lambda, CloudFront, RDS",
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
    return `Akash specializes in:\n\n• ${profile.highlights.join("\n• ")}\n\nScroll to **My Skills** for **AWS Amplify** and **Cloud** sections.`;
  }

  if (includesAny(q, ["cyber", "security", "kali", "pentest", "hack", "owasp", "burp", "nmap"])) {
    return "Akash focuses on full-stack development and AWS cloud. See **AWS Amplify** and **Cloud** under My Skills — S3, Lambda, EC2, and deployment.";
  }

  if (includesAny(q, ["project", "portfolio", "work", "built", "demo"])) {
    return `Featured projects:\n\n• ${profile.projects.join("\n• ")}\n\nOpen the **Projects** section below Skills for live demos and GitHub links.`;
  }

  if (includesAny(q, ["amplify", "cloud", "aws", "s3", "lambda", "ec2", "serverless", "devops", "docker", "kubernetes", "deploy", "ci"])) {
    return "Cloud is a core strength: **AWS Amplify**, S3, EC2, Lambda, CloudFront, RDS, and CI/CD. Check **AWS Amplify** and **Cloud** under My Skills.";
  }

  if (includesAny(q, ["react", "next", "web", "frontend", "tailwind"])) {
    return "For web, Akash ships polished UIs with React, Next.js, TypeScript, Tailwind CSS, and Framer Motion — exactly what powers this portfolio's animations and performance.";
  }

  if (includesAny(q, ["flutter", "app", "mobile", "android", "ios"])) {
    return "On mobile, Akash works with Flutter (Dart), React Native, and API integrations — including a published Random Quote Generator app.";
  }

  if (includesAny(q, ["hire", "contact", "collaborate", "email", "reach", "job", "freelance"])) {
    return `Ready to collaborate? Email **${profile.email}** or use the **Contact** section. You can also connect on LinkedIn and Instagram from the footer.`;
  }

  if (includesAny(q, ["ai", "assistant", "bot", "chat"])) {
    return "You're already using it! This portfolio includes an AI assistant trained on Akash's profile — ask about skills, AWS cloud, projects, or hiring anytime.";
  }

  if (includesAny(q, ["who", "about", "akash", "you", "introduce"])) {
    return `${profile.name} is a ${profile.role} (${profile.education}). He delivers real-world web, app, and cloud solutions with clean code and strong UX.`;
  }

  return `Great question! Akash is a ${profile.role}. Try asking about **skills**, **AWS cloud**, **projects**, or **how to hire**. Or tap a quick prompt below.`;
}
