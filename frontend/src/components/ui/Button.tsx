import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PropertiesButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  texto: ReactNode;
}

export const Button = ({ texto, className, ...props }: PropertiesButton) => {
  return (
    <button
      className={`bg-accent cursor-pointer text-xs px-4 py-2 rounded-lg font-medium ${className}`}
      {...props}
    >
      {texto}
    </button>
  );
};
