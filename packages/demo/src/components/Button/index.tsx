import React, { ButtonHTMLAttributes } from "react";

import { Text } from "@/components/Text";
import { cx } from "@/helpers";

import globalStyles from "@/styles/globals.module.css";

export type ButtonProps = {
  href?: string;
  pending?: boolean;
  className?: string;
  disabled?: boolean;
  target?: string;
} & ButtonHTMLAttributes<
  HTMLButtonElement | HTMLAnchorElement | HTMLInputElement
>;

export const Button: React.FC<ButtonProps> = props => {
  const {
    href,
    type = "button",
    pending,
    className,
    disabled,
    children,
    ...rest
  } = props;

  const classes = cx(
    "inline-flex justify-center items-center rounded-md border border-transparent px-4 py-2",
    "h-input",
    "border border-solid border-web-border",
    !disabled &&
      "hover:bg-web-ghost-button-hover hover:border-web-ghost-button-hover",
    globalStyles.interactive,
    "focus-visible:bg-web-ghost-button-hover",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const renderContent = () => {
    return (
      <div className="flex items-center gap-2">
        {typeof children === "string" ? (
          <Text className="text-web-readable text-md tracking-wide self-center">
            {children}
          </Text>
        ) : (
          children
        )}
      </div>
    );
  };

  if (href) {
    return (
      <a href={href} {...rest} className={classes}>
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      {...rest}
      aria-disabled={disabled}
      disabled={disabled}
      className={classes}>
      {renderContent()}
    </button>
  );
};
