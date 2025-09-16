"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { swalToast } from "../alert/swal";
import TurndownService from "turndown";

export const useScreenSizes = () => {
  const [screenSizes, setScreenSizes] = useState({
    isSmallScreen: false,
    isMiddleScreen: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSizes({
        isSmallScreen: width < 768,
        isMiddleScreen: width >= 768 && width < 1024,
      });
    };

    handleResize(); // Check screen size on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSizes;
};

export const getMaxItemsToShow = (isSmallScreen, isMiddleScreen) => {
  if (isSmallScreen) return 5; // Küçük ekran
  if (isMiddleScreen) return 7; // Orta ekran
  return 10; // Büyük ekran
};

export const extractMathExpressions = (content) => {
  // Daha kapsamlı regex - nested braces ve özel durumları da yakalar
  const mathRegex =
    /(\$\$[\s\S]*?\$\$|\$[^$\n]*?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\})/g;
  return content.match(mathRegex) || [];
};

export const preprocessMathExpression = (expression) => {
  let processed = expression
    .replace(/^\$\$|\$\$$/g, "") // Remove block math delimiters
    .replace(/^\$|\$$/g, "") // Remove inline math delimiters
    .replace(/^\\\[|\\\]$/g, "") // Remove KaTeX block delimiters
    .replace(/^\\\(|\\\)$/g, "") // Remove KaTeX inline delimiters
    .replace(/\\begin\{[^}]+\}|\\end\{[^}]+\}/g, "") // Clean LaTeX environments
    // Improved exponent handling
    .replace(/([a-zA-Z0-9]+)\^(\d+)/g, "$1^{$2}")
    .replace(/([a-zA-Z0-9]+)\^(\([^)]+\))/g, "$1^{$2}")
    // Fix common LaTeX issues
    .replace(/\\frac(\w)/g, "\\frac $1") // Space after frac if missing
    .replace(/(\w)\\frac/g, "$1 \\frac") // Space before frac if missing
    .trim();

  return processed;
};

export const preprocessContent = (content) => {
  const superscriptMap = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };

  // Unicode superscript karakterlerini LaTeX formatına dönüştür
  const convertSuperscriptToLatex = (text) => {
    const superscriptRegex = /([a-zA-Z0-9]+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g;
    return text.replace(superscriptRegex, (match, base, superscript) => {
      const normalExponent = superscript
        .split("")
        .map((char) => {
          const entry = Object.entries(superscriptMap).find(
            ([key, value]) => value === char
          );
          return entry ? entry[0] : char;
        })
        .join("");

      return `$${base}^{${normalExponent}}$`;
    });
  };

  // Caret expressions'ları LaTeX'e dönüştür - daha güvenli versiyon
  const convertCaretExpressionsToLatex = (text) => {
    // Zaten $ içinde olanları atlayalım
    return text.replace(
      /(?<!\$[^$]*?)([a-zA-Z]+\d*|\d+[a-zA-Z]+|\d+)\^(\([^)]+\)|[a-zA-Z0-9]+)(?![^$]*?\$)/g,
      (match, base, exp) => {
        const exponent =
          exp.startsWith("(") && exp.endsWith(")") ? exp.slice(1, -1) : exp;
        return `$${base}^{${exponent}}$`;
      }
    );
  };

  // n*(2) gibi formatları LaTeX'e dönüştür
  const convertSpecialNotations = (text) => {
    return text.replace(/([a-zA-Z0-9]+)\*\(([^)]+)\)/g, "$1^{($2)}");
  };

  // İşlem sırası önemli - step by step
  // console.log("Step 1 - Original:", content);

  // 1. Önce superscript karakterleri dönüştür
  content = convertSuperscriptToLatex(content);
  // console.log("Step 2 - After superscript:", content);

  // 2. Özel notasyonları dönüştür
  content = convertSpecialNotations(content);
  // console.log("Step 3 - After special notations:", content);

  // 3. f(t) = ... formatını işle
  content = content.replace(/f\(t\)\s*=\s*([^\n]+)/gi, (match, expr) => {
    return `$$f(t) = ${expr.trim()}$$`;
  });
  // console.log("Step 4 - After function format:", content);

  // 4. Güvenli olmayan karakterleri temizle
  const sanitizeUnsafeLatexChars = (text) => text.replace(/€/g, "\\euro");
  content = sanitizeUnsafeLatexChars(content);

  // 5. Math expression'ları işle
  const mathExpressions = extractMathExpressions(content);
  // console.log("Step 5 - Found math expressions:", mathExpressions);

  if (mathExpressions.length > 0) {
    mathExpressions.forEach((expression) => {
      let cleanExpression = preprocessMathExpression(expression);
      cleanExpression = sanitizeUnsafeLatexChars(cleanExpression);
      // Sadece eğer expression zaten $ ile sarılı değilse sar
      if (!expression.startsWith("$$") && !expression.startsWith("$")) {
        content = content.replace(expression, `$$${cleanExpression}$$`);
      } else {
        content = content.replace(
          expression,
          expression.startsWith("$$")
            ? `$$${cleanExpression}$$`
            : `$${cleanExpression}$`
        );
      }
    });
  }

  // 6. KaTeX'e uygun LaTeX dönüşümleri
  content = content
    .replace(/\\\[(.*?)\\\]/gs, "$$$1$$")
    .replace(/\\\((.*?)\\\)/gs, "\\($1\\)");

  // 7. Son olarak caret expressions'ları dönüştür (çakışmaları önlemek için)
  content = convertCaretExpressionsToLatex(content);
  // console.log("Step 7 - After caret conversion:", content);

  // 8. Çift/üçlü $ işaretlerini temizle - daha akıllı versiyon
  content = content
    .replace(/\$\$\$+/g, "$$")
    .replace(/\$\$\s*\$\$/g, "$$")
    .replace(/\$\s*\$\s*\$/g, "$");

  // console.log("Final result:", content);
  return content.trim();
};

export const formatText = (content) => {
  if (!content) return "";

  const sections = content
    .replace(/---/g, "\n---\n") // Bölücüleri ayır
    .replace(/##/g, "\n## ") // Başlıkları biçimlendir
    .replace(/###/g, "\n### ") // Alt başlıkları biçimlendir
    .replace(/\.\.\./g, "\n") // Eğer ... varsa onu da yeni satır yap
    .replace(/([A-D])\./g, "\n$1.") // Şıklar yeni satırda olsun
    .replace(/([€\d])([A-Z])/g, "$1\n$2") // Sayı-sonrası soru başlangıcı ayır
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Kelime ayrımı

    .replace(/([^\n])\[/g, "$1\n[") // Köşeli parantezden önce boşluk
    .replace(/\]([^\n])/g, "]\n$1") // Köşeli parantezden sonra boşluk
    .replace(/([^\n])(\([^)]+\))/g, "$1\n$2") // Parantez içeriği ayır

    .replace(/\n{2,}/g, "\n") // Fazla boşlukları temizle
    .trim();

  return sections;
};
export const removeDateAndEllipsis = (content) => {
  const pattern = /^(.*?)\.\.\.\s*/;
  return content.replace(pattern, "").trim();
};

export const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
  } catch (error) {
    return "/default-favicon.svg"; // Varsayılan favicon
  }
};

export const handleCopyCode = (
  codeElement,
  index,
  setCopySuccess,
  setCopiedIndex
) => {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    // Tarayıcıda çalıştığını kontrol et
    if (codeElement) {
      const codeText = codeElement.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        setCopySuccess(true);
        setCopiedIndex(index);
        // console.log("Copied index:", index);
        setTimeout(() => {
          setCopySuccess(null);
          setCopiedIndex(null);
        }, 1000);
      });
    }
  } else {
    console.error("Clipboard API desteklenmiyor veya server-side çalışıyor.");
  }
};

export const handleCopyClickAll = (event, setCopiedAll, setCopySuccess) => {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    const footerElement = event.currentTarget.closest(".chat-footer");
    // console.log("footerElement", footerElement);

    const codeColumnElement = footerElement
      ?.closest(".row")
      ?.querySelector(".code-column");

    // console.log("codeColumnElement", codeColumnElement);

    if (codeColumnElement) {
      const codeColumnText = codeColumnElement.innerText;
      // console.log("Kopyalanacak içerik:", codeColumnText);

      navigator.clipboard
        .writeText(codeColumnText)
        .then(() => {
          setCopiedAll(true);
          setCopySuccess("Bu cevap kopyalandı!");
          swalToast("All answers have been copied successfully!", "success");
          setTimeout(() => {
            setCopiedAll(false);
            setCopySuccess(null);
          }, 2000);
        })
        .catch((err) => {
          console.error("Kopyalama sırasında hata oluştu:", err);
        });
    }
  } else {
    console.error("Clipboard API desteklenmiyor veya server-side çalışıyor.");
  }
};

export const streamContent = (
  content,
  index,
  setVisibleHtml,
  setStreaming,
  preprocessContent,
  streamingDelay
) => {
  const words = content.split(" "); // İçeriği kelimelere böl
  let wordIndex = 0;
  let accumulatedContent = "";

  const addWord = () => {
    if (wordIndex < words.length) {
      accumulatedContent += (wordIndex === 0 ? "" : " ") + words[wordIndex]; // Boşluk ekle
      wordIndex++;

      setVisibleHtml((prev) => ({
        ...prev,
        [index]: preprocessContent(accumulatedContent),
      }));

      setTimeout(addWord, streamingDelay); // Gecikme
    } else {
      setStreaming(false);
    }
  };

  setStreaming(true);
  addWord();
};
// chat-message-helper.js içine:
export function parseAndJoinAnswer(answer) {
  if (!Array.isArray(answer)) return answer;

  return answer
    .map((charArray) => {
      try {
        const parsed = JSON.parse(charArray);
        return parsed[0] ?? "";
      } catch (e) {
        return "";
      }
    })
    .join("");
}

export const handleWebClick = (question, router) => {
  if (!router) {
    console.error("Router is not provided!");
    return;
  }
  // console.log("Question:", question);
  router.push(`/chat/agent?ask=${question}`);
};

/* export const handleMouseUp =  (setSelectedText, setButtonPosition, setShowButton) => (event) => {
    const selection = window.getSelection();
    const selectedString = selection.toString();
    if (selectedString) {
      setSelectedText(selectedString);
      console.log("Selected Text:", selectedString);
      const range = selection.getRangeAt(0).getBoundingClientRect();
      setButtonPosition({
        x: range.right + window.scrollX + 10,
        y: range.top + window.scrollY + 10,
      });
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }; */

export const handleMouseUp =
  (setSelectedText, setButtonPosition, setShowButton) => (event) => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const clonedContent = range.cloneContents();
        const div = document.createElement("div");
        div.appendChild(clonedContent);

        const turndownService = new TurndownService({
          headingStyle: "atx",
          codeBlockStyle: "fenced", // Kod bloklarını üçlü backtick ile dönüştür
        });

        // KaTeX matematik ifadelerini Markdown formatına çevirme
        turndownService.addRule("math", {
          filter: (node) =>
            node.tagName === "SPAN" && node.classList.contains("katex"),
          replacement: (content, node) => {
            const mathElement = node.querySelector(".katex-mathml annotation");
            if (mathElement) {
              return `$$${mathElement.textContent}$$`; // TeX formatında dönüştür
            }
            return `$$${node.textContent}$$`;
          },
        });

        // Kod bloklarını Markdown formatında dönüştürme
        turndownService.addRule("codeBlocks", {
          filter: (node) => node.tagName === "PRE" || node.tagName === "CODE",
          replacement: (content, node) => {
            const codeContent = node.textContent
              .replace(/\$/g, "\\$") // $ sembollerini kaçış karakteriyle düzelt
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
            return `\`\`\`java\n${codeContent}\n\`\`\``; // Java olarak formatla
          },
        });

        const selectedMarkdown = turndownService.turndown(div.innerHTML);

        if (selectedMarkdown) {
          setSelectedText(selectedMarkdown);
          // console.log("Selected Markdown:", selectedMarkdown);

          const rect = range.getBoundingClientRect();
          setButtonPosition({
            x: rect.right + window.scrollX + 10,
            y: rect.top + window.scrollY + 10,
          });
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    }, 100);
  };

export const handleModalClose =
  (setShowModal, setSelectedText, setTitle) => () => {
    setShowModal(false);
    setSelectedText(""); // Reset selection
    setTitle(""); // Reset title
  };

//apiye buradan gönderilecek
export const handleSaveNote = (title, selectedText, handleModalClose) => () => {
  // console.log("Title:", title);
  // console.log("Selected Text:", selectedText);
  handleModalClose();
};

export const handleButtonClick = (setShowModal) => () => {
  // console.log("Button clicked");
  setShowModal(true);
};

export const toggleQuestionExpand = (index, setExpandedQuestions) => {
  setExpandedQuestions((prevState) => ({
    ...prevState,
    [index]: !prevState[index],
  }));
};

export const handleCopySelectedText = (selectedText, setCopySuccess) => {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    if (selectedText) {
      navigator.clipboard
        .writeText(selectedText)
        .then(() => {
          setCopySuccess("Metin kopyalandı!");
          // console.log("Metin kopyalandı! Kopyalanan metin:", selectedText);
          swalToast("The text has been copied successfully!", "success");
          setTimeout(() => setCopySuccess(null), 2000);
        })
        .catch((err) => console.error("Kopyalama hatası:", err));
    }
  } else {
    console.error("Clipboard API desteklenmiyor veya server-side çalışıyor.");
  }
};
