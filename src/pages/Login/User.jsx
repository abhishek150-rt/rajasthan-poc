import React from "react";
import { styles } from "../../styled/login";

const User = ({ formData, handleInputChange, errors }) => {
  return (
    <>
      <div style={styles.formGroup}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          value={formData.citizenUsername}
          onChange={(e) => handleInputChange("citizenUsername", e.target.value)}
          style={{
            ...styles.textField,
            borderColor: errors.citizenUsername ? "red" : "#ddd",
          }}
          placeholder="Enter your username"
        />
        {errors.citizenUsername && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.citizenUsername}
          </span>
        )}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={formData.citizenPassword}
          onChange={(e) => handleInputChange("citizenPassword", e.target.value)}
          style={{
            ...styles.textField,
            borderColor: errors.citizenPassword ? "red" : "#ddd",
          }}
          placeholder="Enter your password"
        />
        {errors.citizenPassword && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.citizenPassword}
          </span>
        )}
      </div>
    </>
  );
};

export default User;
