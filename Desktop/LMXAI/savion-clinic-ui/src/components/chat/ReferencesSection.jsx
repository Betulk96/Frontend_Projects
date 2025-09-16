import React from "react";
import { GiBlackBook } from "react-icons/gi";

const ReferencesSection = ({ references = [], matchedBook }) => {
  const uniqueReferences = Array.from(new Set(references)).filter(
    (ref) => ref && ref !== "[Book: N/A, Page: []]"
  );

  if (!uniqueReferences.length && !matchedBook) {
    return null;
  }

  return (
    <div className="p-4">
      {uniqueReferences.length > 0 && (
        <div className="flex flex-col items-center gap-4">
          <h4 className="text-lg ">Retrieved Documents</h4>

          <div className="flex flex-wrap gap-3 justify-center">
            {matchedBook?.url && (
              <button
                onClick={() => window.open(matchedBook.url, "_blank")}
                className="relative flex flex-col items-center justify-center bg-[--color-blue3] text-white rounded-full w-12 h-12 transition duration-200 ease-in-out hover:scale-105"
              >
                <GiBlackBook size={30} className="text-[--color-secondary3]" />
                <span className="absolute bottom-[-28px] hidden group-hover:flex bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {matchedBook.index}
                </span>
              </button>
            )}

            {uniqueReferences.map((doc, index) => (
              <div key={index} className="relative group">
                <button className="bg-[--color-blue3] text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-105">
                  <GiBlackBook size={30} />
                </button>

                <div className="absolute bottom-[65px] left-1/2 -translate-x-1/2 bg-[--color-blue3] text-[--color-secondary3] text-sm p-2 rounded w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10 text-left">
                  {doc.content || "No content available"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferencesSection;
