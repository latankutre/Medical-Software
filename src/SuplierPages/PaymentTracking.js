import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useMediaQuery,
  Divider,
  TextField,
  Grid,
  Tooltip,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import DownloadIcon from '@mui/icons-material/Download';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import HistoryIcon from '@mui/icons-material/History';

// Sample Payment Due Data
const samplePaymentDues = [
  {
    supplierName: 'ABC Suppliers',
    dues: [
      { dueDate: '2025-07-30', amount: 1200, status: 'Pending' },
      { dueDate: '2025-08-05', amount: 500, status: 'Paid' },
    ],
  },
  {
    supplierName: 'HealthMed Inc',
    dues: [
      { dueDate: '2025-07-31', amount: 700, status: 'Pending' },
      { dueDate: '2025-08-03', amount: 1500, status: 'Pending' },
    ],
  },
];

// Helper: Convert hex color string to RGB array for jsPDF
function hexToRgbArray(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

const PaymentDueTracking = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showAll, setShowAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(...hexToRgbArray(theme.palette.primary.main));
    doc.text('Payment Due Report', 14, 22);

    samplePaymentDues.forEach((supplier) => {
      const filteredDues = showAll
        ? supplier.dues
        : supplier.dues.filter(d => d.dueDate === selectedDate);

      if (filteredDues.length === 0) return;

      const y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 32;

      doc.setFontSize(14);
      doc.setTextColor(...hexToRgbArray(theme.palette.secondary.main));
      doc.text(`Supplier: ${supplier.supplierName}`, 14, y);

      const rows = filteredDues.map(d => [
        d.dueDate,
        d.amount,
        d.status,
      ]);

      autoTable(doc, {
        head: [['Due Date','Items', 'Amount (₹)', 'Status']],
        body: rows,
        startY: y + 6,
        styles: { fontSize: 10 },
        headStyles: {
          fillColor: hexToRgbArray(theme.palette.primary.main),
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        alternateRowStyles: {
          fillColor: [240, 248, 255], // very light blue
        },
      });
    });

    doc.save('payment_due_report.pdf');
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 5,
        maxWidth: 1100,
        mx: 'auto',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)}, ${alpha(theme.palette.secondary.light, 0.05)})`,
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: isMobile ? 3 : 5,
          borderRadius: 4,
          boxShadow: `0 12px 32px ${alpha(theme.palette.primary.dark, 0.25)}`,
          backgroundColor: theme.palette.background.paper,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: `0 18px 48px ${alpha(theme.palette.primary.dark, 0.35)}`,
          },
          opacity: 0,
          animation: 'fadeIn 0.8s ease forwards',
          '@keyframes fadeIn': {
            to: { opacity: 1 }
          }
        }}
      >
        {/* Header and controls */}
        <Grid container alignItems="center" justifyContent="space-between" spacing={2} mb={4} direction={isMobile ? 'column' : 'row'}>
          <Grid item xs={12} md="auto">
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              fontWeight={800}
              color="primary"
              sx={{ textShadow: `1px 1px 2px ${alpha(theme.palette.primary.dark, 0.3)}` }}
              align={isMobile ? 'center' : 'left'}
              mb={isMobile ? 2 : 0}
            >
              Payment
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent={isMobile ? 'center' : 'flex-end'}
              direction={isMobile ? 'column' : 'row'}
            >
              <Grid item xs={12} sm={4} md={4} sx={{ width: isMobile ? '100%' : 'auto' }}>
                <TextField
                  fullWidth
                  label="Select Due Date"
                  type="date"
                  size="small"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  disabled={showAll}
                  inputProps={{ max: new Date().toISOString().split('T')[0] }}
                  sx={{
                    '& .MuiInputBase-root': {
                      backgroundColor: alpha(theme.palette.primary.light, 0.15),
                      borderRadius: 1.5,
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.light, 0.25),
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm="auto" md="auto" sx={{ width: isMobile ? '100%' : 'auto' }}>
                <Tooltip title="Download payment due PDF report">
                  <Button
                    fullWidth={isMobile}
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadPDF}
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: `0 4px 15px ${alpha(theme.palette.primary.dark, 0.3)}`,
                      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.dark, 0.5)}`,
                      },
                      textTransform: 'none',
                    }}
                  >
                    Download PDF
                  </Button>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm="auto" md="auto" sx={{ width: isMobile ? '100%' : 'auto' }}>
                <Tooltip title={showAll ? 'Show dues for selected date' : 'Show all payment dues'}>
                  <Button
                    fullWidth={isMobile}
                    variant="contained"
                    color={showAll ? 'secondary' : 'success'}
                    startIcon={showAll ? <HistoryToggleOffIcon /> : <HistoryIcon />}
                    onClick={() => setShowAll(prev => !prev)}
                    sx={{
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: 'none',
                      boxShadow: `0 3px 12px ${alpha(theme.palette.secondary.dark, 0.35)}`,
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 5px 20px ${alpha(theme.palette.secondary.dark, 0.55)}`,
                      },
                    }}
                  >
                    {showAll ? 'Show Selected Date Only' : 'Show All Dues'}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 5 }} />

        {/* Payment Due tables */}
        {samplePaymentDues.map((supplier, index) => {
          const filteredDues = showAll
            ? supplier.dues
            : supplier.dues.filter(d => d.dueDate === selectedDate);

          if (filteredDues.length === 0) return null;

          return (
            <Box
              key={index}
              mb={6}
              sx={{
                opacity: 0,
                animation: 'fadeIn 0.8s ease forwards',
                animationDelay: `${index * 0.15}s`,
                '@keyframes fadeIn': {
                  to: { opacity: 1 }
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  color: theme.palette.secondary.main,
                  borderBottom: `3px solid ${theme.palette.secondary.main}`,
                  paddingBottom: '4px',
                  letterSpacing: 0.8,
                  textTransform: 'uppercase',
                  userSelect: 'none',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                {supplier.supplierName}
              </Typography>
              <TableContainer
                component={Paper}
                elevation={4}
                sx={{
                  borderRadius: 3,
                  boxShadow: `0 6px 24px ${alpha(theme.palette.primary.dark, 0.15)}`,
                  overflowX: 'auto',
                }}
              >
                <Table
                  size={isMobile ? 'small' : 'medium'}
                  aria-label={`Payment due table for ${supplier.supplierName}`}
                  sx={{
                    minWidth: 350,
                    '& thead th': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}cc, ${theme.palette.primary.dark}cc)`,
                      color: theme.palette.common.white,
                      fontWeight: 800,
                      letterSpacing: 1,
                      fontSize: isMobile ? '0.75rem' : '1rem',
                      px: isMobile ? 1 : 2,
                      py: isMobile ? 0.7 : 1.2,
                    },
                    '& tbody tr': {
                      transition: 'transform 0.25s ease, background-color 0.25s ease',
                    },
                    '& tbody tr:hover': {
                      backgroundColor: alpha(theme.palette.primary.light, 0.3),
                      transform: 'scale(1.02)',
                      cursor: 'pointer',
                    },
                    '& tbody tr:nth-of-type(odd)': {
                      backgroundColor: alpha(theme.palette.primary.light, 0.1),
                    },
                    '& tbody tr:nth-of-type(even)': {
                      backgroundColor: alpha(theme.palette.background.default, 0.9),
                    },
                    '& tbody td': {
                      fontSize: isMobile ? '0.8rem' : '0.95rem',
                      px: isMobile ? 1 : 2,
                      py: isMobile ? 0.5 : 1,
                    },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Due Date</TableCell>
                      <TableCell align="right">Amount (₹)</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredDues.map((due, i) => (
                      <TableRow key={i} tabIndex={-1}>
                        <TableCell>{due.dueDate}</TableCell>
                        <TableCell align="right">{due.amount}</TableCell>
                        <TableCell
                          sx={{
                            color: due.status === 'Paid' ? theme.palette.success.main : theme.palette.error.main,
                            fontWeight: 600,
                          }}
                        >
                          {due.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
};

export default PaymentDueTracking;
