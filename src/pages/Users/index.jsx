import React, { useState } from "react";
import {
  Box,
  TablePagination,
  IconButton,
  Typography,
  Button,
  alpha,
} from "@mui/material";
import { FilterList, Close, Person, Refresh } from "@mui/icons-material";
import Header from "../../components/Header";
import { apiGet, apiPost } from "../../services/api";
import { apiEndpoints } from "../../config/config";
import UserTable from "./UserTable";
import BasicFilters from "./BasicFilters";
import PropertyFilters from "./PropertyFilters";
import HealthFilters from "./HealthFilters";
import EmployerFilters from "./EmployerFilters";
import EducationFilters from "./EducationFilters";
import DemographyFilters from "./DemographyFilters";
import FilterHeader from "./FilterHeader";
import { ContentCard, FilterDrawer, GradientBox } from "./utils";
import DynamicTable from "./DynamicTable";
import EmploymentFilters from "./EmploymentFilters";
import { toast } from "react-toastify";

// Dummy Data
const generateDummyUsers = () => {
  const data = [
    {
      citizenId: 1,
      district: "Jaipur",
      block: "Block A",
      village: "Village 1",
      pincode: "302001",
      latitude: 26.9124,
      longitude: 75.7873,
      ruralUrban: "Urban",
      income: 50000,
      gender: "Male",
      age: 34,
    },
  ];
  return data;
};

export default function UserTablePage() {
  const [filteredUsers, setFilteredUsers] = useState(generateDummyUsers());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState("basic");
  const [customApiCalled, setCustomApiCalled] = useState(false);
  const [filters, setFilters] = useState({
    // Basic filters
    qualification: [],
    dropoutClass: [],
    hasProperty: [],
    chronicDisease: [],
    schemeEligibility: [],

    // Demography filters
    district: [],
    block: [],
    village: [],
    pincode: "",
    ruralUrban: [],
    gender: [],
    incomeRange: "",
    ageRange: "",

    // Education filters
    highestQualification: [],
    yearOfPassing: "",
    boardUniversity: [],

    // Employment filters
    employmentStatus: [],
    jobType: [],
    vocationTrainingStatus: [],
    skillCertifications: [],

    // Employer filters
    sector: [],
    employerName: "",
    employerIncome: "",

    // Health filters
    chronicDiseases: [],
    disabilityStatus: [],
    bloodGroup: "",
    vaccinationStatus: [],
    insuranceStatus: [],

    // Property filters
    propertyOwnershipStatus: [],
    propertyType: [],
  });

  const handleFilterCategoryClick = (category) => {
    setActiveFilterCategory(category);
    setDrawerOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const basicApiSearch = async () => {
    setCustomApiCalled(false);
    const payload = {
      district: filters.district,
      block: filters.block,
      village: filters.village,
      qualification: filters.qualification,
      employmentStatus: filters.employmentStatus,
      propertyType: filters.propertyType,
      chronicDisease: filters.chronicDisease,
    };

    try {
      const response = await apiPost(apiEndpoints.basicDetails, payload);
      if (response?.data?.status === 200) {
        setFilteredUsers(response?.data?.data || []);
        toast.success(response?.data?.message || "Users fetched successfully!");
      } else {
        setFilteredUsers([]);
        toast.error(response?.data?.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const formatBloodGroup = (bloodGroup) => {
    if (!bloodGroup) return "";
    return (
      bloodGroup &&
      bloodGroup?.replace("+", " Positive").replace("-", " Negative")
    );
  };

  const commonApiSearch = async () => {
    setCustomApiCalled(true);
    const apiEndpoint =
      activeFilterCategory === "demography"
        ? `${apiEndpoints.demographyWiseDetails}/?district=${filters.district}&block=${filters.block}&village=${filters.village}&pincode=${filters.pincode}&rural_urban=${filters.ruralUrban}&income=${filters.employerIncome}&age=${filters.ageRange}&gender=${filters.gender}`
        : activeFilterCategory === "education"
        ? `${apiEndpoints.educationWeiseDetails}?highest_qualification=${filters.highestQualification}&year_of_passing=${filters.yearOfPassing}&board_university=${filters.boardUniversity}`
        : activeFilterCategory === "employment"
        ? `${apiEndpoints.employmentWiseDetails}?skills_certifications=${filters.skillCertifications}&job_type=${filters.jobType}&employment_status=${filters.employmentStatus}&vocational_training_status=${filters.vocationTrainingStatus}`
        : activeFilterCategory === "employer"
        ? `${apiEndpoints.employerWiseDetails}?sector=${filters.sector}&employer_name=${filters.employerName}&income=${filters.employerIncome}&job_type=${filters.jobType}`
        : activeFilterCategory === "health"
        ? `${apiEndpoints.healthWiseDetails}?chronic_diseases=${
            filters.chronicDiseases
          }&disability_status=${
            filters.disabilityStatus === "None"
              ? "No"
              : filters.disabilityStatus === "Disability"
              ? "Yes"
              : ""
          }&blood_group=${
            filters.bloodGroup ? formatBloodGroup(filters.bloodGroup) : ""
          }&vaccination_status=${filters.vaccinationStatus}&insurance_status=${
            filters.insuranceStatus === "Insured"
              ? "Yes"
              : filters.insuranceStatus === "Not Insured"
              ? "No"
              : ""
          }`
        : activeFilterCategory === "property"
        ? `${apiEndpoints.propertyWiseDetails}?property_ownership_status=${
            filters.propertyOwnershipStatus === "Own"
          }&property_type=${filters.propertyType}`
        : null;

    try {
      const response = await apiGet(apiEndpoint);
      if (response?.data?.status === 200) {
        setFilteredUsers(response?.data?.data || []);
        toast.success(response?.data?.message || "Users fetched successfully!");
      } else {
        setFilteredUsers([]);
        toast.error(response?.data?.message || "Failed to fetch users.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  const applyFilters = () => {
    if (activeFilterCategory === "basic") {
      basicApiSearch();
    } else {
      commonApiSearch();
    }
  };

  const resetFilters = () => {
    setFilters({
      qualification: [],
      employmentStatus: [],
      district: [],
      hasProperty: [],
      chronicDisease: [],
      block: [],
      village: [],
      ruralUrban: [],
      gender: [],
      incomeRange: "",
      ageRange: "",
      highestQualification: [],
      yearOfPassing: "",
      boardUniversity: [],
      jobType: [],
      vocationTrainingStatus: [],
      skillCertifications: [],
      chronicDiseases: [],
      disabilityStatus: [],
      bloodGroup: "",
      vaccinationStatus: [],
      insuranceStatus: [],
      propertyOwnershipStatus: [],
      propertyType: [],
      sector: [],
      employerName: "",
      employerIncome: "",
    });

    setPage(0);
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f7fafc",
          marginTop: "70px",
        }}
      >
        <GradientBox>
          <Box
            sx={{
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
              padding: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Person sx={{ fontSize: 40 }} />
                  User Management
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<FilterList />}
                onClick={() => setDrawerOpen(true)}
                sx={{
                  bgcolor: "white",
                  color: "#667eea",
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  "&:hover": {
                    bgcolor: "#f8f9fa",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Filters
              </Button>
            </Box>
          </Box>
        </GradientBox>

        {/* Main Content */}
        <Box sx={{ margin: "0" }}>
          <ContentCard elevation={0}>
            {/* Filter Category Buttons */}
            <FilterHeader
              activeFilterCategory={activeFilterCategory}
              handleFilterCategoryClick={handleFilterCategoryClick}
            />

            {/* Table */}
            {activeFilterCategory === "basic" && !customApiCalled ? (
              <UserTable
                filteredUsers={filteredUsers}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            ) : (
              <DynamicTable
                filteredUsers={filteredUsers}
                page={page}
                rowsPerPage={rowsPerPage}
                category={activeFilterCategory} // optional if you want category-specific formatting
              />
            )}

            {/* Pagination */}
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: `1px solid ${alpha("#667eea", 0.1)}`,
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  { fontWeight: 600, color: "#475569" },
              }}
            />
          </ContentCard>
        </Box>

        {/* Filter Drawer */}
        <FilterDrawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#2d3748" }}>
              {activeFilterCategory === "basic" && "Basic Filters"}
              {activeFilterCategory === "demography" && "Demography Filters"}
              {activeFilterCategory === "education" && "Education Filters"}
              {activeFilterCategory === "employment" && "Employment Filters"}
              {activeFilterCategory === "employer" && "Employer Filters"}
              {activeFilterCategory === "health" && "Health Filters"}
              {activeFilterCategory === "property" && "Property Filters"}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          {/* Basic/Demography Filters */}
          {activeFilterCategory === "demography" && (
            <DemographyFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}

          {activeFilterCategory === "education" && (
            <EducationFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {/* Employment Filters */}
          {activeFilterCategory === "employment" && (
            <EmploymentFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {activeFilterCategory === "employer" && (
            <EmployerFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {/* Add new Health & Property category button */}
          {activeFilterCategory === "health" && (
            <HealthFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {activeFilterCategory === "property" && (
            <PropertyFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {/* Basic Filters */}
          {activeFilterCategory === "basic" && (
            <BasicFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Refresh />}
              onClick={resetFilters}
              sx={{
                borderColor: "#667eea",
                color: "#667eea",
                fontWeight: 600,
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }}
            >
              Reset
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                applyFilters();
                setDrawerOpen(false);
              }}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontWeight: 600,
                borderRadius: "10px",
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                "&:hover": { boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)" },
              }}
            >
              Apply
            </Button>
          </Box>
        </FilterDrawer>
      </Box>
    </div>
  );
}
