import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure ChatJS UMD bundle works with Turbopack / webpack
  transpilePackages: ["amazon-connect-chatjs"],
  serverExternalPackages: ["@aws-sdk/client-connect"],
};

export default nextConfig;
