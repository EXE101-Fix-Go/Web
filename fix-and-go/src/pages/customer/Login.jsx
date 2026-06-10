import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // States lưu trữ dữ liệu nhập vào
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // States lưu trữ thông báo lỗi
  const [errors, setErrors] = useState({});

  // Hàm kiểm tra tính hợp lệ
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate Email/SĐT
    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập Email hoặc Số điện thoại.';
      isValid = false;
    } else {
      // Rule: Nếu là số thì phải từ 10-11 số, nếu là chữ thì phải đúng định dạng email
      const phoneRegex = /^[0-9]{10,11}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!phoneRegex.test(formData.username) && !emailRegex.test(formData.username)) {
        newErrors.username = 'Vui lòng nhập đúng định dạng Email hoặc Số điện thoại (10-11 số).';
        isValid = false;
      }
    }

    // Validate Password
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
      // TODO: Gắn API Login thực tế vào đây
      alert("Dữ liệu hợp lệ! Đang gọi API đăng nhập...");
      // navigate('/home'); // Chuyển trang sau khi đăng nhập thành công
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Xóa lỗi khi người dùng bắt đầu gõ lại
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 animate-fade-in">
      {/* Header / Logo */}
      <div className="flex-1 flex flex-col justify-center items-center mt-12 mb-8">
        <div className="w-32 h-32 rounded-full flex items-center justify-center mb-4 shadow-xl overflow-hidden bg-red-100">
          <img src="/avater.jpg" alt="Đại diện" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Fix&Go</h1>
        <p className="text-gray-500 text-center px-4">Cứu hộ xe máy nhanh chóng, tiện lợi mọi lúc mọi nơi</p>
      </div>

      {/* Login Form */}
      <div className="w-full">
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          {/* Input Username */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Email hoặc Số điện thoại</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${errors.username ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:bg-white transition-all outline-none 
                  ${errors.username ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-red-500 focus:border-red-500'}`} 
                placeholder="Nhập email/SĐT của bạn"
              />
            </div>
            {/* Hiển thị lỗi username */}
            {errors.username && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.username}</p>}
          </div>

          {/* Input Password */}
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
                className={`block w-full pl-10 pr-10 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:bg-white transition-all outline-none 
                  ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-red-500 focus:border-red-500'}`} 
                placeholder="Nhập mật khẩu"
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {/* Hiển thị lỗi password */}
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Ghi nhớ tôi
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-red-500 hover:text-red-600">
              Quên mật khẩu?
            </a>
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center py-3.5 px-4 mt-6 border border-transparent rounded-xl shadow-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-bold transition-colors active:scale-[0.98]"
          >
            Đăng Nhập
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Bạn chưa có tài khoản?{' '}
            <Link to="/register" className="font-bold text-red-500 hover:text-red-600 transition-colors">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
