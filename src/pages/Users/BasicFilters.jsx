import React from "react";
import { FilterSection, SectionTitle } from "./utils";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const BasicFilters = ({filters,handleFilterChange}) => {
  return (
    <>
      <FilterSection>
        <SectionTitle>Qualification</SectionTitle>
        <FormGroup>
          {[
            "B.Tech",
            "MBA",
            "12th",
            "M.Tech",
            "B.Sc",
            "B.A",
            "MCA",
            "10th",
            "LLB",
            "B.Com",
            "BBA",
            "PhD",
            "M.Sc",
            "CA",
            "B.Ed",
            "Diploma",
            "BCA",
          ].map((qual) => (
            <FormControlLabel
              key={qual}
              control={
                <Checkbox
                  checked={filters.qualification === qual}
                  onChange={() => handleFilterChange("qualification", qual)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={qual}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Employment Status</SectionTitle>
        <FormGroup>
          {["Employed", "Unemployed", "Self-Employed", "Business"].map(
            (status) => (
              <FormControlLabel
                key={status}
                control={
                  <Checkbox
                    checked={filters.employmentStatus===status}
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
        <SectionTitle>District</SectionTitle>
        <FormGroup>
          {[
            "Jaipur",
            "Kota",
            "Ajmer",
            "Udaipur",
            "Alwar",
            "Bikaner",
            "Jodhpur",
            "Bharatpur",
            "Sikar",
            "Nagaur",
            "Sri Ganganagar",
            "Chittorgarh",
            "Jhunjhunu",
            "Tonk",
            "Dholpur",
            "Baran",
            "Sawai Madhopur",
            "Pali",
            "Churu",
          ].map((dist) => (
            <FormControlLabel
              key={dist}
              control={
                <Checkbox
                  checked={filters.district===dist}
                  onChange={() => handleFilterChange("district", dist)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={dist}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Block</SectionTitle>
        <FormGroup>
          {[
            "Block A",
            "Block B",
            "Block C",
            "Block D",
            "Block E",
            "Block F",
            "Block G",
            "Block H",
            "Block I",
            "Block J",
            "Block K",
            "Block L",
            "Block M",
            "Block N",
            "Block O",
            "Block P",
            "Block Q",
            "Block R",
            "Block S",
          ].map((block) => (
            <FormControlLabel
              key={block}
              control={
                <Checkbox
                  checked={filters.block===block}
                  onChange={() => handleFilterChange("block", block)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={block}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Village/Ward</SectionTitle>
        <FormGroup>
          {[
            "Village 1",
            "Village 2",
            "Village 3",
            "Village 4",
            "Village 5",
            "Village 6",
            "Village 7",
            "Village 8",
            "Village 9",
            "Village 10",
            "Village 11",
            "Village 12",
            "Village 13",
            "Village 14",
            "Village 15",
            "Village 16",
            "Village 17",
            "Village 18",
            "Village 19",
            "Village 20",
          ].map((village) => (
            <FormControlLabel
              key={village}
              control={
                <Checkbox
                  checked={filters.village===village}
                  onChange={() => handleFilterChange("village", village)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={village}
            />
          ))}
        </FormGroup>
      </FilterSection>

      {/* <FilterSection>
      <SectionTitle>Property Ownership</SectionTitle>
      <FormGroup row>
        {["Has Property", "No Property"].map((property) => (
          <FormControlLabel
            key={property}
            control={
              <Checkbox
                checked={filters.hasProperty.includes(property)}
                onChange={() =>
                  handleFilterChange("hasProperty", property)
                }
                sx={{
                  color: "#667eea",
                  "&.Mui-checked": { color: "#667eea" },
                }}
              />
            }
            label={property}
          />
        ))}
      </FormGroup>
    </FilterSection> */}

      <FilterSection>
        <SectionTitle>Property Type</SectionTitle>
        <FormGroup>
          {["Residential", "Commercial", "Agricultural", "Industrial"].map(
            (type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={filters.propertyType===type}
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

      <FilterSection>
        <SectionTitle>Chronic Disease</SectionTitle>
        <FormGroup>
          {[
            "None",
            "Diabetes",
            "Hypertension",
            "Heart Disease",
            "Asthma",
            "Kidney Disease",
            "Thyroid",
            "Cancer",
            "Arthritis",
            "Other",
          ].map((disease) => (
            <FormControlLabel
              key={disease}
              control={
                <Checkbox
                  checked={filters.chronicDisease===disease}
                  onChange={() => handleFilterChange("chronicDisease", disease)}
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
    </>
  );
};

export default BasicFilters;
