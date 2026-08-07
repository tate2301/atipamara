import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      { source: "/experiments/dynamic-island", destination: "/notes/the-island-that-breathes", permanent: true },
      { source: "/experiments/macos-dock", destination: "/notes/the-dock-is-a-bell-curve", permanent: true },
      { source: "/experiments/spring-configurator", destination: "/notes/springs-not-durations", permanent: true },
      { source: "/experiments/oklch-color", destination: "/notes/why-your-gradients-turn-grey", permanent: true },
      { source: "/experiments/variable-font-morph", destination: "/", permanent: false },
      { source: "/notes/a-word-that-breathes", destination: "/", permanent: false },
      { source: "/writing/fixing-wsl-localhost-issues", destination: "/notes/the-day-localhost-lied", permanent: true },
      { source: "/experiments/:slug*", destination: "/", permanent: false },
      { source: "/writing", destination: "/", permanent: false },
      { source: "/photos", destination: "/", permanent: false },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
