import { Grid, Box, Typography, Button, Container } from "@mui/material";
import React from "react";
import HeroImage from "../../Assets/hero.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container alignItems="center" sx={{ height: { xs: "auto" } }}>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Box sx={{ width: "80%", pl: 5 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 2 }}>
              <Box
                component="span"
                sx={{ color: "#9F2B68", fontWeight: "bold" }}
              >
                DISCOVER
              </Box>{" "}
              YOUR NEXT{" "}
              <Box
                component="span"
                sx={{ color: "#9F2B68", fontWeight: "bold" }}
              >
                FAVORITE
              </Box>{" "}
              BOOK
            </Typography>
            <Typography variant="h6" paragraph>
              Explore reviews, recommendations, and more to find your next great
              read. Our platform offers insightful critiques and reviews to help
              you make informed choices.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    bgcolor: "#9F2B68",
                    mt: 2,
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#6d1f77",
                    },
                  }}
                  onClick={handleRegisterClick}
                >
                  Sign Up Now
                </Button>
              </Box>
              <Box sx={{ mx: 5, display: { xs: "none", sm: "block" } }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    bgcolor: "#9F2B68",
                    mt: 2,
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#6d1f77",
                    },
                  }}
                  onClick={handleLoginClick}
                >
                  Sign in Now
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ position: "relative" }}>
          <img
            src={HeroImage}
            alt="Book Reading"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hero;
