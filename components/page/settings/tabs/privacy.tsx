import React from "react";
import { FiDownload } from "react-icons/fi";

export default function Privacy() {
  return "Oops! This feature isn’t available yet. Stay tuned!"
  return (
    <div className="privacySection">
      <div className="privacyGrid">
        <div className="privacyCard">
          <h3>Profile Visibility</h3>
          <p>Control who can see your profile</p>
          <select className="formSelect">
            <option>Public</option>
            <option>Private</option>
            <option>Friends Only</option>
          </select>
        </div>

        <div className="privacyCard">
          <h3>Data Sharing</h3>
          <div className="privacyToggles">
            <div className="privacyToggle">
              <span>Show email address</span>
              <label className="toggleSwitch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="privacyToggle">
              <span>Show phone number</span>
              <label className="toggleSwitch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="privacyToggle">
              <span>Share analytics data</span>
              <label className="toggleSwitch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="dataCard">
          <h3>Your Data</h3>
          <button className="dataBtn">
            <FiDownload /> Download My Data
          </button>
          <p className="dataInfo">Get a copy of your data in JSON format</p>
        </div>
      </div>
    </div>
  );
}
