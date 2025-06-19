import { Sparkles } from "lucide-react";

type ButtonAIProps = {
  text?: string;
  openText?: string;
  isOpen?: boolean;
  onClick?: () => void;
  loading?: boolean;
};

export const ButtonAI = ({
  text,
  loading,
  onClick,
  openText,
  isOpen,
}: ButtonAIProps) => {
  return (
    <div
      className="flex items-center justify-center gap-2 font-extralight text-sx px-3 py-1 rounded-lg buttonAI"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={text}
    >
      {!loading ? (
        <>
          <Sparkles className="text-light" size={15} />

          <div className="whitespace-nowrap overflow-hidden leading-none font-light">
            <div>
              <span className="text-sm text-light">
                {isOpen ? openText : text}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className="text-sm text-light">{openText}</span>
          <div className="py-[0.15rem]">
            <div className="spinner-save-data-button border-[2px] border-solid border-t-transparent border-r-transparent border-b-white border-l-transparent"></div>
          </div>
        </>
      )}
    </div>
  );
};
