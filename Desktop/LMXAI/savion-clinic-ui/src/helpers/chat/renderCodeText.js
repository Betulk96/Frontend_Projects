import DOMPurify from "dompurify";
import Image from "next/image";
import parse from "html-react-parser";
import React from "react";
import { handleCopyClick } from "./misc";

export const renderCodeText = (html, index, isCopied, copyClipboardSetter) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  const parsedHtml = parse(sanitizedHtml);

  const contentElements = [];
  
  React.Children.forEach(parsedHtml, (child, childIndex) => {
    if (!child || typeof child === 'string') {
      contentElements.push(child);
      return;
    }

    if (child.type === "p") {
      contentElements.push(
        <p key={`text-${index}-${childIndex}`}>{child.props?.children}</p>
      );
    } else if (child.type === "h3") {
      contentElements.push(
        <h3 key={`heading-${index}-${childIndex}`}>{child.props?.children}</h3>
      );
    } else if (child.type === "ol" || child.type === "ul") {
      const filteredListItems = React.Children.toArray(child.props?.children).filter(listItem => 
        listItem.props?.children && React.Children.count(listItem.props.children) > 0
      );

      contentElements.push(
        <child.type key={`list-${index}-${childIndex}`}>
          {filteredListItems.map((listItem, listItemIndex) => (
            <li key={`list-item-${index}-${childIndex}-${listItemIndex}`}>
              {listItem.props?.children}
            </li>
          ))}
        </child.type>
      );
    } else if (child.type === "pre" && child.props?.children && child.props.children.type === "code") {
      const codeClassName = child.props.children.props?.className;
      const codeContent = child.props.children.props?.children;

      contentElements.push(
        <div key={`code-${index}-${childIndex}`} className="code-block">
         
          <div className="code-button-div">
            <div className="code-language">{codeClassName?.slice(9)}</div>
            <button
              className="copy-button"
              onClick={() => handleCopyClick(codeContent, copyClipboardSetter)}
            >
              <Image
                src={
                  isCopied
                    ? "/icons/actions/copy/copied-icon.svg"
                    : "/icons/actions/copy/copy-icon.svg"
                }
                width={24}
                height={24}
                alt={isCopied ? "copied-icon" : "copy-icon"}
              />
              <span></span>
            </button>
          </div>
          <pre>
            <code className={codeClassName}>{codeContent}</code>
          </pre>
        </div>
      );
    } else {
      contentElements.push(child);
    }
  });
  return contentElements;
};
