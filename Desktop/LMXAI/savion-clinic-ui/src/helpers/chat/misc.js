"use client";
export const handleCopyClick = (codeText, copyClipboardSetter) => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    // Tarayıcı kontrolü
    navigator.clipboard.writeText(codeText.trim()).then(
      () => {
        copyClipboardSetter(true);
        setTimeout(() => copyClipboardSetter(false), 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  } else {
    console.warn("Navigator is not available during SSR.");
  }
};

export const handleCopyClickAll = (
  elementSelector,
  index,
  copyClipboardSetter
) => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    // Tarayıcı kontrolü
    const element = document.querySelector(elementSelector);
    if (element) {
      let textToCopy = element.innerText;
      const codeButtonDivs = element.querySelectorAll(".code-button-div");
      codeButtonDivs.forEach((div) => {
        textToCopy = textToCopy.replace(div.innerText, "");
      });

      textToCopy = textToCopy.trim();
      navigator.clipboard.writeText(textToCopy).then(
        () => {
          copyClipboardSetter((prev) => ({ ...prev, [index]: true }));
          setTimeout(
            () => copyClipboardSetter((prev) => ({ ...prev, [index]: false })),
            2000
          );
        },
        (err) => {
          console.error("Failed to copy: ", err);
        }
      );
    } else {
      console.error("Element not found: ", elementSelector);
    }
  } else {
    console.warn("Navigator is not available during SSR.");
  }
};
