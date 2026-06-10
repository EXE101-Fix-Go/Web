import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, History, Bell, User, LogOut, Menu, X 
} from 'lucide-react';

const CustomerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const navItems = [
    { name: 'Trang chủ', path: '/home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Lịch sử cuốc', path: '#', icon: <History className="w-5 h-5" /> },
    { name: 'Thông báo', path: '#', icon: <Bell className="w-5 h-5" />, badge: 3 },
    { name: 'Tài khoản', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* === MOBILE HEADER CHUNG (Ẩn ở trang Profile vì có header riêng) === */}
      <div className={`lg:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 px-4 py-3 flex justify-between items-center shadow-sm ${location.pathname === '/profile' ? 'hidden' : ''}`}>
        <button onClick={() => setSidebarOpen(true)} className="p-2 bg-gray-100 rounded-full text-gray-700">
          <Menu className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-100">
          <img src="/avater.jpg" alt="Avatar" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
        </div>
      </div>

      {/* === SIDEBAR (DESKTOP + MOBILE) === */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 lg:relative lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 py-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-red-100 shadow-sm">
              <img src="/avater.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Fix&Go</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-colors ${isActive ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.badge && <span className="ml-auto bg-red-500 text-white text-xs py-0.5 px-2 rounded-full">{item.badge}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Background mờ khi mở Sidebar trên Mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>}

      {/* === MAIN CONTENT === */}
      <div className={`flex-1 overflow-y-auto w-full ${location.pathname === '/profile' ? 'pt-0 lg:pt-0' : 'pt-20 lg:pt-0'}`}>
        {children}
      </div>
      
    </div>
  );
};

export default CustomerLayout;
