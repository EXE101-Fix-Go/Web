import React, { useState, useEffect } from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomerLayout from '../../components/CustomerLayout';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: '',
    phone: '',
    email: 'toideptraibanbinhthuong321@gmail.com',
    location: 'Đông Hòa, Dĩ An, Bình Dương'
  });

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(prev => ({
        ...prev,
        fullname: parsedUser.fullname || '',
        phone: parsedUser.phone === 'user' ? '+84 987 654 321' : parsedUser.phone,
        email: parsedUser.phone && parsedUser.phone.includes('@') ? parsedUser.phone : prev.email
      }));
    }
  }, []);

  return (
    <CustomerLayout>
      <div className="max-w-3xl mx-auto bg-white min-h-screen lg:min-h-0 lg:my-8 lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100 overflow-hidden animate-fade-in">
        
        {/* Header Mobile */}
        <div className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-10 lg:hidden">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">My profile</h1>
          <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Header Desktop */}
        <div className="hidden lg:flex items-center justify-between px-10 py-8 border-b border-gray-50">
          <h1 className="text-2xl font-bold text-gray-900">My profile</h1>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div className="p-6 lg:p-10">
          {/* Avatar Area */}
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm mr-5 shrink-0">
              <img src="/avater.jpg" alt="Avatar" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
            </div>
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{user.fullname || 'Khách hàng'}</h2>
              <button className="text-blue-500 font-medium text-sm hover:text-blue-600 transition-colors">+ Add status</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-[#3b82f6] rounded-2xl p-1.5 flex mb-8">
            <button className="flex-1 bg-white text-blue-600 font-bold py-3.5 rounded-xl shadow-sm text-center">
              Thông tin liên lạc
            </button>
            <button className="flex-1 text-white font-bold py-3.5 rounded-xl hover:bg-white/10 transition-colors text-center">
              Cập nhật
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 pb-20 lg:pb-0">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Name</label>
              <input 
                type="text" 
                readOnly
                value={user.fullname} 
                className="w-full border border-gray-200 rounded-xl px-4 py-4 text-gray-700 bg-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Email</label>
              <input 
                type="email" 
                readOnly
                value={user.email} 
                className="w-full border border-gray-200 rounded-xl px-4 py-4 text-gray-700 bg-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Phone</label>
              <input 
                type="text" 
                readOnly
                value={user.phone} 
                className="w-full border border-gray-200 rounded-xl px-4 py-4 text-gray-700 bg-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Location</label>
              <input 
                type="text" 
                readOnly
                value={user.location} 
                className="w-full border border-gray-200 rounded-xl px-4 py-4 text-gray-700 bg-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

        </div>
      </div>
    </CustomerLayout>
  );
};

export default Profile;
