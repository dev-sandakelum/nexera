'use client'
import Image from "next/image";
import React, { useState, useEffect } from 'react';

interface HeadingNavBarProps {
  data: string[];
}

export default function HeadingNavBar({ data }: HeadingNavBarProps) {
  const [displayData, setDisplayData] = useState(data);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  
  const previousRoutes = displayData.slice(0, -1);
  const activeRoute = displayData[displayData.length - 1];

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(displayData)) {
      // Start exit animation
      setIsExiting(true);
      
      // After exit completes, swap content and start enter animation
      setTimeout(() => {
        setDisplayData(data);
        setIsExiting(false);
        setIsEntering(true);
      }, 300); // Exit duration
      
      // End enter animation
      setTimeout(() => {
        setIsEntering(false);
      }, 300 + (data.length * 80) + 500); // Exit + stagger delays + active delay
    }
  }, [data, displayData]);

  return (
    <div className="heading-navbar">
      <div className={`route ${isExiting ? 'exiting' : ''} ${isEntering ? 'entering' : ''}`}>
        <p>
          {previousRoutes.map((item, index) => (
            <span 
              key={`${item}-${index}`}
              className="route-item"
              style={{ '--delay': `${index * 0.08}s` } as React.CSSProperties}
            >
              {item}
              <span className="separator"> &gt; </span>
            </span>
          ))}
          <span 
            className="active route-item"
            style={{ '--delay': `${previousRoutes.length * 0.08}s` } as React.CSSProperties}
          >
            {activeRoute}
          </span>
        </p>
      </div>
      <UserInfo />
    </div>
  );
}

export function UserInfo() {
  return (
    <div className="user-info">
      <div className="user-details">
        <div className="user-name">Hasitha Sandakelum</div>
        <div className="user-role">
          <div
            className="badge"
            style={{
              background: "var(--badge-03-bg)",
              color: "var(--badge-03-fg)",
            }}
          >
            NexRoot
          </div>
          <div
            className="badge"
            style={{
              background: "var(--badge-07-bg)",
              color: "var(--badge-07-fg)",
            }}
          >
            NexAdmin
          </div>
        </div>
      </div>
      <div className="user-avatar">
        <Image
          src={"/avatar/user.png"}
          alt="User Avatar"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}