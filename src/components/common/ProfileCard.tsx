"use client";

import React from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  backgroundUrl?: string;
  name?: string;
  title?: string;
  className?: string;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  backgroundUrl,
  name = "Diego Ruan",
  title = "Desenvolvedor",
  className = "",
}) => {

  const cardStyle = {
    backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
  };

  return (
    <div className={`pc-card-wrapper ${className}`.trim()}>
      <div className="pc-card" style={cardStyle}>
        <div className="pc-content">
          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
