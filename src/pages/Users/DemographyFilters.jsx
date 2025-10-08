import React from "react";
import { FilterSection, SectionTitle } from "./utils";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  alpha,
  TextField,
  Typography,
} from "@mui/material";
const DemographyFilters = ({ filters, handleFilterChange }) => {
  return (
    <>
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
          ].map((district) => (
            <FormControlLabel
              key={district}
              control={
                <Checkbox
                  checked={filters.district === district}
                  onChange={() => handleFilterChange("district", district)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={district}
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
                  checked={filters.block === block}
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
                  checked={filters.village === village}
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

      <FilterSection>
        <SectionTitle>Pincode </SectionTitle>
        <TextField
          fullWidth
          placeholder="Enter pincode"
          value={filters.pincode || ""}
          onChange={(e) => handleFilterChange("pincode", e.target.value)}
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
          Enter pincode
        </Typography>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Area Type</SectionTitle>
        <FormGroup row>
          {["Rural", "Urban"].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={filters.ruralUrban === type}
                  onChange={() => handleFilterChange("ruralUrban", type)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Gender</SectionTitle>
        <FormGroup row>
          {["Male", "Female", "Other"].map((gender) => (
            <FormControlLabel
              key={gender}
              control={
                <Checkbox
                  checked={filters.gender === gender}
                  onChange={() => handleFilterChange("gender", gender)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={gender}
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

      <FilterSection>
        <SectionTitle>Age </SectionTitle>
        <TextField
          fullWidth
          placeholder="Enter age"
          value={filters.ageRange || ""}
          onChange={(e) => handleFilterChange("ageRange", e.target.value)}
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
          Enter age
        </Typography>
      </FilterSection>
    </>
  );
};

export default DemographyFilters;
