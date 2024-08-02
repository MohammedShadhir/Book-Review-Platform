import React from "react";
import Hero from "../Components/Hero/Hero";
import BookReviewsList from "../Components/Book/BookReviewsList";
import { Box, Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Hero />
      </Grid>
      <Grid item xs={12}>
        <Box mt={8} p={2}>
          <BookReviewsList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
