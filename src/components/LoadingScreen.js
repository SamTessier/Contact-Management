import React, { useContext } from "react";
import { Box, CircularProgress } from '@mui/material';
import { LoadingContext } from '../LoadingContext';

const LoadingScreen = () => {
  const { loading } = useContext(LoadingContext);
  return (
    loading && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        position="fixed"
        left={0}
        top={0}
        width="100vw"
        height="100vh"
        bgcolor="rgba(255, 255, 255, 0.7)"
        zIndex="modal"
      >
        <CircularProgress />
      </Box>
    )
  );
};

export default LoadingScreen;
