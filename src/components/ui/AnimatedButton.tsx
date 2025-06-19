import React from "react";

type AnimatedButtonProps = {
  text: string;
  openText?: string;
  isOpen?: boolean;
  onClick?: () => void;
  loading?: boolean;
  windowWidth?: number;
  icon?: React.ReactNode;
  smallWidth?: number;
  largeWidth?: number;
};
export const AnimatedButton = ({
  text,
  openText = "Listo",
  isOpen = false,
  onClick,
  loading = false,
  windowWidth = 1024,
  icon,
  smallWidth,
  largeWidth,
}: AnimatedButtonProps) => {
  const width =
    windowWidth < 768
      ? "100%"
      : smallWidth !== undefined && largeWidth !== undefined
      ? `${isOpen ? smallWidth : largeWidth}rem`
      : "auto";

  return (
    <div
      className="flex items-center justify-center gap-2 text-light bg-light-dark font-extralight text-sx px-3 py-2 rounded-lg hover:bg-light-dark_hover"
      style={{
        width,
        transition:
          "width 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease",
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={text}
    >
      {loading ? (
        <>
          {icon && (
            <div
              className={`transition duration-300 ${
                isOpen ? "transform rotate-45" : ""
              }`}
            >
              {icon}
            </div>
          )}

          <div className="whitespace-nowrap overflow-hidden leading-none font-light">
            <div className="slide-up" key={isOpen ? "ready" : "add"}>
              <span className="text-sm text-light">
                {isOpen ? openText : text}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="py-[0.15rem]">
          <div className="spinner-save-data-button border-[2px] border-solid border-t-transparent border-r-transparent border-b-white border-l-transparent"></div>
        </div>
      )}
    </div>
  );
};
