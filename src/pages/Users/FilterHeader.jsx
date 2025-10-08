import { Box, Button, alpha } from "@mui/material";
import React from "react";

const FilterHeader = ({ activeFilterCategory, handleFilterCategoryClick }) => {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        borderBottom: `1px solid ${alpha("#667eea", 0.1)}`,
      }}
    >
      <Button
        variant={activeFilterCategory === "basic" ? "contained" : "outlined"}
        onClick={() => handleFilterCategoryClick("basic")}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          ...(activeFilterCategory === "basic"
            ? {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }
            : {
                borderColor: "#667eea",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }),
        }}
      >
        Basic Filters
      </Button>
      <Button
        variant={
          activeFilterCategory === "demography" ? "contained" : "outlined"
        }
        onClick={() => handleFilterCategoryClick("demography")}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          ...(activeFilterCategory === "demography"
            ? {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }
            : {
                borderColor: "#667eea",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }),
        }}
      >
        Demography Filters
      </Button>
      <Button
        variant={
          activeFilterCategory === "education" ? "contained" : "outlined"
        }
        onClick={() => handleFilterCategoryClick("education")}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          ...(activeFilterCategory === "education"
            ? {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }
            : {
                borderColor: "#667eea",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }),
        }}
      >
        Education Filter
      </Button>
      <Button
        variant={
          activeFilterCategory === "employment" ? "contained" : "outlined"
        }
        onClick={() => handleFilterCategoryClick("employment")}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          ...(activeFilterCategory === "employment"
            ? {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }
            : {
                borderColor: "#667eea",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }),
        }}
      >
        Employment Filter
      </Button>

      <Button
        variant={activeFilterCategory === "employer" ? "contained" : "outlined"}
        onClick={() => handleFilterCategoryClick("employer")}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          ...(activeFilterCategory === "employer"
            ? {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }
            : {
                borderColor: "#667eea",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }),
        }}
      >
        Employer Filter
      </Button>

      <Button
        variant={activeFilterCategory === "health" ? "contained" : "outlined"}
        onClick={() => handleFilterCategoryClick("health")}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          ...(activeFilterCategory === "health"
            ? {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }
            : {
                borderColor: "#667eea",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }),
        }}
      >
        Health Filter
      </Button>

      <Button
        variant={activeFilterCategory === "property" ? "contained" : "outlined"}
        onClick={() => handleFilterCategoryClick("property")}
        sx={{
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          px: 3,
          ...(activeFilterCategory === "property"
            ? {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                },
              }
            : {
                borderColor: "#667eea",
                color: "#667eea",
                "&:hover": {
                  borderColor: "#5568d3",
                  bgcolor: alpha("#667eea", 0.05),
                },
              }),
        }}
      >
        Property Filter
      </Button>
    </Box>
  );
};

export default FilterHeader;
