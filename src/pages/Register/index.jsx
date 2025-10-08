import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  Avatar,
  Card,
  CardContent,
  styled,
  alpha,
  Chip,
} from "@mui/material";
import {
  PhotoCamera,
  Badge,
  Person,
  FamilyRestroom,
  Phone,
  Email,
  Home,
} from "@mui/icons-material";
import Header from "../../components/Header";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";
import { primaryColor } from "../../styled/login";
import { useNavigate } from "react-router-dom";
import { apiEndpoints } from "../../config/config";
import { apiPost } from "../../services/api";
import Loader from "../../components/Loader";

// Styled Components
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${primaryColor} 0%, #764ba2 100%)`,
  padding: "10px",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
    opacity: 0.4,
  },
}));

const FormCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.125rem",
  fontWeight: 700,
  color: "#2d3748",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "&::before": {
    content: '""',
    width: "4px",
    height: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "4px",
  },
}));

export const StyledInput = styled("input")(({ theme, error }) => ({
  width: "100%",
  padding: "14px 16px",
  border: "2px solid",
  borderColor: error ? "#ef4444" : alpha("#667eea", 0.15),
  borderRadius: "12px",
  fontSize: "15px",
  backgroundColor: alpha("#667eea", 0.02),
  fontFamily: "inherit",
  transition: "all 0.3s ease",
  outline: "none",
  "&:focus": {
    borderColor: error ? "#ef4444" : "#667eea",
    backgroundColor: "#fff",
    boxShadow: `0 0 0 4px ${
      error ? alpha("#ef4444", 0.1) : alpha("#667eea", 0.1)
    }`,
  },
  "&::placeholder": {
    color: "#94a3b8",
  },
  "&:disabled": {
    backgroundColor: "#f1f5f9",
    cursor: "not-allowed",
  },
}));

const StyledSelect = styled("select")(({ theme, error }) => ({
  width: "100%",
  padding: "14px 16px",
  border: "2px solid",
  borderColor: error ? "#ef4444" : alpha("#667eea", 0.15),
  borderRadius: "12px",
  fontSize: "15px",
  backgroundColor: alpha("#667eea", 0.02),
  fontFamily: "inherit",
  transition: "all 0.3s ease",
  outline: "none",
  cursor: "pointer",
  "&:focus": {
    borderColor: error ? "#ef4444" : "#667eea",
    backgroundColor: "#fff",
    boxShadow: `0 0 0 4px ${
      error ? alpha("#ef4444", 0.1) : alpha("#667eea", 0.1)
    }`,
  },
}));

const StyledTextarea = styled("textarea")(({ theme, error }) => ({
  width: "100%",
  padding: "14px 16px",
  border: "2px solid",
  borderColor: error ? "#ef4444" : alpha("#667eea", 0.15),
  borderRadius: "12px",
  fontSize: "15px",
  backgroundColor: alpha("#667eea", 0.02),
  fontFamily: "inherit",
  transition: "all 0.3s ease",
  outline: "none",
  resize: "vertical",
  minHeight: "100px",
  "&:focus": {
    borderColor: error ? "#ef4444" : "#667eea",
    backgroundColor: "#fff",
    boxShadow: `0 0 0 4px ${
      error ? alpha("#ef4444", 0.1) : alpha("#667eea", 0.1)
    }`,
  },
  "&::placeholder": {
    color: "#94a3b8",
  },
}));

export const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: "#475569",
  marginBottom: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: "#ef4444",
  fontSize: "13px",
  marginTop: "6px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const UploadArea = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  padding: "24px",
  background: alpha("#667eea", 0.03),
  borderRadius: "16px",
  border: `2px dashed ${alpha("#667eea", 0.3)}`,
}));

export default function UserRegistration() {
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm({
    aadhaarId: "",
    fullName: "",
    gender: "",
    dob: "",
    age: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    email: "",
    permanentAddress: "",
    photograph: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const genderOptions = ["Male", "Female", "Other"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photograph: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.aadhaarId || !/^\d{12}$/.test(formData.aadhaarId)) {
      newErrors.aadhaarId = "Aadhaar ID must be 12 digits";
    }

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    // if (
    //   !formData.permanentAddress ||
    //   formData.permanentAddress.trim().length < 10
    // ) {
    //   newErrors.permanentAddress =
    //     "Permanent address is required (min 10 characters)";
    // }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please check validation errors");
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const payload = {
          aadhaarId: formData.aadhaarId,
          fullName: formData.fullName,
          gender: formData.gender,
          dob: formData.dob,
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          mobile: formData.mobile,
          email: formData.email,
          permanentAddress: formData.permanentAddress,
          photograph:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0FUYuR8haHAAtZYzpO0fV8OOA_K2ASz5BLQ&s",
        };

        const response = await apiPost(apiEndpoints.register, payload);

        // Check for status
        if (response?.data?.status === 200) {
          toast.success(
            response?.data?.message || "User Registration successfull!"
          );
          resetForm();
        } else {
          toast.error(
            response?.data?.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Login error:", error);
        const message =
          error?.response?.data?.message ||
          "Something went wrong. Please try again.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f7fafc",
          margin: "70px auto",
        }}
      >
        {/* Header with Gradient */}
        <GradientBox>
          <Box
            sx={{
              maxWidth: "1200px",
              //   margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 700,
                display: "flex",
                // alignItems: "center",
                gap: 2,
              }}
            >
              <Person sx={{ fontSize: 40 }} />
              User Registration
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.9), mt: 1 }}>
              Please fill in all required information to complete your
              registration
            </Typography>
          </Box>
        </GradientBox>

        {/* Main Content */}
        <Box sx={{ margin: "auto", pb: 6 }}>
          <FormCard elevation={0}>
            <CardContent sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Photo Upload Section */}
                <Box sx={{ mb: 5 }}>
                  <SectionTitle>
                    <PhotoCamera /> Upload Photo
                  </SectionTitle>
                  <UploadArea>
                    <Avatar
                      src={formData.photograph}
                      sx={{
                        width: 120,
                        height: 120,
                        border: "4px solid white",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Box>
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<PhotoCamera />}
                        sx={{
                          textTransform: "none",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "10px",
                          px: 3,
                          py: 1.5,
                          fontWeight: 600,
                          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                          "&:hover": {
                            boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
                          },
                        }}
                      >
                        Choose Photo
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </Button>
                      <Typography
                        variant="caption"
                        sx={{ display: "block", mt: 1, color: "#64748b" }}
                      >
                        Upload a clear photo (JPG, PNG, max 2MB)
                      </Typography>
                    </Box>
                  </UploadArea>
                </Box>

                {/* Basic Details Section */}
                <Box sx={{ mb: 5 }}>
                  <SectionTitle>
                    <Badge /> Basic Details
                  </SectionTitle>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>
                          Aadhaar ID <span style={{ color: "#ef4444" }}>*</span>
                        </FieldLabel>
                        <StyledInput
                          type="text"
                          value={formData.aadhaarId}
                          onChange={(e) =>
                            handleInputChange("aadhaarId", e.target.value)
                          }
                          error={errors.aadhaarId}
                          placeholder="Enter 12-digit Aadhaar ID"
                          maxLength={12}
                        />
                        {errors.aadhaarId && (
                          <ErrorText>⚠ {errors.aadhaarId}</ErrorText>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>
                          Full Name <span style={{ color: "#ef4444" }}>*</span>
                        </FieldLabel>
                        <StyledInput
                          type="text"
                          value={formData.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          error={errors.fullName}
                          placeholder="Enter your full name"
                        />
                        {errors.fullName && (
                          <ErrorText>⚠ {errors.fullName}</ErrorText>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>
                          Gender <span style={{ color: "#ef4444" }}>*</span>
                        </FieldLabel>
                        <StyledSelect
                          value={formData.gender}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          error={errors.gender}
                        >
                          <option value="">Select Gender</option>
                          {genderOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </StyledSelect>
                        {errors.gender && (
                          <ErrorText>⚠ {errors.gender}</ErrorText>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>
                          Date of Birth{" "}
                          <span style={{ color: "#ef4444" }}>*</span>
                        </FieldLabel>
                        <StyledInput
                          type="date"
                          value={formData.dob}
                          onChange={(e) =>
                            handleInputChange("dob", e.target.value)
                          }
                          error={errors.dob}
                        />
                        {errors.dob && <ErrorText>⚠ {errors.dob}</ErrorText>}
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>
                          Age
                          <Chip
                            label="Auto-calculated"
                            size="small"
                            sx={{
                              ml: 1,
                              height: "20px",
                              fontSize: "11px",
                              bgcolor: alpha("#667eea", 0.1),
                              color: "#667eea",
                            }}
                          />
                        </FieldLabel>
                        <StyledInput
                          type="text"
                          value={formData.age}
                          disabled
                          placeholder="Auto-calculated from DOB"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* Family Details Section */}
                <Box sx={{ mb: 5 }}>
                  <SectionTitle>
                    <FamilyRestroom /> Family Details
                  </SectionTitle>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>Father's Name</FieldLabel>
                        <StyledInput
                          type="text"
                          value={formData.fatherName}
                          onChange={(e) =>
                            handleInputChange("fatherName", e.target.value)
                          }
                          placeholder="Enter father's name"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>Mother's Name</FieldLabel>
                        <StyledInput
                          type="text"
                          value={formData.motherName}
                          onChange={(e) =>
                            handleInputChange("motherName", e.target.value)
                          }
                          placeholder="Enter mother's name"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* Contact Details Section */}
                <Box sx={{ mb: 5 }}>
                  <SectionTitle>Contact Details</SectionTitle>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>
                          <Phone sx={{ fontSize: 18 }} />
                          Mobile Number{" "}
                          <span style={{ color: "#ef4444" }}>*</span>
                        </FieldLabel>
                        <StyledInput
                          type="text"
                          value={formData.mobile}
                          onChange={(e) =>
                            handleInputChange("mobile", e.target.value)
                          }
                          error={errors.mobile}
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                        />
                        {errors.mobile && (
                          <ErrorText>⚠ {errors.mobile}</ErrorText>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FieldLabel>
                          <Email sx={{ fontSize: 18 }} />
                          Email <span style={{ color: "#ef4444" }}>*</span>
                        </FieldLabel>
                        <StyledInput
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          error={errors.email}
                          placeholder="Enter your email address"
                        />
                        {errors.email && (
                          <ErrorText>⚠ {errors.email}</ErrorText>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box>
                        <FieldLabel>
                          <Home sx={{ fontSize: 18 }} />
                          Permanent Address{" "}
                          {/* <span style={{ color: "#ef4444" }}>*</span> */}
                        </FieldLabel>
                        <StyledTextarea
                          value={formData.permanentAddress}
                          onChange={(e) =>
                            handleInputChange(
                              "permanentAddress",
                              e.target.value
                            )
                          }
                          // error={errors.permanentAddress}
                          placeholder="Enter your complete permanent address"
                          rows={3}
                        />
                        {/* {errors.permanentAddress && (
                          <ErrorText>⚠ {errors.permanentAddress}</ErrorText>
                        )} */}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* Action Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    pt: 3,
                    borderTop: `2px solid ${alpha("#667eea", 0.1)}`,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      px: 4,
                      py: 1.5,
                      borderRadius: "10px",
                      borderColor: "#667eea",
                      color: "#667eea",
                      fontWeight: 600,
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                        borderColor: "#5568d3",
                        bgcolor: alpha("#667eea", 0.05),
                      },
                    }}
                    onClick={() => {
                      resetForm();
                      setErrors({});
                      navigate(-1);
                    }}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      px: 5,
                      py: 1.5,
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: 600,
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    SAVE REGISTRATION
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </FormCard>
        </Box>
      </Box>
      {loading && <Loader />}
    </div>
  );
}
