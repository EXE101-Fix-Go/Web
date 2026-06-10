import React, { useEffect, useState } from 'react';
import CustomerLayout from '../../components/CustomerLayout';
import { 
  Search, SlidersHorizontal, Wrench, Store, Droplets, 
  MapPin, Bookmark, ArrowRight 
} from 'lucide-react';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) setUser(JSON.parse(currentUser));
  }, []);

  return (
    <CustomerLayout>
      <div className="max-w-5xl mx-auto p-6 lg:p-12">
        
        {/* Lời chào (Header) */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 flex items-center gap-2 mb-2 tracking-tight">
              Chào {user?.fullname?.split(' ').pop() || 'bạn'} <span className="text-3xl lg:text-4xl animate-wave origin-bottom-right">👋</span>
            </h1>
            <p className="text-gray-500 text-base lg:text-lg">Fix&Go rất vui vì có thể giúp bạn!</p>
          </div>
          <div className="hidden lg:block w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img src="/avater.jpg" alt="Avatar" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 shadow-sm group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input 
            type="text" 
            className="block w-full pl-14 pr-16 py-4 lg:py-5 bg-white border-none rounded-2xl focus:ring-2 focus:ring-red-500 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-gray-800 font-medium outline-none transition-all" 
            placeholder="Tìm kiếm vị trí hoặc dịch vụ..." 
          />
          <button className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer">
            <div className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <SlidersHorizontal className="h-5 w-5 text-gray-500" />
            </div>
          </button>
        </div>

        {/* Most popular job */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Most popular job</h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Show all</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
            <button className="flex items-center space-x-2 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all shrink-0 active:scale-95">
              <div className="p-1.5 bg-gray-50 rounded-lg">
                <Wrench className="w-5 h-5 text-gray-700" />
              </div>
              <span className="font-semibold text-gray-800">Tình trạng</span>
            </button>
            <button className="flex items-center space-x-2 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all shrink-0 active:scale-95">
              <div className="p-1.5 bg-red-50 rounded-lg">
                <Store className="w-5 h-5 text-red-500" />
              </div>
              <span className="font-semibold text-gray-800">Tiệm sửa</span>
            </button>
            <button className="flex items-center space-x-2 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all shrink-0 active:scale-95">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-semibold text-gray-800">Rửa xe</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-500 text-white p-7 rounded-3xl relative overflow-hidden shadow-xl hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <Bookmark className="w-6 h-6 text-white/80 hover:text-white" />
              </button>
            </div>
            <h3 className="text-2xl font-bold mb-2">Cứu hộ khẩn cấp</h3>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed opacity-90 max-w-[85%] line-clamp-2">
              Số 1 Lưu Hữu Phước, Đông Hòa, Dĩ An, Bình Dương, Việt Nam
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-blue-500 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Tới ngay</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-3xl relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 transition-transform cursor-pointer group hidden md:flex md:flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100">
                <Wrench className="w-7 h-7 text-orange-500" />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bảo dưỡng định kỳ</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-[85%]">
              Thay nhớt, kiểm tra nhông xích và phanh an toàn.
            </p>
            <div className="flex gap-2 mt-auto">
              <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">Full check</span>
              <span className="text-xs font-semibold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg">150.000đ</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Hoạt động gần đây</h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">Show all</button>
          </div>
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-2 overflow-hidden">
            <div className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer border-b border-gray-50 last:border-0">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mr-4">
                <Wrench className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Vá lốp xe máy</h4>
                <p className="text-sm text-gray-500 mt-0.5">Tiệm sửa xe Anh Tuấn</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">-40.000đ</p>
                <p className="text-xs text-gray-400 mt-0.5">Hôm qua</p>
              </div>
            </div>
            <div className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Rửa xe bọt tuyết</h4>
                <p className="text-sm text-gray-500 mt-0.5">Rửa xe 5S</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">-30.000đ</p>
                <p className="text-xs text-gray-400 mt-0.5">2 ngày trước</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </CustomerLayout>
  );
};

export default Home;
