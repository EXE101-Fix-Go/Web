import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Customer Pages
import CustomerLogin from './pages/customer/Login';
import CustomerRegister from './pages/customer/Register';
import CustomerHome from './pages/customer/Home';
import CustomerProfile from './pages/customer/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Đã gỡ bỏ khung max-w-md để trang trải dài full màn hình */}
        <Routes>
          {/* Redirect root to customer login for now */}
          <Route path="/" element={<Navigate to="/login" />} />
          
          {/* Customer Routes */}
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/register" element={<CustomerRegister />} />
          <Route path="/home" element={<CustomerHome />} />
          <Route path="/profile" element={<CustomerProfile />} />
          
          {/* TODO: Add Partner and Admin routes later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
