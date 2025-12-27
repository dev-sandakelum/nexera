import { BiPowerOff, BiShieldQuarter } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa6";
import { FiAirplay } from "react-icons/fi";
import { LuPowerOff } from "react-icons/lu";

export function PowerButton() {
  return (
    <div
      className="controlBtn"
      style={
        {
          "--color": "var(--accent-soft)",
          "--bg": "var(--accent-soft-bg)",
          "--border": "var(--accent-soft-border)",
        } as React.CSSProperties
      }
    >
      <div className="icon">
        <LuPowerOff />
      </div>
      <div className="label">
        <p>Drop Server</p>
      </div>
    </div>
  );
}
export function DisableRegistrationButton() {
  return (
    <div
      className="controlBtn"
      style={
        {
          "--color": "var(--success-soft)",
          "--bg": "var(--success-soft-bg)",
          "--border": "var(--success-soft-border)",
        } as React.CSSProperties
      }
    >
      <div className="icon">
        <BiShieldQuarter />
      </div>
      <div className="label">
        <p>Disable Registration</p>
      </div>
    </div>
  );
}
export function MakeAdminsONLY() {
  return (
    <div
      className="controlBtn"
      style={
        {
          "--color": "var(--warning-soft)",
          "--bg": "var(--warning-soft-bg)",
          "--border": "var(--warning-soft-border)",
        } as React.CSSProperties
      }
    >
      <div className="icon">
        <FiAirplay />
      </div>
      <div className="label">
        <p>Make Admins ONLY</p>
      </div>
    </div>
  );
}
