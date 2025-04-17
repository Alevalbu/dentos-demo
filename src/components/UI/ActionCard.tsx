"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface ActionCardProps {
  title: string;
  description: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full mb-2">
      <div className="flex items-center gap-1 mb-2">
        <ChevronLeft className="text-blue-600" />
        <ChevronRight className="text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ActionCard;
