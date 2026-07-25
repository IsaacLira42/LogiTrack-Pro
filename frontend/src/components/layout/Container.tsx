import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export const Container = ({ children, className }: ContainerProps) => {
  return <div className={`px-8 ${className ?? ""}`}>{children}</div>;
};
