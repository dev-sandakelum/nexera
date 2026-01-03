import React from "react";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";

export default function Connected() {
  return (
    <div className="connectedSection">
      <div className="connectedGrid">
        <div className="connectedCard">
          <BsGoogle className="providerIcon google" />
          <div className="connectedInfo">
            <h4>Google</h4>
            <p>Not connected</p>
          </div>
          <button className="connectBtn">Connect</button>
        </div>

        <div className="connectedCard">
          <BsGithub className="providerIcon github" />
          <div className="connectedInfo">
            <h4>GitHub</h4>
            <p>Not connected</p>
          </div>
          <button className="connectBtn">Connect</button>
        </div>

        <div className="connectedCard">
          <BsFacebook className="providerIcon facebook" />
          <div className="connectedInfo">
            <h4>Facebook</h4>
            <p>Not connected</p>
          </div>
          <button className="connectBtn">Connect</button>
        </div>
      </div>
    </div>
  );
}
