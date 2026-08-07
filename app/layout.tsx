import type { Metadata } from "next";
import "@fontsource/atkinson-hyperlegible/latin-400.css";
import "@fontsource/atkinson-hyperlegible/latin-400-italic.css";
import "@fontsource/atkinson-hyperlegible-mono/latin-400.css";
import "@fontsource/libertinus-serif/latin-400.css";
import "@fontsource/libertinus-serif/latin-400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tatenda Chinyamakobvu",
  description:
    "A short memoir of things built and things learned. Product engineer in Harare, Zimbabwe.",
  icons: "./favicon.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('theme');if(s)document.documentElement.setAttribute('data-theme',s);else if(window.matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.setAttribute('data-theme','dark')}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
