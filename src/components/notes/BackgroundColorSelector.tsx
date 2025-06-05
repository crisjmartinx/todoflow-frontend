import React, { useState, useEffect } from "react";

import { ChevronDown } from "lucide-react";

interface BackgroundColorSelectorProps {
  execCommand: (command: string, value?: string) => void;
  currentBgColor?: string | null;
}

export const BackgroundColorSelector: React.FC<
  BackgroundColorSelectorProps
> = ({ execCommand, currentBgColor: externalBgColor }) => {
  const [currentBgColor, setCurrentBgColor] = useState<string>("#FFFFFF");
  const [isHovered, setIsHovered] = useState(false);

  const bgColors = ["#FFFFFF", "#FFFF00", "#FFC0CB", "#90EE90", "#ADD8E6"];

  useEffect(() => {
    if (externalBgColor && externalBgColor !== currentBgColor) {
      setCurrentBgColor(externalBgColor);
    }
  }, [externalBgColor]);

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
        <span className="text-sm font-extralight inline-flex items-center gap-1 w-max">
          <span
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: currentBgColor }}
          />
          Color fondo
        </span>
        <ChevronDown size={15} />
      </button>

      {isHovered && (
        <div className="z-10 flex flex-col items-center gap-2 my-3">
          {bgColors.map((color) => (
            <button
              key={color}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand("hiliteColor", color);
                setCurrentBgColor(color);
              }}
              className={`border cursor-pointer w-6 h-6 rounded-full ${
                color === currentBgColor ? "border-black" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
