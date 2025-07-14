import React, { ButtonHTMLAttributes } from "react";

import { Tooltip } from "@/components/Tooltip";
import { cx } from "@/helpers";

import globalStyles from "@/styles/globals.module.css";

export type GhostButtonProps = {
  tooltipId?: string;
  tooltipContent?: string;
  active?: boolean;
  children?: React.ReactNode;
  buttonClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const GhostButton: React.FC<GhostButtonProps> = props => {
  const {
    name,
    tooltipId,
    tooltipContent,
    active,
    className,
    buttonClassName,
    children,
    ...rest
  } = props;

  return (
    <div className={cx("flex relative rounded-lg size-9", className)}>
      <button
        {...rest}
        className={cx(
          globalStyles.buttonReset,
          globalStyles.interactive,
          "w-full h-full flex items-center justify-center rounded-lg",
          props.disabled && "opacity-50 cursor-not-allowed",
          !props.disabled && "hover:bg-web-ghost-button-hover",
          active && "bg-web-ghost-button-hover",
          buttonClassName
        )}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place="top">
        {children}
      </button>
      {tooltipId ? (
        <Tooltip id={tooltipId} place="left" className="z-80" />
      ) : null}
    </div>
  );
};
