import type { User } from "../../types/user";
import { deriveStats } from "../../utils/deriveStats";
import "./StartCards.scss";

interface StatCardsProps {
  users: User[];
  isLoading: boolean;
}

const CARD_CONFIG = [
  { key: "totalUsers" as const, label: "Users", icon: "/use2.png" },
  { key: "activeUsers" as const, label: "Active users", icon: "/use1.png" },
  {
    key: "usersWithLoans" as const,
    label: "Users with loans",
    icon: "/use3.png",
  },
  {
    key: "usersWithSavings" as const,
    label: "Users with savings",
    icon: "/use4.png",
  },
];

function StatCards({ users, isLoading }: StatCardsProps) {
  const stats = deriveStats(users);

  return (
    <div className="stat-cards" role="region" aria-label="User statistics">
      {CARD_CONFIG.map((card) => (
        <div key={card.key} className="stat-cards__card">
          <img src={card.icon} alt="" />
          <p className="stat-cards__label">{card.label}</p>
          <p className="stat-cards__value">
            {isLoading ? (
              <span className="stat-cards__skeleton" aria-hidden="true" />
            ) : (
              stats[card.key].toLocaleString()
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
