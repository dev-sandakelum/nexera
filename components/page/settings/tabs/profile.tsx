import { NexeraUser } from "@/components/types";
import Image from "next/image";
import React from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

export default function Profile({
  user,
  isEditing,
  setShowAvatarModal,
}: {
  user: NexeraUser;
  isEditing: boolean;
  setShowAvatarModal: (show: boolean) => void;
}) {
  return (
    <div className="profileSection">
      <div className="sectionGrid">
        {/* Avatar */}
        <div className="avatarSection">
          <label>Profile Picture</label>
          <div className="avatarWrapper">
            <div className="avatarLarge">
              {user.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt={user.name}
                  width={120}
                  height={120}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <span className="avatarPlaceholder">{user.name.charAt(0)}</span>
              )}
            </div>
            {isEditing && (
              <div className="avatarActions">
                <button
                  className="avatarBtn"
                  onClick={() => setShowAvatarModal(true)}
                >
                  <FiCamera /> Change
                </button>
                <button className="avatarBtn danger">
                  <FiTrash2 /> Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="formSection">
          <div className="formRow">
            <div className="formGroup">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={user.name}
                />
              ) : (
                <p className="formValue">{user.name}</p>
              )}
            </div>
            <div className="formGroup">
              <label>Email</label>
              <p className="formValue">{user.email}</p>
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Headline</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={user.headline}
                  placeholder="Your professional headline"
                />
              ) : (
                <p className="formValue">{user.headline || "-"}</p>
              )}
            </div>
            <div className="formGroup">
              <label>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={user.location}
                  placeholder="City, Country"
                />
              ) : (
                <p className="formValue">{user.location || "-"}</p>
              )}
            </div>
          </div>

          <div className="formGroup">
            <label>Bio</label>
            {isEditing ? (
              <textarea
                className="formTextarea"
                defaultValue={user.bio}
                placeholder="Tell us about yourself..."
                rows={4}
              />
            ) : (
              <p className="formValue bio">{user.bio || "-"}</p>
            )}
          </div>

          {/* Academic Info */}
          <div className="subsectionHeader">
            <h3>Academic Information</h3>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Institution</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={user.academic.institution}
                />
              ) : (
                <p className="formValue">{user.academic.institution || "-"}</p>
              )}
            </div>
            <div className="formGroup">
              <label>Degree</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={user.academic.degree}
                />
              ) : (
                <p className="formValue">{user.academic.degree || "-"}</p>
              )}
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Field of Study</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={user.academic.fieldOfStudy}
                />
              ) : (
                <p className="formValue">{user.academic.fieldOfStudy || "-"}</p>
              )}
            </div>
            <div className="formGroup">
              <label>Graduation Year</label>
              {isEditing ? (
                <input
                  type="number"
                  className="formInput"
                  defaultValue={user.academic.graduationYear}
                />
              ) : (
                <p className="formValue">
                  {user.academic.graduationYear || "-"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
