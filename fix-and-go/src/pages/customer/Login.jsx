import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Khởi tạo tài khoản mặc định user/123 để test nhanh
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const defaultUserExists = users.some(u => u.phone === 'user');
    if (!defaultUserExists) {
      users.push({
        fullname: 'Khách VIP',
        phone: 'user',
        password: '123'
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const [formData, setFormData] = useState({
    username: 'user', // Điền sẵn
    password: '123'   // Điền sẵn
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập Email hoặc Tài khoản.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.phone === formData.username && u.password === formData.password);

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/home');
      } else {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Cột trái: Hình ảnh (Chỉ hiển thị trên Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-red-50 relative overflow-hidden flex-col justify-center items-center">
        {/* Hình nền gradient trang trí */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/20 to-orange-500/10 z-0"></div>
        <div className="z-10 text-center p-12">
          <div className="w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl overflow-hidden bg-white border-4 border-white">
            <img src="/avater.jpg" alt="Đại diện" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
            <span className="text-red-500 font-bold text-3xl absolute -z-10">F&G</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Fix&Go</h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">Trạm cứu hộ xe máy di động số 1 Việt Nam. Đồng hành cùng bạn trên mọi nẻo đường.</p>
        </div>
      </div>

      {/* Cột phải: Form Đăng nhập */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 animate-fade-in">
        <div className="w-full max-w-md">
          {/* Header Mobile (Ẩn trên Desktop) */}
          <div className="lg:hidden flex flex-col justify-center items-center mb-10">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden bg-white border-2 border-red-100">
              <img src="/avater.jpg" alt="Đại diện" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
              <span className="text-red-500 font-bold absolute -z-10">F&G</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fix&Go</h1>
            <p className="text-gray-500 text-center">Đăng nhập để gọi cứu hộ</p>
          </div>

          <div className="mb-8 hidden lg:block">
            <h2 className="text-3xl font-bold text-gray-900">Chào mừng trở lại! 👋</h2>
            <p className="text-gray-500 mt-2">Vui lòng đăng nhập tài khoản của bạn.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Tài khoản</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${errors.username ? 'text-red-500' : 'text-gray-400'}`} />
                </div>
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3.5 border rounded-xl bg-gray-50 focus:ring-2 focus:bg-white transition-all outline-none 
                    ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500 focus:border-red-500'}`} 
                  placeholder="Nhập tài khoản"
                />
              </div>
              {errors.username && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.username}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 ml-1">Mật khẩu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3.5 border rounded-xl bg-gray-50 focus:ring-2 focus:bg-white transition-all outline-none 
                    ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500 focus:border-red-500'}`} 
                  placeholder="Nhập mật khẩu"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Ghi nhớ tôi</label>
              </div>
              <a href="#" className="text-sm font-medium text-red-500 hover:text-red-600">Quên mật khẩu?</a>
            </div>

            <button 
              type="submit" 
              className="w-full flex items-center justify-center py-4 px-4 mt-6 border border-transparent rounded-xl shadow-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-bold transition-all transform active:scale-[0.98]"
            >
              Đăng Nhập
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-600">
              Bạn chưa có tài khoản?{' '}
              <Link to="/register" className="font-bold text-red-600 hover:text-red-700 transition-colors">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
