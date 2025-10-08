import { Button } from "@mui/material";
import { styles } from "../../styled/login";

const OTPComponent = ({
  otpValues,
  handleOtpChange,
  handleBack,
  handleOtpSubmit,
  otpRefs,
}) => (
  <div style={styles.otpContainer}>
    <h2 style={styles.otpTitle}>Enter OTP</h2>
    <p style={styles.otpSubtitle}>
      We've sent a 4-digit code to your mobile number
    </p>

    <div style={styles.otpInputs}>
      {otpValues.map((value, index) => (
        <input
          key={index}
          ref={(el) => (otpRefs.current[index] = el)}
          type="text"
          value={value}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          style={{
            ...styles.otpInput,
            borderColor: value ? "#1976d2" : "#ddd",
          }}
          maxLength={1}
        />
      ))}
    </div>

    <Button
      onClick={handleOtpSubmit}
      disabled={otpValues.some((val) => val === "")}
      style={{
        ...styles.loginButton,
        opacity: otpValues.some((val) => val === "") ? 0.5 : 1,
        cursor: otpValues.some((val) => val === "") ? "not-allowed" : "pointer",
      }}
    >
      Verify OTP
    </Button>

    <p style={{ color: "#666", fontSize: "14px" }}>
      Didn't receive the code? <span style={styles.link}>Resend OTP</span>
    </p>

    <Button style={styles.backButton} onClick={handleBack}>
      ← Back to Login
    </Button>
  </div>
);

export default OTPComponent;
