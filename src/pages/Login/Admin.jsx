import { styles } from "../../styled/login";

const Admin = ({ formData, handleInputChange, errors }) => {
  return (
    <>
      <div style={styles.formGroup}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          value={formData.adminUsername}
          onChange={(e) => handleInputChange("adminUsername", e.target.value)}
          style={{
            ...styles.textField,
            borderColor: errors.adminUsername ? "red" : "#ddd",
          }}
          placeholder="Enter your username"
        />
        {errors.adminUsername && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.adminUsername}
          </span>
        )}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={formData.adminPassword}
          onChange={(e) => handleInputChange("adminPassword", e.target.value)}
          style={{
            ...styles.textField,
            borderColor: errors.adminPassword ? "red" : "#ddd",
          }}
          placeholder="Enter your password"
        />
        {errors.adminPassword && (
          <span style={{ color: "red", fontSize: "12px" }}>
            {errors.adminPassword}
          </span>
        )}
      </div>
    </>
  );
};

export default Admin;
