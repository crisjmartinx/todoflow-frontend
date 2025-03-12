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
}

const LockItems: Record<string, { name: string; path: string }> = {
  projects: { name: "Projectos", path: "/dashboard/projects" },
  notes: { name: "Tareas", path: "/dashboard/tasks" },
  tasks: { name: "Recordatorios", path: "/dashboard/reminders" },
  reminders: { name: "Aprendizaje", path: "/dashboard/learn" },
  finances: { name: "Finanzas", path: "/dashboard/finances" },
};

const Card: React.FC<Props> = ({
  id,
  index,
  name,
  amount,
  loading,
  color,
  link,
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
    <div
      className={`card-main reflection rounded-xl border border-gray-200 z-20 ${
        isLocked ? "hover:transform hover:none" : ""
      }`}
      style={{ animationDelay: `${index * 0.07}s` }}
      key={id}
    >
      <Link
        className="card"
        href={isLocked ? "#" : link}
        onClick={isLocked ? handleLockClick : undefined}
      >
        <div
          className={`bg-white border-[3px] p-5 rounded-xl flex flex-col justify-between h-full`}
          style={{
            borderColor: isLocked ? "#00000069" : color,
            background: isLocked ? "#00000069" : "",
          }}
        >
          {isLocked && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Lock
                size={60}
                color="#3d3d3d"
                className={`${shakeLock ? "shake" : ""}`}
              />
            </div>
          )}
          <div className="flex flex-row items-center justify-between pb-2 space-y-0">
            <span className="text-xl font-medium text-black select-none whitespace-nowrap overflow-hidden text-ellipsis">
              {name}
            </span>
            <UserIcon size={22} className=" text-[#3d3d3d] ml-5" />
          </div>

          <div className="w-full">
            <div
              style={{
                backgroundColor: color.slice(0, -2),
                opacity: isLocked ? 0 : 1,
              }}
              className="h-[3px] max-w-32 my-5 rounded-xl"
            ></div>

            <div>
              <span className="block text-[18px] font-semibold text-black select-none py-1 whitespace-nowrap overflow-hidden text-ellipsis">
                {loading ? (
                  <div
                    className="spinner-save-data-button inline-block"
                    style={{
                      border: "solid black",
                      borderRightColor: "white",
                    }}
                  ></div>
                ) : (
                  <span className="font-medium">{amount}</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
