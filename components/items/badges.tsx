"use client";
import { nexBadges } from "@/public/json/badges";
import "@/components/styles/items/badges.css";

export function GetLocalBadges({ type }: { type: string }) {
  const badge = nexBadges.find((badge) => badge.id === type);
  return badge;
}

export default function Badges({ type }: { type: string }) {
    const badge = GetLocalBadges({ type });
  if (!badge) {
    return <div>Badge not found</div>;
  }
  return (
    <div
      className={`badges ${badge.id}`}
      key={`badge-${badge.id}-${Date.now()}`}
      style={{
        backgroundColor: badge.color.bgColor,
        color: badge.color.textColor,
        borderColor: badge.color.borderColor,
      }}
    >
      {badge.name}
    </div>
  );
}
