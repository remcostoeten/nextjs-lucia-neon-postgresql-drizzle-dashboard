import * as React from "react";

import { cn } from "cn";

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-full bg-neutral-200", className)}
      {...props}
    />
  );
};
Skeleton.displayName = "Skeleton";

export { Skeleton };
