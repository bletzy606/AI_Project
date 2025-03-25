import React from 'react';
import './CSS/UserProfile.css';

const UserProfile = () => {
    return (
        <div className="profile-container1">
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src="/api/placeholder/200/200" alt="Profile" />
          <div className="edit-icon">✏️</div>
        </div>
        <h1>Raguvaran Manirathnam</h1>
        <p className="job-title">Fitness Trainer & Nutritionist</p>
      </div>

      <div className="profile-details">
        <div className="personal-info">
          <h2>Personal Info</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <input type="text" value="Raguvaran Manirathnam" readOnly />
            </div>
            <div className="info-item">
              <label>Contact Number</label>
              <input type="text" value="9876543210" readOnly />
            </div>
            <div className="info-item">
              <label>Designation</label>
              <input type="text" value="Fitness Trainer & Nutritionist" readOnly />
            </div>
            <div className="info-item">
              <label>Email ID</label>
              <input type="text" value="fitnessstudio360@gmail.com" readOnly />
            </div>
            <div className="info-item">
              <label>Gender</label>
              <select defaultValue="Male">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="info-item">
              <label>Location</label>
              <input type="text" value="Nungambakkam, Chennai - 06" readOnly />
            </div>
          </div>

          <div className="bio-section">
            <label>Bio</label>
            <textarea 
              readOnly 
              value="Hey 💪 I'm Raguvaran a leader specialising in training for beginners. I help young body builders to find their inner fitness and peace by building a valuable and worth growth strategy."
            />
          </div>
        </div>

        <div className="studio-info">
          <div className="studio-details">
            <h3>360 Fitness Studio</h3>
            <p>Training Experience: 6+ years</p>
          </div>
        </div>

        <div className="achievements">
          <h2>Achievements</h2>
          <div className="achievement-stats">
            <div className="stat-item">
              <h3>50+</h3>
              <p>No. of People Trained</p>
            </div>
            <div className="stat-item">
              <h3>25</h3>
              <p>No. of Awards</p>
            </div>
          </div>

          <div className="titles-awards">
            <div className="award-chip">Mr. Model of Trichy</div>
            <div className="award-chip">Mr. Light-Weight</div>
            <button className="add-new-btn">Add New</button>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="discard-btn">Discard</button>
        <button className="save-btn">Save Changes</button>
      </div>
      </div>
      </div>

  );
};

export default UserProfile;