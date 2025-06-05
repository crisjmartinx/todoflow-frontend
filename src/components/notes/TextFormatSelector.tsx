import React, { useState, useEffect } from "react";

import {
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
} from "lucide-react";

interface TextFormatSelectorProps {
  execCommand: (command: string, value?: string) => void;
  currentTag?: string | null;
}

export const TextFormatSelector: React.FC<TextFormatSelectorProps> = ({
  execCommand,
  currentTag,
}) => {
  const [currentBlock, setCurrentBlock] = useState("Párrafo");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!currentTag) return;
    switch (currentTag.toUpperCase()) {
      case "H1":
        setCurrentBlock("Título 1");
        break;
      case "H2":
        setCurrentBlock("Título 2");
        break;
      case "H3":
        setCurrentBlock("Título 3");
        break;
      default:
        setCurrentBlock("Párrafo");
    }
  }, [currentTag]);

  const getCurrentIcon = () => {
    switch (currentBlock) {
      case "Título 1":
        return <Heading1 size={16} />;
      case "Título 2":
        return <Heading2 size={16} />;
      case "Título 3":
        return <Heading3 size={16} />;
      default:
        return <Pilcrow size={16} />;
    }
  };

  return (
    <div
      className="relative flex flex-col justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="cursor-pointer inline-flex items-center gap-1"
        type="button"
        onMouseDown={(e) => e.preventDefault()}
      >
        <span className="text-sm font-extralight inline-flex items-center gap-1">
          {getCurrentIcon()} {currentBlock}
        </span>
        <ChevronDown size={15} />
      </button>

      {isHovered && (
        <div className="z-10 flex flex-col gap-1 my-3">
          <button
            className="cursor-pointer text-sm font-extralight w-full flex items-center gap-2 hover:bg-gray-100 p-1 rounded"
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("formatBlock", "H1");
              setCurrentBlock("Título 1");
            }}
          >
            <Heading1 size={16} /> Título 1
          </button>

          <button
            className="cursor-pointer text-sm font-extralight w-full flex items-center gap-2 hover:bg-gray-100 p-1 rounded"
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("formatBlock", "H2");
              setCurrentBlock("Título 2");
            }}
          >
            <Heading2 size={16} /> Título 2
          </button>

          <button
            className="cursor-pointer text-sm font-extralight w-full flex items-center gap-2 hover:bg-gray-100 p-1 rounded"
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("formatBlock", "H3");
              setCurrentBlock("Título 3");
            }}
          >
            <Heading3 size={16} /> Título 3
          </button>

          <button
            className="cursor-pointer text-sm font-extralight w-full flex items-center gap-2 hover:bg-gray-100 p-1 rounded"
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              execCommand("formatBlock", "P");
              setCurrentBlock("Párrafo");
            }}
          >
            <Pilcrow size={16} /> Párrafo
          </button>
        </div>
      )}
    </div>
  );
};
