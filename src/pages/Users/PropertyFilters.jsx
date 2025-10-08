import React from "react";
import { FilterSection, SectionTitle } from "./utils";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
const PropertyFilters = ({ filters, handleFilterChange }) => {
  return (
    <>
      <FilterSection>
        <SectionTitle>Property Ownership</SectionTitle>
        <FormGroup>
          {["Owned", "Rented"].map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={filters.propertyOwnershipStatus === status}
                  onChange={() =>
                    handleFilterChange("propertyOwnershipStatus", status)
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
        <SectionTitle>Property Type</SectionTitle>
        <FormGroup>
          {["Residential", "Commercial", "Agricultural", "Industrial"].map(
            (type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={filters.propertyType === type}
                    onChange={() => handleFilterChange("propertyType", type)}
                    sx={{
                      color: "#667eea",
                      "&.Mui-checked": { color: "#667eea" },
                    }}
                  />
                }
                label={type}
              />
            )
          )}
        </FormGroup>
      </FilterSection>
    </>
  );
};

export default PropertyFilters;
