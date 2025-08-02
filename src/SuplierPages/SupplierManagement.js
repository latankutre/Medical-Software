// src/SuplierPages/SupplierManagement.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HistoryIcon from '@mui/icons-material/History';
import PaymentsIcon from '@mui/icons-material/Payments';
import { motion } from 'framer-motion';


// ✅ IMPORT THE CORRECT PAGE
import SupplierMaster from './SupplierMaster'; // ✅ Make sure the path is correct
import PurchaseHistory from './PurchaseHistory';
import PaymentTracking from './PaymentTracking';

const MotionButton = motion.button;

const SupplierManagement = () => {
  const [activeSection, setActiveSection] = useState(null);

  const buttonStyle = {
    width: '100%',
    padding: '18px 20px',
    borderRadius: '20px',
    fontSize: '1.0rem',
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
          >
            Supplier Management Dashboard
          </Typography>
        </motion.div>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 3 }}>
          {/* ✅ Add Supplier Button */}
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
              onClick={() => setActiveSection('add')}
            >
              <AddBusinessIcon />
              Add New Supplier
            </MotionButton>
          </Grid>

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
              onClick={() => setActiveSection('history')}
            >
              <HistoryIcon />
              Purchase History
            </MotionButton>
          </Grid>

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
              onClick={() => setActiveSection('payment')}
            >
              <PaymentsIcon />
              Payment Tracking
            </MotionButton>
          </Grid>
        </Grid>

        {/* ✅ Render correct section */}
        <Box sx={{ mt: 3 }}>
          {activeSection === 'add' && <SupplierMaster />}         {/* ✅ Correct form */}
          {activeSection === 'history' && <PurchaseHistory />}
          {activeSection === 'payment' && <PaymentTracking />}
        </Box>
      </Box>
    </Container>
  );
};

export default SupplierManagement;
