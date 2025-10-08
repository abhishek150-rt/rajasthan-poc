import { Box, CircularProgress } from "@mui/material";

const Loader = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.4)", // Reduced opacity
      backdropFilter: "blur(2px)", // Reduced blur
      zIndex: 9999,
    }}
  >
    <CircularProgress size={60} thickness={4} sx={{ color: "#667eea" }} />
  </Box>
);
export default Loader;
