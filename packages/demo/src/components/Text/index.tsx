import React from "react";

import { cx } from "@/helpers";

import type {
  FontVariant,
  PossibleTag,
  TextLeading,
  TextSize,
  TextTracking,
  TextWeight,
} from "./types";

import styles from "./styles.module.css";

export type TextProps = {
  id?: string;
  as?: PossibleTag;
  size?: TextSize;
  weight?: TextWeight;
  leading?: TextLeading;
  tracking?: TextTracking;
  variant?: FontVariant;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLElement>;

export const PossibleTags: PossibleTag[] = [
  "h1",
  "h2",
  "h3",
  "h6",
  "div",
  "span",
  "pre",
  "p",
];

export const Text: React.FC<TextProps> = props => {
  const {
    id,
    as = "div",
    size = "md",
    weight = "normal",
    leading = "normal",
    tracking = "normal",
    variant = "body",
    className,
    children,
    style,
    ...rest
  } = props;

  const Component = as && PossibleTags.includes(as) ? as : "div";
  const sizeStyles = styles[`size-${size}`];
  const weightStyles = styles[`weight-${weight}`];
  const leadingStyles = styles[`lineHeight-${leading}`];
  const trackingStyles = styles[`letterSpacing-${tracking}`];
  const variantStyles = styles[`variant-${variant}`];
  const hasColorProp =
    (className && className.includes("text-web-")) || (style && style.color);
  const colorStyles = cx({
    "text-web-readable": !hasColorProp,
    "text-web-primary": ["h1", "h2", "h3", "h4", "h5", "h6"].includes(as),
  });
  const classNames = cx(
    styles.text,
    "transition-colors duration-150 ease-out",
    "whitespace-pre-wrap",
    styles[as],
    sizeStyles,
    colorStyles,
    weightStyles,
    variantStyles,
    trackingStyles,
    leadingStyles,
    className
  );

  return (
    <Component {...rest} id={id} className={classNames} style={style}>
      {children}
    </Component>
  );
};
