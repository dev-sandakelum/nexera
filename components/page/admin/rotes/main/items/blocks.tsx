import Link from "next/link";
import React from "react";
import { BiHistory, BiShieldQuarter } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { LuCopyPlus } from "react-icons/lu";

export function NoteBlock() {
  return (
    <div
      className="CountStatus"
      style={
        {
          "--color": "var(--accent-soft)",
          "--bg": "var(--accent-soft-bg)",
        } as React.CSSProperties
      }
    >
      <div className="top">
        <div className="icon">
          <LuCopyPlus />
        </div>
        <div className="badge">Notes Module</div>
      </div>
      <div className="middle">
        <h1 className="number">1786</h1>
        <p className="description">Total notes created</p>
      </div>
      <div className="bottom">
        <Link href={"/Admin/notes-management"} className="btn">
          Manage
        </Link>
        <div className="icon">
          <FiSettings />
        </div>
      </div>
      <div className="bg">
        <LuCopyPlus />
      </div>
    </div>
  );
}

export function AuthBlock() {
  return (
    <div
      className="CountStatus"
      style={
        {
          "--color": "var(--success-soft)",
          "--bg": "var(--success-soft-bg)",
        } as React.CSSProperties
      }
    >
      <div className="top">
        <div className="icon">
          <BiShieldQuarter />
        </div>
        <div className="badge">Auth</div>
      </div>
      <div className="middle">
        <h1 className="number">326</h1>
        <p className="description">Total registed users</p>
      </div>
      <div className="bottom">
        <Link href={"/Admin/user-management"} className="btn">
          Manage
        </Link>
        <div className="icon">
          <FiSettings />
        </div>
      </div>
      <div className="bg">
        <BiShieldQuarter />
      </div>
    </div>
  );
}

export function PendingBlock() {
  return (
    <div
      className="CountStatus"
      style={
        {
          "--color": "var(--danger-soft)",
          "--bg": "var(--danger-soft-bg)",
        } as React.CSSProperties
      }
    >
      <div className="top">
        <div className="icon">
          <BiHistory />
        </div>
        <div className="badge">Pending</div>
      </div>
      <div className="middle">
        <h1 className="number">12</h1>
        <p className="description">Requires Attention</p>
      </div>
      <div className="bottom">
        <button className="btn">Review</button>
        <div className="icon">
          <FiSettings />
        </div>
      </div>
      <div className="bg">
        <BiHistory />
      </div>
    </div>
  );
}
