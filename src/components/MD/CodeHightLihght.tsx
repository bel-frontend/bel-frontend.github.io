"use client";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeHightLightProps {
  code: string;
  language: string;
}

const CodeHightLight: React.FC<CodeHightLightProps> = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={darcula}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHightLight;
