// src/SuplierPages/SupplierManagement.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import { motion } from 'framer-motion';

// Reusable motion button
const MotionButton = motion.button;

const SupplierManagement = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    width: '100%',
    padding: '18px 20px',
    borderRadius: '20px',
    fontSize: '1.1rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease-in-out',
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 3 }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
            sx={{
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              fontFamily: 'Segoe UI, sans-serif',
              letterSpacing: 1,
            }}
          >
            Supplier Management Dashboard
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 3 }}>
          {/* Add New Supplier */}
          <Grid item xs={12} sm={6} md={4}>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...buttonStyle,
                backgroundColor: '#f5faff',
                border: '2px solid #1976d2',
                color: '#1976d2',
              }}
              onClick={() => navigate('/supplier-master')}
            >
              <AddBusinessIcon />
              Add New Supplier
            </MotionButton>
          </Grid>

          {/* Purchase History */}
          <Grid item xs={12} sm={6} md={4}>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...buttonStyle,
                backgroundColor: '#f4fff7',
                border: '2px solid #388e3c',
                color: '#388e3c',
              }}
              onClick={() => navigate('/purchase-history')}
            >
              <HistoryIcon />
              Purchase History
            </MotionButton>
          </Grid>

          {/* Payment Tracking */}
          <Grid item xs={12} sm={6} md={4}>
            <MotionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...buttonStyle,
                backgroundColor: '#fff8f1',
                border: '2px solid #f57c00',
                color: '#f57c00',
              }}
              onClick={() => navigate('/payment-tracking')}
            >
              <PaymentsIcon />
              Payment Tracking
            </MotionButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SupplierManagement;
