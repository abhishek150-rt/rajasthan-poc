import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  styled,
  alpha,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Home,
  Badge,
  Cake,
  Wc,
  FamilyRestroom,
  Shield,
  Verified,
} from "@mui/icons-material";
import Header from "../../components/Header";
import { primaryColor } from "../../styled/login";
import { apiGet, apiPost } from "../../services/api";
import { apiEndpoints } from "../../config/config";
import { toast } from "react-toastify";
import { FieldLabel } from "../Register";
import { HelpOutline } from "@mui/icons-material";
import { Tooltip, IconButton } from "@mui/material";
import Loader from "../../components/Loader";

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

const ProfileCard = styled(Card)(({ theme }) => ({
  marginTop: "0px",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
  overflow: "visible",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: "6px solid white",
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  margin: "0 auto",
  marginTop: "-70px",
}));

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  border: "1px solid",
  borderColor: alpha("#667eea", 0.1),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 24px rgba(102, 126, 234, 0.15)",
    borderColor: alpha("#667eea", 0.3),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#2d3748",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  "&::before": {
    content: '""',
    width: "4px",
    height: "24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "4px",
  },
}));

const StyledTextField = styled(Box)(({ theme }) => ({
  width: "350px",
  padding: "14px 16px",
  border: "2px solid",
  borderColor: alpha("#667eea", 0.1),
  borderRadius: "12px",
  fontSize: "15px",
  backgroundColor: alpha("#667eea", 0.02),
  color: "#4a5568",
  fontWeight: 500,
  transition: "all 0.3s ease",
}));

const ConsentCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "12px",
  border: "1px solid",
  borderColor: alpha("#667eea", 0.1),
  transition: "all 0.3s ease",
  display: "flex",
  justifyContent: "space-between",
  "&:hover": {
    borderColor: alpha("#667eea", 0.3),
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.1)",
  },
}));

const UserProfile = () => {
  const [formData, setFormData] = useState(null);
  const [consents, setConsents] = useState([
    {
      id: 1,
      name: "Education",
      enabled: false,
      givenDate: "",
      expiryDate: "",
    },
    {
      id: 2,
      name: "Employment",
      enabled: false,
      givenDate: "",
      expiryDate: "",
    },
    {
      id: 3,
      name: "Employer",
      enabled: false,
      givenDate: "",
      expiryDate: "",
    },
    {
      id: 4,
      name: "Demography",
      enabled: false,
      givenDate: "",
      expiryDate: "",
    },
    {
      id: 5,
      name: "Property",
      enabled: false,
      givenDate: "",
      expiryDate: "",
    },
    {
      id: 6,
      name: "Health",
      enabled: false,
      givenDate: "",
      expiryDate: "",
    },
  ]);

  const [willingToConsent, setWillingToConsent] = useState(false);

  const [loading, setLoading] = useState(false);

  const getUserProfileData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const response = await apiGet(`${apiEndpoints.userDetails}/${userId}`);
      if (response.data.status === 200) {
        // setFormData(response.data.data);

        setFormData({
          photograph:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0FUYuR8haHAAtZYzpO0fV8OOA_K2ASz5BLQ&s",
          aadhaarId: "XXXX XXXX 1234",
          fullName: "John Doe",
          gender: "Male",
          dob: "15/01/1990",
          fatherName: "Robert Doe",
          motherName: "Mary Doe",
          mobile: "+91 98765 43210",
          email: "john.doe@example.com",
          permanentAddress:
            "123, Green Valley Apartments, MG Road, Bangalore, Karnataka - 560001",
        });

        toast.success("User data fetched successfully");
      } else {
        toast.error(response.data.messsage || "Failed to fetch user data");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getUserConsents = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await apiGet(`${apiEndpoints.userConsents}/${userId}`);
      if (response.data.status === 200) {
        setConsents(response.data.data);
        toast.success("User consents fetched successfully");
      } else {
        toast.error(response.data.messsage || "Failed to fetch user consents");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const giveUserConsents = async () => {
    try {
      setLoading(true);
      const citizenId = localStorage.getItem("userId");
      const consentPayload = consents.map((item) => ({
        category: item.name.toLowerCase(),
        status: item.enabled ? "Y" : "N",
      }));

      const payload = {
        citizenId: parseInt(citizenId, 10),
        consent: consentPayload,
      };

      const response = await apiPost(apiEndpoints.userConsents, payload);

      if (response && response.data && response.data.status === 200) {
        toast.success("User consents given successfully");
      } else {
        toast.error(
          response?.data?.message || "Failed to provide user consents"
        );
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfileData();
    getUserConsents();
  }, []);

  const handleConsentToggle = (index) => {
    // if (!willingToConsent) {
    //   toast.error("Please agree to give consent first");
    //   return;
    // }

    const newConsents = [...consents];
    newConsents[index].enabled = !newConsents[index].enabled;

    if (newConsents[index].enabled) {
      const today = new Date();
      const expiry = new Date(today);
      expiry.setFullYear(expiry.getFullYear() + 1);

      // newConsents[index].givenDate = today.toISOString().split("T")[0];
      // newConsents[index].expiryDate = expiry.toISOString().split("T")[0];
    } else {
      // newConsents[index].givenDate = "";
      // newConsents[index].expiryDate = "";
    }

    setConsents(newConsents);
  };

  const handleDateChange = (index, field, value) => {
    const newConsents = [...consents];
    newConsents[index][field] = value;
    setConsents(newConsents);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f7fafc",
          margin: "70px auto",
        }}
      >
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
              User Profile
            </Typography>
          </Box>
        </GradientBox>
        <Box>
          <ProfileCard elevation={0}>
            <CardContent sx={{ p: 4 }}>
              {/* Profile Photo Section */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <StyledAvatar src={formData?.photograph} />
                <Typography
                  variant="h5"
                  sx={{ mt: 3, fontWeight: 700, color: "#2d3748" }}
                >
                  {formData?.fullName}
                </Typography>
                <Chip
                  icon={<Verified />}
                  label="Verified User"
                  sx={{
                    mt: 1,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Box>

              {/* Basic Details */}
              <Box sx={{ mb: 4 }}>
                <SectionTitle>
                  <Person /> Basic Details
                </SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Badge sx={{ color: "#667eea" }} />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#718096" }}
                          >
                            Aadhaar ID
                          </Typography>
                        </Box>
                        <StyledTextField>{formData?.aadhaarId}</StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Person sx={{ color: "#667eea" }} />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#718096" }}
                          >
                            Full Name
                          </Typography>
                        </Box>
                        <StyledTextField>{formData?.fullName}</StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Wc sx={{ color: "#667eea" }} />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#718096" }}
                          >
                            Gender
                          </Typography>
                        </Box>
                        <StyledTextField>{formData?.gender}</StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Cake sx={{ color: "#667eea" }} />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#718096" }}
                          >
                            Date of Birth
                          </Typography>
                        </Box>
                        <StyledTextField>{formData?.dob}</StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                </Grid>
              </Box>

              {/* Family Details */}
              <Box sx={{ mb: 4 }}>
                <SectionTitle>
                  <FamilyRestroom /> Family Details
                </SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#718096", mb: 1.5 }}
                        >
                          Father's Name
                        </Typography>
                        <StyledTextField>
                          {formData?.fatherName}
                        </StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#718096", mb: 1.5 }}
                        >
                          Mother's Name
                        </Typography>
                        <StyledTextField>
                          {formData?.motherName}
                        </StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                </Grid>
              </Box>

              {/* Contact Details */}
              <Box sx={{ mb: 4 }}>
                <SectionTitle>Contact Details</SectionTitle>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Phone sx={{ color: "#667eea" }} />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#718096" }}
                          >
                            Mobile
                          </Typography>
                        </Box>
                        <StyledTextField>{formData?.mobile}</StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Email sx={{ color: "#667eea" }} />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#718096" }}
                          >
                            Email
                          </Typography>
                        </Box>
                        <StyledTextField>{formData?.email}</StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                  <Grid item xs={12}>
                    <InfoCard elevation={0}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Home sx={{ color: "#667eea" }} />
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600, color: "#718096" }}
                          >
                            Permanent Address
                          </Typography>
                        </Box>
                        <StyledTextField
                          sx={{
                            minHeight: "80px",
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          {formData?.permanentAddress}
                        </StyledTextField>
                      </CardContent>
                    </InfoCard>
                  </Grid>
                </Grid>
              </Box>

              {/* Consents */}
              {/* Consents */}
              <Box>
                <SectionTitle>
                  <Shield /> Privacy & Consents
                </SectionTitle>

                {/* Helper Text */}
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    backgroundColor: "#eef2ff",
                    borderRadius: "10px",
                    border: "1px solid #c7d2fe",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#4338ca",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    Please provide your consent to share your data by clicking
                    on the toggle buttons below.
                    <Tooltip
                      title="Click the toggle switch to enable consent"
                      arrow
                    >
                      <IconButton size="small" sx={{ p: 0.5 }}>
                        <HelpOutline
                          sx={{ fontSize: "18px", color: "#667eea" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                </Box>

                {/* Consent Toggles */}
                {consents.map((consent, index) => (
                  <ConsentCard key={consent.id} elevation={0}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={consent.enabled}
                          onChange={() => handleConsentToggle(index)}
                          // disabled={!willingToConsent}
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#667eea",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: "#667eea",
                              },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: willingToConsent ? "#4a5568" : "#a0aec0",
                            fontSize: "15px",
                          }}
                        >
                          {consent.name}
                        </Typography>
                      }
                    />

                    {/* Date Fields - Show only when toggle is enabled */}
                    {consent.enabled &&
                      consent.givenDate &&
                      consent.expiryDate && (
                        <div
                          style={{ display: "flex", gap: 10, marginTop: 16 }}
                        >
                          <div>
                            <FieldLabel>Consent Given Date</FieldLabel>
                            <TextField
                              type="date"
                              value={consent.givenDate}
                              onChange={(e) =>
                                handleDateChange(
                                  index,
                                  "givenDate",
                                  e.target.value
                                )
                              }
                              disabled
                              size="small"
                              sx={{
                                width: "250px",
                              }}
                            />
                          </div>
                          <div>
                            <FieldLabel>Expiry Date</FieldLabel>
                            <TextField
                              type="date"
                              value={consent.expiryDate}
                              disabled
                              onChange={(e) =>
                                handleDateChange(
                                  index,
                                  "expiryDate",
                                  e.target.value
                                )
                              }
                              size="small"
                              sx={{
                                width: "250px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                  </ConsentCard>
                ))}

                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    backgroundColor: "#f7fafc",
                    borderRadius: "10px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={willingToConsent}
                        onChange={(e) => setWillingToConsent(e.target.checked)}
                        sx={{
                          color: "#667eea",
                          "&.Mui-checked": {
                            color: "#667eea",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "#2d3748",
                          fontSize: "15px",
                        }}
                      >
                        I am willing to give my consent for data sharing
                        purposes
                      </Typography>
                    }
                  />
                </Box>

                <Button
                  variant="contained"
                  disabled={!willingToConsent}
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
                    "&:disabled": {
                      background: "#e2e8f0",
                      color: "#a0aec0",
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={giveUserConsents}
                >
                  Give Consent
                </Button>
              </Box>
            </CardContent>
          </ProfileCard>
        </Box>
      </Box>
      {loading && <Loader />}
    </>
  );
};

export default UserProfile;
