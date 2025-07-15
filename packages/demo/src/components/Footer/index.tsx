import Link from "next/link";
import React from "react";

import { cx } from "@/helpers";

export type FooterProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Footer: React.FC<FooterProps> = props => {
  const { className } = props;

  return (
    <div className={cx("flex w-full items-center gap-1.5 py-8", className)}>
      <span className="text-web-readable-dim">2025,</span>
      <Link href="https://nicotroia.com" target="_blank">
        internet-nico
      </Link>
    </div>
  );
};
