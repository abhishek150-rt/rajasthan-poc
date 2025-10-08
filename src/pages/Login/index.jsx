import React, { useState, useRef } from "react";
import { styles } from "../../styled/login";
import Admin from "./Admin";
import User from "./User";
import { Button } from "@mui/material";
import OTPComponent from "./OTP";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";
import { apiEndpoints } from "../../config/config";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("user");
  const [showOTP, setShowOTP] = useState(false);

  const { formData, setFormData, errors, setErrors, resetForm } = useForm({
    citizenUsername: "",
    citizenPassword: "",
    adminUsername: "",
    adminPassword: "",
  });

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setShowOTP(false);
    setFormData({
      citizenUsername: "",
      citizenPassword: "",
      adminUsername: "",
      adminPassword: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prevErrors) => {
      if (value.trim() !== "" && prevErrors[field]) {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      }
      return prevErrors;
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value && index < 5 && otpRefs.current[index + 1]) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleLogin = async () => {
    const newErrors = {};

    if (loginType === "admin") {
      if (!formData.adminUsername.trim())
        newErrors.adminUsername = "Username is required";
      if (!formData.adminPassword.trim())
        newErrors.adminPassword = "Password is required";
    } else if (loginType === "user") {
      if (!formData.citizenUsername.trim())
        newErrors.citizenUsername = "Username is required";

      if (!formData.citizenPassword.trim())
        newErrors.citizenPassword = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        username:
          loginType === "admin"
            ? formData.adminUsername
            : formData.citizenUsername,
        password:
          loginType === "admin"
            ? formData.adminPassword
            : formData.citizenPassword,
      };

      const endpoint =
        loginType === "admin"
          ? apiEndpoints.adminLogin
          : apiEndpoints.authenticate;

      const response = await apiPost(endpoint, payload);

      if (response?.data?.status === 200) {
        const { userId, citizenId, name, mobile, otp } = response?.data || {};

        // Store in localStorage if the value exists
        const keysToStore = { userId, citizenId, name, mobile, otp };
        Object.entries(keysToStore).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            localStorage.setItem(key, value);
          }
        });

        toast.success(response?.data?.message || "Logged in successfully!");

        if (loginType === "user") {
          navigate("/profile");
        } else {
          navigate("/users");
        }
      } else {
        toast.error(
          response?.data?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const handleOtpSubmit = () => {
    const otp = otpValues.join("");
    toast.success(`OTP ${otp} submitted successfully!`);
  };

  const handleBack = () => {
    setShowOTP(false);
    setOtpValues(["", "", "", ""]);
  };

  return (
    <div style={styles.container}>
      {/* <Header /> */}
      <div style={styles.paper}>
        <div style={{ display: "flex", minHeight: "600px" }}>
          <div
            style={{
              ...styles.rightPanel,
              width: "100%",
            }}
          >
            <div style={styles.card}>
              {!showOTP ? (
                <>
                  <div style={styles.header}>
                    <h2 style={styles.title}>Sign In</h2>
                    <p style={styles.subtitle}>
                      Choose your login type and enter credentials
                    </p>
                  </div>

                  {/* <div style={styles.toggleGroup}>
                    <Button
                      onClick={() => handleLoginTypeChange("user")}
                      style={{
                        ...styles.toggleButton,
                        ...(loginType === "user"
                          ? styles.toggleButtonActive
                          : {}),
                      }}
                    >
                      👤 User Login
                    </Button>
                    <Button
                      onClick={() => handleLoginTypeChange("admin")}
                      style={{
                        ...styles.toggleButton,
                        ...(loginType === "admin"
                          ? styles.toggleButtonActive
                          : {}),
                      }}
                    >
                      🛡️ Admin Login
                    </Button>
                  </div> */}

                  {loginType === "admin" ? (
                    <Admin
                      formData={formData}
                      handleInputChange={handleInputChange}
                      errors={errors}
                    />
                  ) : (
                    <User
                      formData={formData}
                      handleInputChange={handleInputChange}
                      errors={errors}
                    />
                  )}

                  <Button
                    onClick={handleLogin}
                    style={styles.loginButton}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "translateY(-1px)")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.transform = "translateY(0)")
                    }
                  >
                    🔑 Login
                  </Button>

                  <>
                    <div style={styles.divider}></div>
                    <div style={{ textAlign: "center" }}>
                      {loginType === "user" && (
                        <span style={{ color: "#666", fontSize: "14px" }}>
                          Don't have an account?{" "}
                          <span
                            style={styles.link}
                            onClick={() => navigate("/register")}
                          >
                            Register here
                          </span>
                        </span>
                      )}
                    </div>
                  </>
                </>
              ) : (
                <OTPComponent
                  otpValues={otpValues}
                  handleOtpChange={handleOtpChange}
                  handleBack={handleBack}
                  handleOtpSubmit={handleOtpSubmit}
                  otpRefs={otpRefs}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
