import localFont from "@next/font/local";

export const serif = localFont({
  src: [
    {
      path: "../public/fonts/LukasSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LukasSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/LukasSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});
