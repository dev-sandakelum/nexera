import React from "react";
import { FiEdit2, FiLogOut, FiShield } from "react-icons/fi";

export default function Activity() {
  return "Oops! This feature isn’t available yet. Stay tuned!"
  return (
    <div className="activitySection">
      <div className="activityList">
        <div className="activityItem">
          <div className="activityIcon login">
            <FiLogOut />
          </div>
          <div className="activityDetails">
            <h4>Login from Chrome</h4>
            <p>Colombo, Sri Lanka • 192.168.1.1</p>
            <span className="activityTime">2 hours ago</span>
          </div>
        </div>

        <div className="activityItem">
          <div className="activityIcon edit">
            <FiEdit2 />
          </div>
          <div className="activityDetails">
            <h4>Profile Updated</h4>
            <p>Changed bio and headline</p>
            <span className="activityTime">1 day ago</span>
          </div>
        </div>

        <div className="activityItem">
          <div className="activityIcon security">
            <FiShield />
          </div>
          <div className="activityDetails">
            <h4>Password Changed</h4>
            <p>Successfully updated password</p>
            <span className="activityTime">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
