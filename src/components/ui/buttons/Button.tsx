import React from "react";

type ButtonProps = {
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  children,
  className = "",
  style = {},
}) => {
  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.008"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      <button
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={`bg-[var(--primary)] glass flex-[0_1_335px] text-lg font-light p-[12px] rounded-[14px] ${className}`}
        style={{
          ...style,
        }}
      >
        <div className="glass-filter"></div>
        <div className="glass-overlay"></div>
        <div className="glass-specular"></div>

        <div className="glass-content">
          {loading ? (
            <div className="flex justify-center items-center p-[0.400rem]">
              <div className="spinner-save-data-button border-[2px] border-solid border-t-transparent border-r-transparent border-b-[var(--secondary)] border-l-transparent animate-spin w-[20px] h-[20px] rounded-full" />
            </div>
          ) : (
            <span className="text-[var(--text-primary)]">{children}</span>
          )}
        </div>
      </button>
    </>
  );
};

export default Button;
