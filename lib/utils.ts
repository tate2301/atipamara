import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export const cn = (...classes: (string | undefined | null | false)[]) =>
  clsx(twMerge(classes.filter(Boolean)));
