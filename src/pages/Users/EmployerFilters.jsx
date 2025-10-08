import React from "react";
import { FilterSection, SectionTitle } from "./utils";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
const EmployerFilters = ({ filters, handleFilterChange }) => (
  <>
    <FilterSection>
      <SectionTitle>Sector</SectionTitle>
      <FormGroup>
        {["Government", "Private", "Business"].map((sector) => (
          <FormControlLabel
            key={sector}
            control={
              <Checkbox
                checked={filters.sector===sector}
                onChange={() => handleFilterChange("sector", sector)}
                sx={{
                  color: "#667eea",
                  "&.Mui-checked": { color: "#667eea" },
                }}
              />
            }
            label={sector}
          />
        ))}
      </FormGroup>
    </FilterSection>

    <FilterSection>
      <SectionTitle>Employer Name</SectionTitle>
      <TextField
        fullWidth
        placeholder="Search employer name..."
        value={filters.employerName || ""}
        onChange={(e) => handleFilterChange("employerName", e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": {
              borderColor: alpha("#667eea", 0.2),
            },
            "&:hover fieldset": {
              borderColor: alpha("#667eea", 0.3),
            },
            "&.Mui-focused fieldset": {
              borderColor: "#667eea",
            },
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{ mt: 1, display: "block", color: "#64748b" }}
      >
        Filter by specific employer/company name
      </Typography>
    </FilterSection>

    <FilterSection>
      <SectionTitle>Job Type</SectionTitle>
      <FormGroup>
        {[
          "Developer",
          "Technician",
          "Analyst",
          "Accountant",
          "Engineer",
          "Designer",
          "Lawyer",
          "Officer",
          "Scientist",
          "Teacher",
          "Consultant",
          "Mechanic",
          "Tester",
        ].map((jobType) => (
          <FormControlLabel
            key={jobType}
            control={
              <Checkbox
                checked={filters.jobType===jobType}
                onChange={() => handleFilterChange("jobType", jobType)}
                sx={{
                  color: "#667eea",
                  "&.Mui-checked": { color: "#667eea" },
                }}
              />
            }
            label={jobType}
          />
        ))}
      </FormGroup>
    </FilterSection>

    <FilterSection>
      <SectionTitle>Employer Income </SectionTitle>
      <TextField
        fullWidth
        placeholder="Enter income "
        value={filters.employerIncome || ""}
        onChange={(e) => handleFilterChange("employerIncome", e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& fieldset": {
              borderColor: alpha("#667eea", 0.2),
            },
            "&:hover fieldset": {
              borderColor: alpha("#667eea", 0.3),
            },
            "&.Mui-focused fieldset": {
              borderColor: "#667eea",
            },
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{ mt: 1, display: "block", color: "#64748b" }}
      >
        Enter monthly income from employer
      </Typography>
    </FilterSection>
  </>
);

export default EmployerFilters;
