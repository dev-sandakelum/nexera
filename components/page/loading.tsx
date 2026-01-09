import "@/components/styles/loading.css";
import React from "react";
export default function LoadingAnimation() {
  return (
    <div className="loadingContainer">
      <div
        className="loadingLogo"
        style={
          {
            "--logo-light": "url(/logo/logo.gif)",
            "--logo-dark": "url(/logo/logo-dark.gif)",
            "--logo-contrast": "url(/logo/logo-contrast.gif)",
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
}
