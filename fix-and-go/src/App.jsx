import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Customer Pages
import CustomerLogin from './pages/customer/Login';
import CustomerRegister from './pages/customer/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Khung chứa giới hạn chiều rộng trên màn hình Desktop (Responsive) */}
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
          <Routes>
            {/* Redirect root to customer login for now */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* Customer Routes */}
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/register" element={<CustomerRegister />} />
            
            {/* TODO: Add Partner and Admin routes later */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
