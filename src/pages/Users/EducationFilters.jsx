import React from "react";
import { FilterSection, SectionTitle } from "./utils";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
const EducationFilters = ({ filters, handleFilterChange }) => {
  return (
    <>
      <FilterSection>
        <SectionTitle>Highest Qualification</SectionTitle>
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
          ].map((qualification) => (
            <FormControlLabel
              key={qualification}
              control={
                <Checkbox
                  checked={filters.highestQualification === qualification}
                  onChange={() =>
                    handleFilterChange("highestQualification", qualification)
                  }
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={qualification}
            />
          ))}
        </FormGroup>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Year of Passing</SectionTitle>
        <FormControl fullWidth>
          <InputLabel>Select Year</InputLabel>
          <Select
            value={filters.yearOfPassing}
            label="Select Year"
            onChange={(e) =>
              handleFilterChange("yearOfPassing", e.target.value)
            }
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha("#667eea", 0.2),
              },
            }}
          >
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2020">2020</MenuItem>
          </Select>
        </FormControl>
      </FilterSection>

      <FilterSection>
        <SectionTitle>Board/University</SectionTitle>
        <FormGroup>
          {[
            "AKTU",
            "IIM",
            "RBSE",
            "IIT",
            "RU",
            "Delhi University",
            "BITS",
            "Law College",
            "Commerce College",
            "PU",
            "ICAI",
            "Polytechnic",
          ].map((board) => (
            <FormControlLabel
              key={board}
              control={
                <Checkbox
                  checked={filters.boardUniversity === board}
                  onChange={() => handleFilterChange("boardUniversity", board)}
                  sx={{
                    color: "#667eea",
                    "&.Mui-checked": { color: "#667eea" },
                  }}
                />
              }
              label={board}
            />
          ))}
        </FormGroup>
      </FilterSection>
    </>
  );
};

export default EducationFilters;
