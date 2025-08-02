import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const SupplierFullScreenForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gst: '',
    contact: '',
    address: '',
    email: '',
  });

  const [submittedSuppliers, setSubmittedSuppliers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionWithDate = {
      ...formData,
      submittedAt: new Date().toLocaleString(),
    };

    if (editIndex !== null) {
      const updated = [...submittedSuppliers];
      updated[editIndex] = submissionWithDate;
      setSubmittedSuppliers(updated);
      setEditIndex(null);
    } else {
      setSubmittedSuppliers((prev) => [...prev, submissionWithDate]);
    }

    setFormData({ name: '', gst: '', contact: '', address: '', email: '' });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', gst: '', contact: '', address: '', email: '' });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = submittedSuppliers.filter((_, i) => i !== index);
    setSubmittedSuppliers(updated);
  };

  const handleEdit = (index) => {
    const selected = submittedSuppliers[index];
    setFormData(selected);
    setEditIndex(index);
    setSubmitted(false);
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(submittedSuppliers, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'suppliers_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Supplier Records', 14, 22);

    const tableColumn = ['Name', 'GST', 'Contact', 'Email', 'Address', 'Submitted'];
    const tableRows = submittedSuppliers.map((supplier) => [
      supplier.name,
      supplier.gst,
      supplier.contact,
      supplier.email,
      supplier.address,
      supplier.submittedAt,
    ]);

    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [63, 81, 181] }, // MUI primary indigo
    });

    doc.save('suppliers_data.pdf');
  };

  return (
    <Box sx={{ width: '98%', minHeight: '100vh', py: 5, px: { xs: 2, md: 8 }}}>
      <AnimatePresence>
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <Paper elevation={4} sx={{ p: { xs: 5, md: 4 }, borderRadius: 3, maxWidth: '9100px', mx: 'auto', mb: 5 }}>
              <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
                {editIndex !== null ? 'Edit Supplier' : 'Add Supplier'}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}   sx={{ width: '400px' }} ml={4}>
                    <TextField label="Supplier Name" name="name" value={formData.name} onChange={handleChange} variant='outlined'fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}  sx={{ width: '400px' }} ml={4}>
                    <TextField label="GST Number" name="gst" value={formData.gst} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}  sx={{ width: '400px' }} ml={4}>
                    <TextField label="Contact Number" name="contact" value={formData.contact} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}  sx={{ width: '400px' }} ml={4}>
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12}  sx={{ width: '400px' }} ml={4}>
                    <TextField label="Address" name="address" value={formData.address} onChange={handleChange} multiline  fullWidth required />
                  </Grid>
                  <Grid item xs={12} textAlign="center" ml={4}>
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 6, py: 1.9, borderRadius: 3, fontWeight: 'bold' }}>
                      {editIndex !== null ? 'Update' : 'Submit'}
                    </Button>
                    {editIndex !== null && (
                      <Button onClick={handleReset} color="secondary" sx={{ ml: 2, mt: { xs: 2, sm: 0 }, fontWeight: 'bold' }}>
                        Cancel
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={4} sx={{ p: 6, borderRadius: 3, maxWidth: '600px', mx: 'auto', textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                🎉 Supplier Saved Successfully!
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleReset} sx={{ mt: 2, px: 4, py: 1, borderRadius: 2 }}>
                Add Another / Go to Form
              </Button>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {submittedSuppliers.length > 0 && (
        <motion.div
          key="table"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: '1000px', mx: 'auto', mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
              <Typography variant="h5" fontWeight="bold">
                Supplier Records
              </Typography>
              <Box display="flex" gap={1}>
            
                <Button variant="outlined" color="secondary" onClick={handleDownloadPDF}>
                  Download PDF
                </Button>
              </Box>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>GST</strong></TableCell>
                    <TableCell><strong>Contact</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Address</strong></TableCell>
                    <TableCell><strong>Submitted</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submittedSuppliers.map((supplier, index) => (
                    <TableRow key={index}>
                      <TableCell>{supplier.name}</TableCell>
                      <TableCell>{supplier.gst}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.address}</TableCell>
                      <TableCell>{supplier.submittedAt}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </motion.div>
      )}
    </Box>
  );
};

export default SupplierFullScreenForm;
