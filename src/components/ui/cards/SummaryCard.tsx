import Link from "next/link";

import { Lock, UserIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  id: number;
  index: number;
  name: string;
  amount: number;
  loading?: boolean;
  color: string;
  link: string;
  icon?: React.ReactNode;
}

const LockItems: Record<string, { name: string; path: string }> = {
  projects: { name: "Projectos", path: "/dashboard/projects" },
  notes: { name: "Tareas", path: "/dashboard/tasks" },
  tasks: { name: "Recordatorios", path: "/dashboard/reminders" },
  reminders: { name: "Aprendizaje", path: "/dashboard/learn" },
  finances: { name: "Finanzas", path: "/dashboard/finances" },
};

const SummaryCard: React.FC<Props> = ({
  id,
  index,
  name,
  amount,
  loading,
  color,
  link,
  icon,
}) => {
  const [shakeLock, setShakeLock] = useState(false);

  const handleLockClick = () => {
    setShakeLock(true);

    setTimeout(() => setShakeLock(false), 1000);
  };

  const isLocked = Object.values(LockItems).some(
    (item) => item.name === name || item.path === link
  );

  return (
    <>
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.005"
            numOctaves="1"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
      </svg>

      <div
        className={`card-main reflection rounded-xl border-[0.005px] border-transparent z-20 hover:bg-[var(--hover-bg)]`}
        key={id}
        style={{ animationDelay: `${index * 0.07}s` }}
      >
        <div className="glass-filter"></div>
        <div className="glass-overlay"></div>
        <div className="glass-specular"></div>
        <Link
          className="card glass-content"
          href={isLocked ? "#" : link}
          onClick={isLocked ? handleLockClick : undefined}
        >
          <div
            className={`p-5 rounded-xl flex flex-col justify-between h-full`}
            style={
              {
                // borderColor: isLocked ? "#00000069" : color,
                // background: isLocked ? "#00000069" : "",
              }
            }
          >
            {isLocked && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[var(--secondary)]">
                <Lock size={40} className={`${shakeLock ? "shake" : ""}`} />
              </div>
            )}

            <div className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xl font-medium text-[var(--secondary)] select-none whitespace-nowrap overflow-hidden text-ellipsis">
                {name}
              </span>

              <div className="bg-[var(--primary)] border-[0.005px] border-gray-600 w-auto p-2 rounded-xl flex items-center justify-center">
                {icon}
              </div>
            </div>

            <div className="w-full">
              <div
                className="h-[3px] max-w-32 my-5 rounded-xl"
                style={{
                  backgroundColor: color.slice(0, -2),
                  opacity: isLocked ? 0 : 1,
                }}
              ></div>

              <div>
                <span className="block text-[18px] font-semibold select-none py-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {loading ? (
                    <div className="spinner-save-data-button inline-block border-2 border-[var(--secondary)] border-r-transparent"></div>
                  ) : (
                    <span className="font-thin text-lg text-[var(--secondary)]">
                      {amount}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SummaryCard;
