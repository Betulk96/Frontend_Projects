import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Image from "next/image";
import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";
import { handleCopyCode } from "@/helpers/chat/chat-message-helper";

const MarkdownRenderer = ({
  content,
  index,
  setCopySuccess,
  setCopiedIndex,
  copiedIndex,
}) => {
  // console.log("content", content);
  const fixedContent = content
    .replace(/\$([0-9a-zA-Z\\^{}+\-*/ ]+)\$/g, (_, expr) => `$${expr}$`)
    .replace(/\$ +/g, "$")
    .replace(/ +\$/g, "$");

  const renderCodeBlock = (props) => {
    const { node, inline, className, children, ...restProps } = props;

    const language = className
      ? className.replace("hljs", "").replace("language-", "").trim()
      : null;

    const handleCopyClick = (event) => {
      const codeElement = event.currentTarget
        .closest(".code-block-container")
        .querySelector(".code-block");
      handleCopyCode(codeElement, index, setCopySuccess, setCopiedIndex);
      setCopiedIndex(index);
    };

    if (!inline && !language) {
      return (
        <span className="code-inline" {...restProps}>
          {children}
        </span>
      );
    }

    return !inline ? (
      <div className="code-block-container">
        {language && (
          <div className="code-block-header">
            <span className="code-language">{language}</span>
            <button
              className="copy-button"
              onClick={handleCopyClick}
              aria-label="Copy Code"
            >
              <Image
                src={
                  index === copiedIndex
                    ? "/icons/actions/copy/copied-white.svg"
                    : "/icons/actions/copy/copy-icon-white.svg"
                }
                width={24}
                height={24}
                alt="copy-icon"
              />
            </button>
          </div>
        )}
        <pre className="code-block m-2">
          <code
            className={`language-${language || "plaintext"}`}
            {...restProps}
          >
            {children}
          </code>
        </pre>
      </div>
    ) : (
      <code className={className} {...restProps}>
        {children}
      </code>
    );
  };

  return (
    <ReactMarkdown    
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight, rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        code: renderCodeBlock,
        table: ({ node, ...props }) => (
          <div className="w-full overflow-x-auto my-4">
            <table
              className="min-w-max text-sm shadow-md rounded-lg"
              {...props}
            />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead
            className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-100 dark:to-gray-800 text-left font-semibold"
            {...props}
          />
        ),
        tbody: ({ node, ...props }) => <tbody className="" {...props} />,
        tr: ({ node, ...props }) => (
          <tr
            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 border-color3 dark:border-color33"
            {...props}
          />
        ),
        th: ({ node, ...props }) => (
          <th
            className="p-2 border  text-sm font-medium text-gray-800 dark:text-gray-100 bg-color4 dark:bg-color44 "
            {...props}
          />
        ),
        td: ({ node, ...props }) => (
          <td
            className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-2 border  text-gray-800 dark:text-gray-200 "
            {...props}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
