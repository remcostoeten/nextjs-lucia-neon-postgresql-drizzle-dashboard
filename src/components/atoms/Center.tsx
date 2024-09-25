import { ElementType, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CenterProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
  fullScreen?: boolean;
  center?: "middle" | "vertical" | "horizontal";
} & HTMLAttributes<HTMLElement>;

/**
 * Center component to center its children both vertically and horizontally.
 *
 * @example
 * <Center as="section" className="custom-class" center="middle" fullScreen>
 *   <p>Centered content</p>
 * </Center>
 */
export const Center = <T extends ElementType = "div">({
  as,
  className,
  fullScreen = false,
  children,
  center = "middle",
  ...props
}: CenterProps<T>) => {
  const Component = as || "div";

  const classes = twMerge(
    fullScreen ? "w-screen h-screen" : "",
    center === "middle"
      ? "grid place-items-center"
      : center === "vertical"
        ? "flex items-center"
        : "flex justify-center",
    className,
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

/**
 * AbsoluteCenter component to absolutely center its children both vertically and horizontally.
 *
 * @example
 * <AbsoluteCenter as="section" className="custom-class" center="middle" fullScreen>
 *   <p>Absolutely centered content</p>
 * </AbsoluteCenter>
 */
export const AbsoluteCenter = <T extends ElementType = "div">({
  as,
  className,
  fullScreen = false,
  children,
  center = "middle",
  ...props
}: CenterProps<T>) => {
  const Component = as || "div";

  const classes = twMerge(
    fullScreen ? "w-screen h-screen" : "",
    center === "middle"
      ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      : center === "vertical"
        ? "absolute top-1/2 transform -translate-y-1/2"
        : "absolute left-1/2 transform -translate-x-1/2",
    className,
  );

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};
