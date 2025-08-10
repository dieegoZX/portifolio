
"use client";

import React from "react";
import './ProfileCard.css';

interface ProfileCardProps {
  backgroundUrl?: string;
  name?: string;
  title?: string;
  className?: string;
  showUserInfo?: boolean;
}

const ProfileCardComponent: React.FC<ProfileCardProps> = ({
  backgroundUrl,
  name = "Diego Ruan",
  title = "Desenvolvedor",
  className = "",
  showUserInfo = true,
}) => {

  const cardStyle = {
    '--card-bg-image': backgroundUrl ? `url(${backgroundUrl})` : 'none',
  } as React.CSSProperties;

  return (
    <div className={`pc-card-wrapper ${className}`.trim()}>
      <section className="pc-card" style={cardStyle}>
        <div className="pc-inside" />
        {showUserInfo && (
            <div className="pc-content">
                <div className="pc-details">
                    <h3>{name}</h3>
                    <p>{title}</p>
                </div>
            </div>
        )}
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);

export default ProfileCard;
