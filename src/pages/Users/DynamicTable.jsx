import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Avatar,
  styled,
  alpha,
} from "@mui/material";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "& th": {
    color: "white",
    fontWeight: 700,
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha("#667eea", 0.04),
    transition: "all 0.3s ease",
  },
  "&:nth-of-type(even)": {
    backgroundColor: alpha("#667eea", 0.02),
  },
}));

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : "-"), obj);
};

const DynamicTable = ({ filteredUsers, page = 0, rowsPerPage = 10 }) => {
  if (!filteredUsers || filteredUsers.length === 0) return null;

  // Extract headers dynamically from first user
  const firstUser = filteredUsers[0];
  const headers = [];

  const extractHeaders = (obj, parentKey = "") => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        extractHeaders(value, newKey);
      } else {
        headers.push(newKey);
      }
    });
  };

  extractHeaders(firstUser);

  return (
    <TableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>
                {header.replace(/\./g, " ").replace(/([A-Z])/g, " $1").trim()}
              </TableCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {filteredUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <StyledTableRow key={user.citizenId || user.id}>
                {headers.map((header) => {
                  const value = getNestedValue(user, header);
                  return (
                    <TableCell key={header}>
                      {typeof value === "string" || typeof value === "number"
                        ? value
                        : JSON.stringify(value)}
                    </TableCell>
                  );
                })}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
