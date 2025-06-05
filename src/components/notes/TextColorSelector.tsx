import React, { useState, useEffect } from "react";

import { ChevronDown } from "lucide-react";

interface TextColorSelectorProps {
  execCommand: (command: string, value?: string) => void;
  currentColor?: string | null;
}

export const TextColorSelector: React.FC<TextColorSelectorProps> = ({
  execCommand,
  currentColor: externalColor,
}) => {
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [isHovered, setIsHovered] = useState(false);

  const colors = ["#000000", "#FF0000", "#008000", "#0000FF", "#FFA500"];

  useEffect(() => {
    if (externalColor && externalColor !== currentColor) {
      setCurrentColor(externalColor);
    }
  }, [externalColor]);

  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="cursor-pointer inline-flex items-center gap-1"
        type="button"
        onMouseDown={(e) => e.preventDefault()}
      >
        <span className="text-sm font-extralight inline-flex items-center gap-1 w-max">
          <span
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: currentColor }}
          />
          Color
          <ChevronDown size={15} />
        </span>
      </button>

      {isHovered && (
        <div className="z-10 flex flex-col items-center gap-2 my-3">
          {colors.map((color) => (
            <button
              className={`border cursor-pointer w-6 h-6 rounded-full ${
                color === currentColor ? "border-black" : "border-gray-200"
              }`}
              key={color}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand("foreColor", color);
                setCurrentColor(color);
              }}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
