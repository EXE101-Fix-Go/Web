import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    password: '',
    terms: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate Fullname
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'Vui lòng nhập họ và tên.';
      isValid = false;
    } else if (formData.fullname.trim().length < 2) {
      newErrors.fullname = 'Họ và tên phải có ít nhất 2 ký tự.';
      isValid = false;
    }

    // Validate Phone/Email
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hoặc email.';
      isValid = false;
    } else {
      const phoneRegex = /^[0-9]{10,11}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!phoneRegex.test(formData.phone) && !emailRegex.test(formData.phone)) {
        newErrors.phone = 'Định dạng SĐT (10-11 số) hoặc Email chưa đúng.';
        isValid = false;
      }
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải dài ít nhất 8 ký tự.';
      isValid = false;
    }

    // Validate Terms
    if (!formData.terms) {
      newErrors.terms = 'Bạn phải đồng ý với Điều khoản sử dụng.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Gắn API Register thực tế vào đây
      alert("Dữ liệu hợp lệ! Đăng ký thành công.");
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 animate-fade-in bg-white">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 text-gray-700" />
      </button>

      {/* Header */}
      <div className="mt-16 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo tài khoản</h1>
        <p className="text-gray-500">Đăng ký để trải nghiệm dịch vụ cứu hộ xe máy tiện ích nhất.</p>
      </div>

      {/* Register Form */}
      <div className="w-full">
        <form onSubmit={handleRegister} className="space-y-4" noValidate>
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Họ và Tên</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${errors.fullname ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
              <input 
                type="text" 
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:bg-white transition-all outline-none 
                  ${errors.fullname ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'}`} 
                placeholder="Ví dụ: Nguyễn Văn A"
              />
            </div>
            {errors.fullname && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.fullname}</p>}
          </div>

          {/* Phone / Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1">Số điện thoại hoặc Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${errors.phone ? 'text-red-500' : 'text-gray-400'}`} />
              </div>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:bg-white transition-all outline-none 
                  ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'}`} 
                placeholder="09xx xxx xxx hoặc email"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone}</p>}
          </div>

          {/* Password */}
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
                  ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'}`} 
                placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
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
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
          </div>

          {/* Terms */}
          <div className="flex flex-col pt-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  id="terms" 
                  name="terms"
                  type="checkbox" 
                  checked={formData.terms}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500 mt-1" 
                />
              </div>
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                Tôi đồng ý với các <a href="#" className="font-bold text-red-500 hover:text-red-600">Điều khoản sử dụng</a> và <a href="#" className="font-bold text-red-500 hover:text-red-600">Chính sách bảo mật</a>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs mt-1 font-medium">{errors.terms}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3.5 px-4 mt-6 border border-transparent rounded-xl shadow-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-bold transition-colors active:scale-[0.98]"
          >
            Tạo Tài Khoản
          </button>
        </form>

        <div className="mt-8 text-center pb-8">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-red-500 hover:text-red-600 transition-colors">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
