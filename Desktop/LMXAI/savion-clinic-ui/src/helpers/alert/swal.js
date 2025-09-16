"use client";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import Modal from "./Modal";
import Toast from "./Toast";

export const swalAlert = (message, type) => {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);

    const close = () => {
      root.unmount();
      div.remove();
      resolve(true);
    };

    root.render(
      <Modal
        isOpen={true}
        title={message}
        onConfirm={close}
        showCancel={false}
      />
    );
  });
};

export const swalConfirm = (
  title,
  icon = "question",
  text = "",
  confirmButtonText = "Yes"
) => {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);

    const confirm = () => {
      root.unmount();
      div.remove();
      resolve({ isConfirmed: true });
    };

    const cancel = () => {
      root.unmount();
      div.remove();
      resolve({ isConfirmed: false });
    };

    root.render(
      <Modal
        isOpen={true}
        title={title}
        text={text}
        confirmText={confirmButtonText}
        showCancel={true}
        onConfirm={confirm}
        onCancel={cancel}
      />
    );
  });
};

export const swalToast = (
  title,
  icon = "success",
  relativePosition = "top-end"
) => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const root = createRoot(div);

  root.render(
    <Toast message={title} type={icon} position={relativePosition} />
  );

  setTimeout(() => {
    root.unmount();
    div.remove();
  }, 3000);
};

export const swalError = (message = "An error occurred!") => {
  return swalAlert(message, "error");
};

export const handleDislike = async () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const root = createRoot(div);

  let feedback = "";
  let close;

  const FeedbackModal = () => {
    const [value, setValue] = useState("");

    const handleSend = () => {
      feedback = value;
      close(true);
    };

    return (
      <Modal
        isOpen={true}
        title="Why didn't you like the answer?"
        confirmText="Send Feedback"
        showCancel={true}
        onConfirm={handleSend}
        onCancel={() => close(false)}
      >
        <textarea
          className="w-full border rounded p-2 mt-2"
          rows="4"
          placeholder="Please provide your feedback..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal>
    );
  };

  const promise = new Promise((res) => (close = res));
  root.render(<FeedbackModal />);
  const result = await promise;

  root.unmount();
  div.remove();

  if (result && feedback) {
    try {
      const formData = new FormData();
      formData.append("title", "Disliked Answer Feedback");
      formData.append("description", feedback);
     /*  const response = await bugReportAction({}, formData);

      if (response) {
        swalToast("Thanks for your feedback! We will review it. 😊", "success");
      } else {
        swalToast(
          "Failed to submit feedback. Please try again later.",
          "error"
        );
        console.error("Validation Errors:", response.validations);
      } */
      console.log("Feedback:", feedback);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      swalToast("An error occurred. Please try again later.", "error");
    }
  } else if (feedback === "") {
    swalToast("No feedback provided.", "info");
  }
};
