import React from "react";
import { FilterSection, SectionTitle } from "./utils";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
const EmploymentFilters = ({ filters, handleFilterChange }) => {
  return (
    <>
      <FilterSection>
        <SectionTitle>Employment Status</SectionTitle>
        <FormGroup>
          {["Employed", "Unemployed", "Self-Employed", "Business"].map(
            (status) => (
              <FormControlLabel
                key={status}
                control={
                  <Checkbox
                    checked={filters.employmentStatus === status}
                    onChange={() =>
                      handleFilterChange("employmentStatus", status)
                    }
                    sx={{
                      color: "#667eea",
                      "&.Mui-checked": { color: "#667eea" },
                    }}
                  />
                }
                label={status}
              />
            )
          )}
        </FormGroup>
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
                  checked={filters.jobType === jobType}
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
        <SectionTitle>Vocational Training Status</SectionTitle>
        <FormGroup>
          {["Completed", "Ongoing"].map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={filters.vocationTrainingStatus === status}
                  onChange={() =>
                    handleFilterChange("vocationTrainingStatus", status)
                  }
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={status}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Skill Certifications</SectionTitle>
        <FormGroup>
          {[
            "Java",
            "MuleSoft",
            "Digital Marketing",
            "Electrician",
            "Data Science",
            "Nursing",
            "Accounting",
            "Cloud",
            "AWS",
            "Tailoring",
            "Legal Drafting",
            "Banking",
            "Sales",
            "Research",
            "Teacher Training",
            "Chartered Accountancy",
            "Mechanic",
            "Programming",
            "Civil Engg",
            "Education",
            "Welding",
            "Software Testing",
          ].map((skill) => (
            <FormControlLabel
              key={skill}
              control={
                <Checkbox
                  checked={filters.skillCertifications === skill}
                  onChange={() =>
                    handleFilterChange("skillCertifications", skill)
                  }
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={skill}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Sector</SectionTitle>
        <FormGroup>
          {["Government", "Private", "Business"].map((sector) => (
            <FormControlLabel
              key={sector}
              control={
                <Checkbox
                  checked={filters.sector === sector}
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
    </>
  );
};

export default EmploymentFilters;
