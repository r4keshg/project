export type Rank = "Beginner" | "Apprentice" | "Scholar" | "Master" | "Grandmaster";

export const ranks: Rank[] = ["Beginner", "Apprentice", "Scholar", "Master", "Grandmaster"];

export const rankThresholds = {
  Beginner: 0,
  Apprentice: 1000,
  Scholar: 3000,
  Master: 7000,
  Grandmaster: 15000,
};

export function getNextRank(currentRank: Rank): Rank | null {
  const currentIndex = ranks.indexOf(currentRank);
  return currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null;
}

export function getRankColor(rank: Rank): string {
  switch (rank) {
    case "Beginner":
      return "text-blue-500";
    case "Apprentice":
      return "text-green-500";
    case "Scholar":
      return "text-purple-500";
    case "Master":
      return "text-orange-500";
    case "Grandmaster":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}
