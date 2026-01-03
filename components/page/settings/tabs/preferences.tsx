import React from "react";
import { FiBell, FiGlobe, FiMail } from "react-icons/fi";

export default function Preferences() {
  return (
    <div className="preferencesSection">
      <div className="prefGrid">
        <div className="prefCard">
          <label>Theme</label>
          <select className="formSelect">
            <option>System Default</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div className="prefCard">
          <label>Language</label>
          <select className="formSelect">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        <div className="prefCard">
          <label>Time Zone</label>
          <select className="formSelect">
            <option>UTC +0:00</option>
            <option>UTC +5:30</option>
            <option>UTC -5:00</option>
          </select>
        </div>

        <div className="notifSection">
          <h3>Notifications</h3>
          <div className="notifList">
            <div className="notifItem">
              <div className="notifInfo">
                <FiMail />
                <div>
                  <h4>Email Notifications</h4>
                  <p>Receive updates via email</p>
                </div>
              </div>
              <label className="toggleSwitch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notifItem">
              <div className="notifInfo">
                <FiBell />
                <div>
                  <h4>Push Notifications</h4>
                  <p>Receive push notifications</p>
                </div>
              </div>
              <label className="toggleSwitch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notifItem">
              <div className="notifInfo">
                <FiGlobe />
                <div>
                  <h4>Marketing Emails</h4>
                  <p>Promotional content and updates</p>
                </div>
              </div>
              <label className="toggleSwitch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
