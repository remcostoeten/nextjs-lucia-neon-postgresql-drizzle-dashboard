import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeContentProps {
  children: string;
  language: string;
}

const CodeContent: React.FC<CodeContentProps> = ({ children, language }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers={true}
      wrapLines={true}
      wrapLongLines={true}
      customStyle={{
        margin: 0,
        padding: "0.5rem",
        fontSize: "0.75rem",
        lineHeight: "1.2",
        background: "transparent",
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeContent;
