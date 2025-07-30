import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MedicalDashboard from './Dashboard/MedicalDashboard';

// Supplier Pages
import SupplierManagement from './SuplierPages/SupplierManagement';
import SupplierMaster from './SuplierPages/SupplierMaster';
import PurchaseHistory from './SuplierPages/PurchaseHistory';
import PaymentTracking from './SuplierPages/PaymentTracking';

// Sidebar Module Pages
import Inventory from './Sidebar/Inventory';
import Sales from './Sidebar/Sales';
import Purchase from './Sidebar/Purchase';
import Customer from './Sidebar/Customer';
import ReportAnalysis from './Sidebar/ReportAnalysis';
import BarcodeIntegration from './Sidebar/BarcodeIntegration';
import SecurityAccess from './Sidebar/SecurityAccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MedicalDashboard />}>
          {/* Default */}
          <Route index element={<SupplierManagement />} />

          {/* Supplier Pages */}
          <Route path="supplier-management" element={<SupplierManagement />} />
          <Route path="supplier-master" element={<SupplierMaster />} />
          <Route path="purchase-history" element={<PurchaseHistory />} />
          <Route path="payment-tracking" element={<PaymentTracking />} />

          {/* Sidebar Module Pages */}
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="customer" element={<Customer />} />
          <Route path="report-analysis" element={<ReportAnalysis />} />
          <Route path="barcode-integration" element={<BarcodeIntegration />} />
          <Route path="security-access" element={<SecurityAccess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
