export const fetchChatStream = async ({
  question,
  userID,
  session_id,
  setLoading,
  setStreaming,
  setChatData,
  setSessionID,
  currentQuestion,
}) => {
  if (!question || !userID) return;

  setLoading(true);
  setStreaming(true);
  let streamedAnswer = "";

  const questionInstanceID = `${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  try {
    const payload = {
      messages: [
        {
          type: "human",
          content: question, // burada direkt "question" değerini kullanıyorsun
        },
      ],

      ...(session_id && { session_id: String(session_id) }),
    };

    console.log("ASK'e gönderilen mesaj:", payload);

    const response = await fetch("/api/optimeal/run_stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
      throw new Error("Stream could not be started.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let firstChunkReceived = false;
    let lastContentBeforeComplete = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("event:")) continue;

        try {
          let data;

          if (trimmedLine.startsWith("data: ")) {
            data = JSON.parse(trimmedLine.substring(6));
          } else if (trimmedLine.startsWith("message\t")) {
            data = JSON.parse(trimmedLine.substring(8));
          } else {
            data = JSON.parse(trimmedLine);
          }
          //console.log("Received data chunk:", data);
          if (data.type === "info") {
            // Session ID varsa kaydet ve URL'yi güncelle
            if (data.session_id) {
              const sessionIDExtracted = data.session_id;
              setSessionID(sessionIDExtracted);
              session_id = sessionIDExtracted;

              window.history.replaceState(
                null,
                "",
                `/main/${sessionIDExtracted}`
              );
            }

            // Info tipindeki mesajları chat verisine ekleme
            continue;
          }
          if (data.type === "received_message") {
            const messageID = Date.now();
            const timeStr = new Date(data.timestamp * 1000).toLocaleTimeString(
              "tr-TR",
              {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            );

            setLoading(false);

            setChatData((prev) => [
              ...prev,
              {
                session_id,
                question: currentQuestion,
                answer: `${data.content} (${timeStr})`,
                type: "info",
                messageID,
                questionInstanceID,
                createdAt: new Date(data.timestamp * 1000).toISOString(),
              },
            ]);

            continue;
          }

          if (data.type === "chunk") {
            streamedAnswer += data.content;
            setLoading(false);
            setChatData((prev) => {
              // 1️⃣ Önce received_message olanları temizle
              const filteredPrev = prev.filter(
                (item) => item.type !== "received_message"
              );

              // 2️⃣ Chunk güncellemesi varsa güncelle, yoksa ekle
              const existingIndex = filteredPrev.findIndex(
                (item) =>
                  item.questionInstanceID === questionInstanceID &&
                  item.type === "stream"
              );

              if (existingIndex !== -1) {
                const updated = [...filteredPrev];
                updated[existingIndex] = {
                  ...updated[existingIndex],
                  answer: streamedAnswer,
                  lastUpdated: new Date().toISOString(),
                };
                return updated;
              } else {
                return [
                  ...filteredPrev,
                  {
                    session_id,
                    question: currentQuestion,
                    answer: streamedAnswer,
                    type: "stream",
                    messageID: Date.now(),
                    questionInstanceID,
                    createdAt: new Date().toISOString(),
                    lastUpdated: new Date().toISOString(),
                  },
                ];
              }
            });

            continue;
          }

          if (data.content !== undefined) {
            if (!firstChunkReceived) {
              setLoading(false);
              firstChunkReceived = true;
            }

            streamedAnswer += data.content;
            lastContentBeforeComplete = data.content; // 👈 En son içeriği kaydet

            const messageID = Date.now();

            setChatData((prev) => {
              const existingIndex = prev.findIndex(
                (item) =>
                  item.questionInstanceID === questionInstanceID &&
                  item.type === "stream"
              );

              if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                  ...updated[existingIndex],
                  answer: streamedAnswer,
                  lastUpdated: new Date().toISOString(),
                };
                return updated;
              } else {
                return [
                  ...prev,
                  {
                    session_id: session_id || data.session_id,
                    question: currentQuestion,
                    answer: streamedAnswer,
                    type: "stream",
                    messageID,
                    questionInstanceID,
                    createdAt: new Date().toISOString(),
                    lastUpdated: new Date().toISOString(),
                  },
                ];
              }
            });
          }

          if (data.type === "final") {
            console.log("✅ Final message received:", data);

            if (data.content) {
              setChatData((prev) => {
                const filteredPrev = prev.filter(
                  (item) =>
                    !(
                      item.questionInstanceID === questionInstanceID &&
                      item.type === "stream"
                    )
                );

                return [
                  ...filteredPrev,
                  {
                    session_id: session_id || data.session_id,
                    question: currentQuestion,
                    answer: data.content, // 👈 backend'in gönderdiği final içerik
                    type: "final",
                    messageID: Date.now(),
                    questionInstanceID,
                    createdAt: new Date().toISOString(),
                    completedAt: new Date().toISOString(),
                  },
                ];
              });
            }

            continue;
          }
        } catch (err) {
          // console.warn("JSON parse hatası:", err.message, "Line:", trimmedLine);

          if (trimmedLine === "data: [DONE]" || trimmedLine === "[DONE]") {
            //console.log("Stream completed signal received");
            continue;
          }

          // Info tipindeki mesajları filtreleme
          if (
            trimmedLine.includes('"type": "info"') ||
            trimmedLine.includes("Connected to Optimeal Agent") ||
            trimmedLine.includes('"status": "connected"')
          ) {
            continue; // Info mesajlarını atla
          }

          if (trimmedLine && !firstChunkReceived) {
            setLoading(false);
            firstChunkReceived = true;
          }

          streamedAnswer += trimmedLine + "\n";

          setChatData((prev) => {
            const existingIndex = prev.findIndex(
              (item) =>
                item.questionInstanceID === questionInstanceID &&
                item.type === "stream"
            );

            if (existingIndex !== -1) {
              const updated = [...prev];
              updated[existingIndex] = {
                ...updated[existingIndex],
                answer: streamedAnswer,
                lastUpdated: new Date().toISOString(),
              };
              return updated;
            } else {
              return [
                ...prev,
                {
                  session_id,
                  question: currentQuestion,
                  answer: streamedAnswer,
                  type: "stream",
                  messageID: Date.now(),
                  questionInstanceID,
                  createdAt: new Date().toISOString(),
                  lastUpdated: new Date().toISOString(),
                },
              ];
            }
          });
        }
      }
    }

    if (streamedAnswer && firstChunkReceived) {
      const processedAnswer = streamedAnswer;

      setChatData((prev) => {
        const hasFinal = prev.some(
          (item) =>
            item.questionInstanceID === questionInstanceID &&
            item.type === "final"
        );

        if (hasFinal) return prev;

        const filteredPrev = prev.filter(
          (item) =>
            !(
              item.questionInstanceID === questionInstanceID &&
              item.type === "stream"
            )
        );

        return [
          ...filteredPrev,
          {
            session_id,
            question: currentQuestion,
            answer: processedAnswer,
            type: "final",
            messageID: Date.now(),
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
        session_id,
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
