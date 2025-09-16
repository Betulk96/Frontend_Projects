import React, { useState, useEffect, useRef } from "react";
import { IoPauseCircleSharp, IoSend } from "react-icons/io5";
import { MdBlock } from "react-icons/md";

const ChatInput = ({ loading, setQuestion }) => {
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef(null);
    const MAX_CHAR_COUNT = 5040;
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_CHAR_COUNT) {
            setInputValue(value);
            setErrorMessage("");
            autoHeight(e.target);
        } else {
            setErrorMessage(`Maximum ${MAX_CHAR_COUNT} characters allowed.`);
        }
    };

    const autoHeight = (elem) => {
        elem.style.height = "1px";
        elem.style.height = `${elem.scrollHeight}px`;
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey && inputValue.trim()) {
            e.preventDefault();
            if (!loading) {
                handleSubmit(e);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading || !inputValue.trim()) return;

        const newQuestion = inputValue.trim();
        setInputValue("");
        setQuestion("");

        setTimeout(() => {
            setQuestion(newQuestion);
        }, 10);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            setTimeout(() => {
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }, 0);
        }
    };

    useEffect(() => {
        if (!loading) {
            setInputValue("");
        }
    }, [loading]);

    useEffect(() => {
        if (textareaRef.current) {
            autoHeight(textareaRef.current);
        }
    }, [inputValue]);

    return (
        <form
            onSubmit={handleSubmit}
            className=""
        >
            <div className="max-w-4xl mx-auto px-4 py-3 ">
                <div className="relative rounded-xl shadow-sm shadow-color2/50 border  dark:border-gray-600 p-4 pr-16 bg-white dark:bg-gray-800 foc">
                    <textarea
                        ref={textareaRef}
                        className="w-full resize-none border-none focus:ring-0 focus:outline-none focus:border-transparent text-gray-900 dark:text-white bg-transparent placeholder-gray-400 text-sm sm:text-base pr-12 max-h-[200px] overflow-y-auto"
                        placeholder="Message"
                        rows={1}
                        value={loading ? "" : inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />


                    {errorMessage && (
                        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
                    )}

                    <div className="flex items-center justify-end absolute inset-y-0 right-4">
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || loading}
                            className={`p-2 rounded-full transition ${!inputValue.trim() || loading
                                ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                                : "bg-color4 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {loading ? (
                                <IoPauseCircleSharp size={24} className="text-gray-600" />
                            ) : inputValue.trim() ? (
                                <IoSend size={24} className="text-white" />
                            ) : (
                                <MdBlock size={24} className="text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>
                <p className="text-s text-gray-400 dark:text-gray-500 mt-2 text-center">
                    Savion may occasionally produce incorrect information. Please double-check before using.
                </p>
            </div>
        </form>
    );
};

export default ChatInput;
