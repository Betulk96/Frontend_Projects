// components/rag/fetchDocumentsStream.js
import { extractImageUrls, preloadImage } from "@/helpers/chat/image-helpers";

export const fetchDocumentsChatStream = async ({
  formData,
  userID,
  sessionID,
  setLoading,
  setStreaming,
  setChatData,
  setSessionID,
  currentQuestion,
}) => {
  if (!formData && !sessionID) {
    console.error("❌ Neither formData nor sessionID provided.");
    return;
  }
  setLoading(true);
  setStreaming(true);
  let streamedAnswer = "";
  let finalAnswer = "";
  let firstChunkReceived = false;
  const questionInstanceID = `${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const seenImageUrls = new Set();

  try {
    const response = await fetch("/api/doc/stream", {
      method: "POST",
      body: formData,
    });

    if (!response.ok || !response.body)
      throw new Error("Stream could not be started.");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    const upsertImageForStreamMsg = (url) => {
      setChatData((prev) => {
        const existingIndex = prev.findIndex(
          (it) =>
            it.questionInstanceID === questionInstanceID && it.type === "stream"
        );

        const messageID =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : Date.now();

        if (existingIndex !== -1) {
          const updated = [...prev];
          const msg = updated[existingIndex];
          const images = Array.isArray(msg.images) ? msg.images : [];
          if (!images.some((im) => im.url === url)) {
            updated[existingIndex] = {
              ...msg,
              images: [...images, { url, status: "loading" }],
              lastUpdated: new Date().toISOString(),
            };
          }
          return updated;
        }

        return [
          ...prev,
          {
            sessionID,
            question: currentQuestion,
            answer: streamedAnswer,
            type: "stream",
            messageID,
            questionInstanceID,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            images: [{ url, status: "loading" }],
          },
        ];
      });

      preloadImage(url, (ok) => {
        setChatData((prev) =>
          prev.map((m) =>
            m.questionInstanceID === questionInstanceID
              ? {
                  ...m,
                  images: (m.images || []).map((im) =>
                    im.url === url
                      ? { ...im, status: ok ? "ready" : "error" }
                      : im
                  ),
                  lastUpdated: new Date().toISOString(),
                }
              : m
          )
        );
      });
    };

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine === "data: [DONE]" || trimmedLine === "[DONE]")
          continue;
        if (trimmedLine === "data:") continue;

        try {
          let jsonStr = trimmedLine;
          while (jsonStr.startsWith("data: ")) jsonStr = jsonStr.substring(6);
          if (!jsonStr.trim()) continue;

          const data = JSON.parse(jsonStr);

          // Session
          if (data.info && data.info.startsWith("Session ID:")) {
            const sessionIDExtracted = data.info
              .replace("Session ID:", "")
              .trim();
            setSessionID(sessionIDExtracted);
            sessionID = sessionIDExtracted;
            window.history.replaceState(
              null,
              "",
              `/chat/${sessionIDExtracted}`
            );
            continue;
          }

          // Info type
          if (data.type === "info" && data.message) {
            setLoading(false);
            setChatData((prev) => [
              ...prev,
              {
                sessionID: sessionID || data.sessionID,
                question: currentQuestion,
                answer: data.message,
                type: "info",
                messageID:
                  typeof crypto !== "undefined" && crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now(),
                questionInstanceID,
                createdAt: new Date().toISOString(),
              },
            ]);
            continue;
          }

          // Chunk
          if (data.type === "chunk" && data.content !== undefined) {
            if (!firstChunkReceived) {
              setLoading(false);
              firstChunkReceived = true;
            }

            streamedAnswer += data.content;

            setChatData((prev) => {
              const i = prev.findIndex(
                (it) =>
                  it.questionInstanceID === questionInstanceID &&
                  it.type === "stream"
              );
              if (i !== -1) {
                const updated = [...prev];
                updated[i] = {
                  ...updated[i],
                  answer: streamedAnswer,
                  lastUpdated: new Date().toISOString(),
                };
                return updated;
              }
              return [
                ...prev,
                {
                  sessionID: sessionID || data.sessionID,
                  question: currentQuestion,
                  answer: streamedAnswer,
                  type: "stream",
                  messageID:
                    typeof crypto !== "undefined" && crypto.randomUUID
                      ? crypto.randomUUID()
                      : Date.now(),
                  questionInstanceID,
                  createdAt: new Date().toISOString(),
                  lastUpdated: new Date().toISOString(),
                },
              ];
            });

            const foundUrls = extractImageUrls(data.content || "");
            for (const url of foundUrls) {
              if (seenImageUrls.has(url)) continue;
              seenImageUrls.add(url);
              upsertImageForStreamMsg(url);
            }
            continue;
          }

          // Final
          if (data.type === "final" && data.content !== undefined) {
            finalAnswer = data.content;

            setChatData((prev) => {
              const filteredPrev = prev.filter(
                (it) =>
                  !(
                    it.questionInstanceID === questionInstanceID &&
                    it.type === "stream"
                  )
              );
              return [
                ...filteredPrev,
                {
                  sessionID: sessionID || data.sessionID,
                  question: currentQuestion,
                  answer: finalAnswer,
                  type: "final",
                  messageID:
                    typeof crypto !== "undefined" && crypto.randomUUID
                      ? crypto.randomUUID()
                      : Date.now(),
                  questionInstanceID,
                  createdAt: new Date().toISOString(),
                  completedAt: new Date().toISOString(),
                },
              ];
            });
            continue;
          }

          // Eski format fallback
          if (data.content !== undefined && !data.type) {
            if (!firstChunkReceived) {
              setLoading(false);
              firstChunkReceived = true;
            }

            streamedAnswer += data.content;

            setChatData((prev) => {
              const i = prev.findIndex(
                (it) =>
                  it.questionInstanceID === questionInstanceID &&
                  it.type === "stream"
              );
              if (i !== -1) {
                const updated = [...prev];
                updated[i] = {
                  ...updated[i],
                  answer: streamedAnswer,
                  lastUpdated: new Date().toISOString(),
                };
                return updated;
              }
              return [
                ...prev,
                {
                  sessionID: sessionID || data.sessionID,
                  question: currentQuestion,
                  answer: streamedAnswer,
                  type: "stream",
                  messageID:
                    typeof crypto !== "undefined" && crypto.randomUUID
                      ? crypto.randomUUID()
                      : Date.now(),
                  questionInstanceID,
                  createdAt: new Date().toISOString(),
                  lastUpdated: new Date().toISOString(),
                },
              ];
            });

            const foundUrls = extractImageUrls(data.content || "");
            for (const url of foundUrls) {
              if (seenImageUrls.has(url)) continue;
              seenImageUrls.add(url);
              upsertImageForStreamMsg(url);
            }
          }
        } catch (err) {
          // JSON parse edilemedi → düz metin
          if (
            trimmedLine === "data:" ||
            trimmedLine.startsWith("data: data:") ||
            !trimmedLine.includes("{")
          ) {
            continue;
          }

          if (!firstChunkReceived) {
            setLoading(false);
            firstChunkReceived = true;
          }

          streamedAnswer += trimmedLine + "\n";

          setChatData((prev) => {
            const i = prev.findIndex(
              (it) =>
                it.questionInstanceID === questionInstanceID &&
                it.type === "stream"
            );
            if (i !== -1) {
              const updated = [...prev];
              updated[i] = {
                ...updated[i],
                answer: streamedAnswer,
                lastUpdated: new Date().toISOString(),
              };
              return updated;
            }
            return [
              ...prev,
              {
                sessionID,
                question: currentQuestion,
                answer: streamedAnswer,
                type: "stream",
                messageID:
                  typeof crypto !== "undefined" && crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now(),
                questionInstanceID,
                createdAt: new Date().toISOString(),
                lastUpdated: new Date().toISOString(),
              },
            ];
          });

          const foundUrls = extractImageUrls(trimmedLine);
          for (const url of foundUrls) {
            if (seenImageUrls.has(url)) continue;
            seenImageUrls.add(url);
            upsertImageForStreamMsg(url);
          }
        }
      }
    }

    // final yoksa fallback
    if (!finalAnswer && streamedAnswer && firstChunkReceived) {
      setChatData((prev) => {
        const hasFinal = prev.some(
          (it) =>
            it.questionInstanceID === questionInstanceID && it.type === "final"
        );
        if (hasFinal) return prev;

        const filteredPrev = prev.filter(
          (it) =>
            !(
              it.questionInstanceID === questionInstanceID &&
              it.type === "stream"
            )
        );

        return [
          ...filteredPrev,
          {
            sessionID,
            question: currentQuestion,
            answer: streamedAnswer,
            type: "final",
            messageID:
              typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now(),
            questionInstanceID,
            createdAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
          },
        ];
      });
    }
  } catch (error) {
    console.error("Streaming error:", error);
    setChatData((prev) => [
      ...prev,
      {
        question: currentQuestion,
        answer:
          "I'm currently experiencing technical difficulties. Please try again later.",
        sessionID,
        questionInstanceID,
        isError: true,
        createdAt: new Date().toISOString(),
        type: "error",
      },
    ]);
  } finally {
    setLoading(false);
    setStreaming(false);
  }
};
