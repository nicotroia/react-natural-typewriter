import React, { InputHTMLAttributes, Ref, forwardRef } from "react";

import { Label } from "@/components/Label";
import { cx } from "@/helpers";

import globalStyles from "@/styles/globals.module.css";

export type TextInputProps = {
  name?: string;
  label?: string;
  hasError?: boolean;
  errorLabel?: string;
  className?: string;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef(
  (props: TextInputProps, ref: Ref<HTMLInputElement>) => {
    const {
      name,
      label,
      hasError,
      errorLabel,
      containerClassName,
      containerStyle,
      className,
      children,
      ...rest
    } = props;

    return (
      <div
        className={cx(
          "relative flex w-full h-full flex-col",
          containerClassName
        )}
        style={containerStyle}>
        {label ? (
          <div className="absolute -top-6 left-0">
            <Label
              htmlFor={name}
              variant="code"
              className="pointer-events-none">
              {label}
            </Label>
          </div>
        ) : null}
        <input
          {...rest}
          ref={ref}
          id={name}
          name={name}
          className={cx(
            "relative",
            globalStyles.interactive,
            "h-[36px] min-w-[100px] rounded-md",
            "px-3",
            "bg-web-input",
            "border border-web-input-border",
            "hover:bg-web-input-hover",
            "text-web-readable",
            hasError && "border-web-danger",
            className
          )}
          aria-invalid={!!hasError}>
          {children}
        </input>
        {errorLabel && <Label className="text-web-danger">{errorLabel}</Label>}
      </div>
    );
  }
);
