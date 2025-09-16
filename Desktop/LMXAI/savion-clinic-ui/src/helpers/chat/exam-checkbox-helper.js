// @/helpers/chat/exam-chat-helper.js

// Seçilen cevapları temizleme
export const clearSelectedAnswers = (setSelectedAnswers) => {
  setSelectedAnswers({});
};

// Soru instance'ına ait cevapları al
export const getAnswersForQuestion = (selectedAnswers, questionInstanceId) => {
  return Object.entries(selectedAnswers)
    .filter(([key]) => key.startsWith(questionInstanceId))
    .reduce((acc, [key, value]) => {
      const questionNum = key.split("_q")[1];
      acc[`q${questionNum}`] = value;
      return acc;
    }, {}); // örn. { q1: "A", q2: "C" }
};

// Gönderilecek cevapları hazırla
export const prepareAnswersForSubmit = (filteredChatData, selectedAnswers) => {
  const answersToSubmit = {};

  filteredChatData.forEach((item) => {
    if (item.questionInstanceID) {
      const instanceAnswers = getAnswersForQuestion(selectedAnswers, item.questionInstanceID);
      if (Object.keys(instanceAnswers).length > 0) {
        answersToSubmit[item.questionInstanceID] = instanceAnswers;
      }
    }
  });

  return answersToSubmit;
};

// Kaç soruya cevap verildiğini hesapla
export const getAnswerStats = (filteredChatData, selectedAnswers) => {
  const totalQuestions = filteredChatData.reduce((count, item) => {
    if (item.answer) {
      const questionMatches = item.answer.match(/### (?:Vraag|Soru) \d+/g);
      return count + (questionMatches ? questionMatches.length : 0);
    }
    return count;
  }, 0);

  const answeredQuestions = Object.values(selectedAnswers).filter((v) => v !== null).length;

  return { totalQuestions, answeredQuestions };
};

// Stream ve final türlerini filtrele
export const computeFilteredChatData = (chatData) => {
  const instanceMap = new Map();
  const result = [];

  for (const item of chatData) {
    if (!item || !item.question) continue;

    if (!item.questionInstanceID) {
      result.push(item);
      continue;
    }

    const instanceID = item.questionInstanceID;

    if (!instanceMap.has(instanceID)) {
      instanceMap.set(instanceID, {
        info: null,
        stream: null,
        final: null,
      });
    }

    const instance = instanceMap.get(instanceID);

    if (item.type === "info") {
      // sadece stream veya final yoksa ekle
      if (!instance.stream && !instance.final) {
        instance.info = item;
        const existingIndex = result.findIndex((r) => r.questionInstanceID === instanceID);
        if (existingIndex === -1) {
          result.push(item);
        } else {
          result[existingIndex] = item;
        }
      }
    } else if (item.type === "stream") {
      instance.stream = item;
      const existingIndex = result.findIndex((r) => r.questionInstanceID === instanceID);
      if (existingIndex === -1) {
        result.push(item);
      } else {
        result[existingIndex] = item;
      }
    } else if (item.type === "final") {
      instance.final = item;
      const existingIndex = result.findIndex((r) => r.questionInstanceID === instanceID);
      if (existingIndex !== -1) {
        result[existingIndex] = item;
      } else {
        result.push(item);
      }
    }
  }

  return result;
};


export const createHandleAnswerChange = (setSelectedAnswers) => {
  return ({ questionId, question, answer }) => {
    //console.log("handleAnswerChange", questionId, question, answer);
    setSelectedAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: answer,
      };
     // console.log("Tüm cevaplar (selectedAnswers):", updated);
      return updated;
    });
  };
};

