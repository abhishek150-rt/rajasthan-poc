import React from "react";
import { FilterSection, SectionTitle } from "./utils";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
const HealthFilters = ({ filters, handleFilterChange }) => {
  return (
    <>
      <FilterSection>
        <SectionTitle>Chronic Diseases</SectionTitle>
        <FormGroup>
          {[
            "Diabetes",
            "Asthma",
            "Hypertension",
            "Heart Disease",
            "Cancer",
            "TB",
            "None",
          ].map((disease) => (
            <FormControlLabel
              key={disease}
              control={
                <Checkbox
                  checked={filters.chronicDiseases === disease}
                  onChange={() =>
                    handleFilterChange("chronicDiseases", disease)
                  }
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={disease}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Disability Status</SectionTitle>
        <FormGroup>
          {["None", "Disability"].map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={filters.disabilityStatus === status}
                  onChange={() =>
                    handleFilterChange("disabilityStatus", status)
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
        <SectionTitle>Blood Group</SectionTitle>
        <FormGroup>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((blood) => (
            <FormControlLabel
              key={blood}
              control={
                <Checkbox
                  checked={filters.bloodGroup === blood}
                  onChange={() => handleFilterChange("bloodGroup", blood)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={blood}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Vaccination Status</SectionTitle>
        <FormGroup>
          {["Complete", "Incomplete"].map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={filters.vaccinationStatus === status}
                  onChange={() =>
                    handleFilterChange("vaccinationStatus", status)
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
        <SectionTitle>Insurance Status</SectionTitle>
        <FormGroup>
          {["Insured", "Not Insured"].map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={filters.insuranceStatus === status}
                  onChange={() => handleFilterChange("insuranceStatus", status)}
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
    </>
  );
};

export default HealthFilters;
