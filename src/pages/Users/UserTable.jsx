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

const UserTable = ({ filteredUsers, page, rowsPerPage }) => {
  return (
    <TableContainer>
      <Table>
        <StyledTableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Aadhaar ID</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>City</TableCell>
            <TableCell>District</TableCell>
            <TableCell>Block</TableCell>
            <TableCell>Village</TableCell>
            <TableCell>Highest Qualification</TableCell>
            <TableCell>Year of Passing</TableCell>
            <TableCell>Board / University</TableCell>

            <TableCell>Registered</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {filteredUsers &&
            filteredUsers.length > 0 &&
            filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <StyledTableRow key={user?.citizenId}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: "#667eea",
                            width: 40,
                            height: 40,
                            fontWeight: 600,
                          }}
                        >
                          {user?.fullName?.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{ fontWeight: 600, fontSize: "14px" }}
                          >
                            {user?.fullName}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "#64748b" }}
                          >
                            ID: {user?.citizenId}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.basicIdentity?.aadhaarId}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "13px" }}>
                        {user?.basicIdentity?.email}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#64748b" }}>
                        {user?.basicIdentity?.mobile}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={user?.basicIdentity?.gender}
                        size="small"
                        sx={{
                          bgcolor:
                            user?.basicIdentity?.gender === "Male"
                              ? alpha("#3b82f6", 0.1)
                              : alpha("#ec4899", 0.1),
                          color:
                            user?.basicIdentity?.gender === "Male"
                              ? "#1e40af"
                              : "#be185d",
                          fontWeight: 600,
                          fontSize: "12px",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.basicIdentity?.permanentAddress.split(",")[0]}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.demography?.district}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.demography?.block}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.demography?.village}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.education?.highestQualification}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.education?.yearOfPassing}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                        {user?.education?.boardUniversity}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ fontSize: "13px", color: "#64748b" }}>
                        {user?.registeredDate || "-"}
                      </Typography>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
