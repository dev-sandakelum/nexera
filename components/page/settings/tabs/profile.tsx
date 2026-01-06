import { NexeraUser } from "@/components/types";
import Image from "next/image";
import React, { useState } from "react";
import { FiCamera, FiTrash2 } from "react-icons/fi";

export default function Profile({
  user,
  formUser,
  setFormUser,
  isEditing,
  avatarPreview,
  avatarUpdated,
  setShowAvatarModal,
  handleUpdateUser,
}: {
  user: NexeraUser;
  formUser: NexeraUser;
  setFormUser: React.Dispatch<React.SetStateAction<NexeraUser>>;
  isEditing: boolean;
  avatarPreview: string | null;
  avatarUpdated: boolean;
  setShowAvatarModal: (show: boolean) => void;
  handleUpdateUser: () => void;
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
                  src={
                    avatarUpdated
                      ? avatarPreview || user.profilePicture
                      : user.profilePicture
                  }
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
                  defaultValue={formUser.name}
                  onChange={(e) =>
                    setFormUser((pre) => ({ ...pre!, name: e.target.value }))
                  }
                />
              ) : (
                <p className="formValue">{formUser.name}</p>
              )}
            </div>
            <div className="formGroup">
              <label>Email</label>
              <p className="formValue">{formUser.email}</p>
            </div>
          </div>

          <div className="formRow">
            <div className="formGroup">
              <label>Headline</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={formUser.headline}
                  placeholder="Your professional headline"
                  onChange={(e) =>
                    setFormUser((pre) => ({
                      ...pre!,
                      headline: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="formValue">{formUser.headline || "-"}</p>
              )}
            </div>
            <div className="formGroup">
              <label>Location</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={formUser.location}
                  placeholder="City, Country"
                  onChange={(e) =>
                    setFormUser((pre) => ({
                      ...pre!,
                      location: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="formValue">{formUser.location || "-"}</p>
              )}
            </div>
          </div>

          <div className="formGroup">
            <label>Bio</label>
            {isEditing ? (
              <textarea
                className="formTextarea"
                defaultValue={formUser.bio}
                placeholder="Tell us about yourself..."
                rows={4}
                onChange={(e) =>
                  setFormUser((pre) => ({ ...pre!, bio: e.target.value }))
                }
              />
            ) : (
              <p className="formValue bio">{formUser.bio || "-"}</p>
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
                  defaultValue={formUser.academic.institution}
                  onChange={(e) =>
                    setFormUser((pre) => ({
                      ...pre!,
                      academic: {
                        ...pre!.academic,
                        institution: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                <p className="formValue">
                  {formUser.academic.institution || "-"}
                </p>
              )}
            </div>
            <div className="formGroup">
              <label>Degree</label>
              {isEditing ? (
                <input
                  type="text"
                  className="formInput"
                  defaultValue={formUser.academic.degree}
                  onChange={(e) =>
                    setFormUser((pre) => ({
                      ...pre!,
                      academic: { ...pre!.academic, degree: e.target.value },
                    }))
                  }
                />
              ) : (
                <p className="formValue">{formUser.academic.degree || "-"}</p>
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
                  defaultValue={formUser.academic.fieldOfStudy}
                  onChange={(e) =>
                    setFormUser((pre) => ({
                      ...pre!,
                      academic: {
                        ...pre!.academic,
                        fieldOfStudy: e.target.value,
                      },
                    }))
                  }
                />
              ) : (
                <p className="formValue">
                  {formUser.academic.fieldOfStudy || "-"}
                </p>
              )}
            </div>
            <div className="formGroup">
              <label>Graduation Year</label>
              {isEditing ? (
                <input
                  type="number"
                  className="formInput"
                  defaultValue={formUser.academic.graduationYear}
                  onChange={(e) =>
                    setFormUser((pre) => ({
                      ...pre!,
                      academic: {
                        ...pre!.academic,
                        graduationYear: Number(e.target.value),
                      },
                    }))
                  }
                />
              ) : (
                <p className="formValue">
                  {formUser.academic.graduationYear || "-"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
