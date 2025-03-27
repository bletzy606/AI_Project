import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "./CSS/UserProfile.css";
import photo from "../components/images/06.png";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    title: "Fitness Enthusiast",
    trainingWeeks: "12",
    location: "New York, USA",
    joinDate: "15/05/2023",
    fullName: "Alex Johnson",
    height: "175",
    weight: "75",
    country: "United States",
    email: "alex.johnson@example.com",
    fitnessLevel: "Intermediate",
    workoutsPerWeek: "4",
    weeksCompleted: "12",
    avgMinutes: "45",
    consistency: "85",
    fitnessGoals:
      "My goal is to build muscle while improving cardiovascular health. I want to create a sustainable workout routine that fits my busy schedule.",
    preferences: ["Strength Training", "Cardio", "Yoga"],
    avatar: photo,
  });
  const [newPreference, setNewPreference] = useState("");
  const fileInputRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profile);
  };

  const handleDiscard = () => {
    setIsEditing(false);
  };

  const handleAddPreference = () => {
    if (newPreference.trim() !== "") {
      setProfile((prev) => ({
        ...prev,
        preferences: [...prev.preferences, newPreference.trim()],
      }));
      setNewPreference("");
    }
  };

  const removePreference = (index) => {
    setProfile((prev) => ({
      ...prev,
      preferences: prev.preferences.filter((_, i) => i !== index),
    }));
  };

  const getPreferenceIcon = (pref) => {
    switch (pref) {
      case "Strength Training":
        return "🏋️";
      case "Cardio":
        return "🏃";
      case "Yoga":
        return "🧘";
      default:
        return "➕";
    }
  };

  const getAvatarImage = () => {
    if (profile.avatar) {
      return profile.avatar;
    }
    return 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%238f5d45ff" width="200" height="200"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="70" dy=".35em" text-anchor="middle" x="100" y="100"%3EUP%3C/text%3E%3C/svg%3E';
  };

  return (
    <motion.div
      className="profile-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="profile-card" variants={cardVariants}>
        <motion.div className="profile-header" variants={itemVariants}>
          <div
            className={`profile-avatar ${isEditing ? "editable" : ""}`}
            onClick={triggerFileInput}
          >
            <motion.img
              src={getAvatarImage()}
              alt="User Profile"
              className="avatar-image"
              whileHover={{ scale: isEditing ? 1.05 : 1 }}
            />
            {isEditing && (
              <div className="avatar-edit-overlay">
                <span>Change Photo</span>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>

          <div className="profile-info">
            {isEditing ? (
              <motion.input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="profile-name-input"
                whileFocus={{ scale: 1.02 }}
              />
            ) : (
              <motion.h1 className="profile-name" variants={itemVariants}>
                {profile.name}
              </motion.h1>
            )}
            {isEditing ? (
              <motion.input
                type="text"
                name="title"
                value={profile.title}
                onChange={handleChange}
                className="profile-title-input"
                whileFocus={{ scale: 1.02 }}
              />
            ) : (
              <motion.p className="profile-title" variants={itemVariants}>
                {profile.title}
              </motion.p>
            )}
            <div className="profile-stats">
              {isEditing ? (
                <>
                  <motion.input
                    type="text"
                    name="trainingWeeks"
                    value={profile.trainingWeeks}
                    onChange={handleChange}
                    className="profile-stat-input"
                    whileFocus={{ scale: 1.02 }}
                  />{" "}
                  Weeks Training
                </>
              ) : (
                <motion.span className="stat-item" variants={itemVariants}>
                  🏋️ {profile.trainingWeeks} Weeks Training
                </motion.span>
              )}
              {isEditing ? (
                <motion.input
                  type="text"
                  name="joinDate"
                  value={profile.joinDate}
                  onChange={handleChange}
                  className="profile-stat-input"
                  whileFocus={{ scale: 1.02 }}
                />
              ) : (
                <motion.span className="stat-item" variants={itemVariants}>
                  📅 Joined {profile.joinDate}
                </motion.span>
              )}
            </div>
            {isEditing ? (
              <motion.input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="profile-location-input"
                whileFocus={{ scale: 1.02 }}
              />
            ) : (
              <motion.p className="profile-location" variants={itemVariants}>
                <span>📍 {profile.location}</span>
              </motion.p>
            )}
          </div>
        </motion.div>

        <motion.div className="profile-content" variants={containerVariants}>
          <motion.div className="profile-grid" variants={containerVariants}>
            <motion.div
              className="personal-info-section"
              variants={itemVariants}
            >
              <motion.h2 className="section-title" variants={itemVariants}>
                Personal Info
              </motion.h2>
              <motion.div className="info-grid" variants={containerVariants}>
                {[
                  {
                    label: "Full Name",
                    name: "fullName",
                    value: profile.fullName,
                  },
                  {
                    label: "Height (cm)",
                    name: "height",
                    value: profile.height,
                  },
                  {
                    label: "Weight (kg)",
                    name: "weight",
                    value: profile.weight,
                  },
                  { label: "Country", name: "country", value: profile.country },
                  { label: "Email", name: "email", value: profile.email },
                  {
                    label: "Fitness Level",
                    name: "fitnessLevel",
                    value: profile.fitnessLevel,
                  },
                ].map((field, index) => (
                  <motion.div
                    key={index}
                    className="info-field"
                    variants={itemVariants}
                    whileHover={{ scale: isEditing ? 1.02 : 1 }}
                  >
                    <label>{field.label}</label>
                    {isEditing ? (
                      field.name === "country" ||
                      field.name === "fitnessLevel" ? (
                        <motion.select
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          className="profile-select"
                          whileFocus={{ scale: 1.02 }}
                        >
                          {field.name === "country" ? (
                            <>
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="UK">United Kingdom</option>
                              <option value="Australia">Australia</option>
                            </>
                          ) : (
                            <>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </>
                          )}
                        </motion.select>
                      ) : (
                        <motion.input
                          type="text"
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          className="profile-input editable"
                          whileFocus={{ scale: 1.02 }}
                        />
                      )
                    ) : (
                      <div className="profile-input">{field.value}</div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="bio-section" variants={itemVariants}>
                <label>Fitness Goals</label>
                {isEditing ? (
                  <motion.textarea
                    name="fitnessGoals"
                    value={profile.fitnessGoals}
                    onChange={handleChange}
                    className="profile-textarea editable"
                    whileFocus={{ scale: 1.02 }}
                  />
                ) : (
                  <div className="profile-textarea">{profile.fitnessGoals}</div>
                )}
              </motion.div>
            </motion.div>

            <motion.div className="stats-section" variants={itemVariants}>
              <motion.h2 className="section-title" variants={itemVariants}>
                Workout Stats
              </motion.h2>
              <motion.div className="stats-grid" variants={containerVariants}>
                {[
                  {
                    name: "workoutsPerWeek",
                    label: "Workouts/Week",
                    value: profile.workoutsPerWeek,
                  },
                  {
                    name: "avgMinutes",
                    label: "Avg. Minutes",
                    value: profile.avgMinutes,
                  },
                  {
                    name: "weeksCompleted",
                    label: "Weeks Completed",
                    value: profile.weeksCompleted,
                  },
                  {
                    name: "consistency",
                    label: "Consistency",
                    value: `${profile.consistency}%`,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                  >
                    {isEditing ? (
                      <motion.input
                        type="text"
                        name={stat.name}
                        value={stat.value}
                        onChange={handleChange}
                        className="stat-value-input"
                        whileFocus={{ scale: 1.05 }}
                      />
                    ) : (
                      <h3 className="stat-value">{stat.value}</h3>
                    )}
                    <p className="stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="preferences-section"
                variants={itemVariants}
              >
                <motion.h3 className="subsection-title" variants={itemVariants}>
                  Workout Preferences
                </motion.h3>
                <motion.div
                  className="preferences-tags"
                  variants={containerVariants}
                >
                  {profile.preferences.map((pref, index) => (
                    <motion.div
                      key={index}
                      className="preference-tag-container"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="preference-tag">
                        {getPreferenceIcon(pref)} {pref}
                      </span>
                      {isEditing && (
                        <motion.button
                          className="remove-preference-btn"
                          onClick={() => removePreference(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          ×
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                  {isEditing && (
                    <motion.div
                      className="add-preference-container"
                      variants={itemVariants}
                    >
                      <motion.input
                        type="text"
                        value={newPreference}
                        onChange={(e) => setNewPreference(e.target.value)}
                        placeholder="Add preference"
                        className="new-preference-input"
                        whileFocus={{ scale: 1.02 }}
                      />
                      <motion.button
                        className="add-preference-btn"
                        onClick={handleAddPreference}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div className="profile-actions" variants={itemVariants}>
          {isEditing ? (
            <>
              <motion.button
                className="discard-btn"
                onClick={handleDiscard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discard Changes
              </motion.button>
              <motion.button
                className="save-btn"
                onClick={handleSave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Profile
              </motion.button>
            </>
          ) : (
            <motion.button
              className="save-btn"
              onClick={toggleEdit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Modify Profile
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
