"use client";

import React from "react";

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
  } as React.CSSProperties;

  return (
    <div className={`pc-card-wrapper ${className}`.trim()}>
      <section className="pc-card" style={cardStyle}>
        <div className="pc-content">
          <div className="pc-details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
