"use client";

import React, { ReactNode } from "react";

interface InfoDisplayProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  className?: string;
}

const InfoCard: React.FC<InfoDisplayProps> = ({
  icon,
  label,
  value,
  className = "",
}) => {
  const formattedNumber =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className={`bg-gray-900 flex items-center rounded-lg p-4 w-[419px] space-x-3 ${className}`}
    >
      <div className="text-gray-400 w-6 h-6">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-white text-3xl font-bold">{formattedNumber}</span>
      </div>
    </div>
  );
};

export default InfoCard;