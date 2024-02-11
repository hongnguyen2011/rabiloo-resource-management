import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const AppNotFound = () => (
  <Box
    sx={{
      mx: 10,
      display: "flex",
      flexDirection: "column",
      height: 400,
      alignItems: "center",
    }}>
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
    />
    <Link to="/" className="link-home">
      Go Home
    </Link>
  </Box>
);

export { AppNotFound };
