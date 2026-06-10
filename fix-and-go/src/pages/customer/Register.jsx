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

    if (!formData.fullname.trim()) { newErrors.fullname = 'Vui lòng nhập họ và tên.'; isValid = false; }
    if (!formData.phone.trim()) { newErrors.phone = 'Vui lòng nhập số điện thoại hoặc email.'; isValid = false; }
    if (!formData.password) { newErrors.password = 'Vui lòng nhập mật khẩu.'; isValid = false; }
    if (!formData.terms) { newErrors.terms = 'Bạn phải đồng ý với Điều khoản.'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.phone === formData.phone)) {
        alert("Số điện thoại này đã được đăng ký!"); return;
      }
      users.push({ fullname: formData.fullname, phone: formData.phone, password: formData.password });
      localStorage.setItem('users', JSON.stringify(users));
      alert("Đăng ký thành công!");
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Cột trái: Hình ảnh (Chỉ hiển thị trên Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 relative overflow-hidden flex-col justify-center items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="z-10 text-center p-12 bg-white/70 backdrop-blur-sm rounded-3xl m-8 shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Gia nhập cộng đồng Fix&Go</h1>
          <p className="text-lg text-gray-700">Dịch vụ cứu hộ xe máy nhanh chóng, uy tín với hàng ngàn thợ sửa xe trên toàn quốc.</p>
        </div>
      </div>

      {/* Cột phải: Form Đăng ký */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 animate-fade-in relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-3 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors hidden lg:block"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        <div className="w-full max-w-md">
          <button onClick={() => navigate(-1)} className="mb-6 p-2 -ml-2 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors lg:hidden">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Tạo tài khoản mới</h2>
            <p className="text-gray-500 mt-2">Điền thông tin của bạn để bắt đầu sử dụng.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4" noValidate>
            {/* Fullname */}
            <div>
              <label className="text-sm font-medium text-gray-700 ml-1">Họ và Tên</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 focus:bg-white" placeholder="Nguyễn Văn A" />
              </div>
              {errors.fullname && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullname}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700 ml-1">Số điện thoại</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 focus:bg-white" placeholder="09xx xxx xxx" />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 ml-1">Mật khẩu</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="block w-full pl-10 pr-10 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 focus:bg-white" placeholder="Mật khẩu của bạn" />
                <button type="button" className="absolute right-3 top-3.5" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
            </div>

            {/* Terms */}
            <div className="pt-2">
              <div className="flex items-center">
                <input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} className="h-4 w-4 text-red-500 rounded border-gray-300 focus:ring-red-500" />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">Đồng ý với <span className="text-red-600 font-bold">Điều khoản sử dụng</span></label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>

            <button type="submit" className="w-full py-4 mt-6 text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg font-bold transition-all active:scale-[0.98]">
              Đăng Ký Tài Khoản
            </button>
          </form>

          <div className="mt-8 text-center pb-8">
            <p className="text-gray-600">
              Đã có tài khoản? <Link to="/login" className="font-bold text-red-600 hover:text-red-700">Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
