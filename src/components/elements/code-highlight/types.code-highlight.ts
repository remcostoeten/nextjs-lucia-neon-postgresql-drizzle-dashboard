import { ReactNode } from "react";

export type CodeContentProps = {
  children: ReactNode;
  language?:
    | "language"
    | "jsx"
    | "tsx"
    | "javascript"
    | "typescript"
    | "json"
    | "bash"
    | "shell"
    | "python"
    | "java"
    | "csharp"
    | "cpp"
    | "css"
    | "scss"
    | "sass";
};

export type CodeHighlightProps = {
  title: string;
  fileIcon?: string;
  avatarSrc?: string;
  language?: string;
  children?: React.ReactNode;
  disableMinWidth?: boolean;
};
