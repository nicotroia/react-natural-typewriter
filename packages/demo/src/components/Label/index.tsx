import React from "react";

import { Text, TextProps } from "@/components/Text";
import { cx } from "@/helpers";

export type Props = {
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
} & TextProps;

export const Label: React.FC<Props> = props => {
  const { htmlFor = "", children, className, style, ...rest } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={cx("block leading-none mb-0")}
      style={style}>
      {typeof children === "string" ? (
        <Text
          size="md"
          variant="primary"
          className={cx("text-web-readable-dim", className)}
          {...rest}>
          {children}
        </Text>
      ) : (
        children
      )}
    </label>
  );
};
