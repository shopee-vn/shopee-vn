import React from 'react'
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const categories = [
  {
    label: "Thời Trang Nam",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908408/image-1_ggcmdd.webp",
  },
  {
    label: "Điện Thoại & Phụ Kiện",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908409/image-2_q0y9tk.webp",
  },
  {
    label: "Thiết Bị Điện Tử",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908410/image-3_nzlfak.webp",
  },
  {
    label: "Máy Tính & Laptop",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908410/image-4_eigau5.webp",
  },
  {
    label: "Thời Trang Nữ",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908410/image-5_vagtzd.webp",
  },
  {
    label: "Mẹ & Bé",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908411/image-6_csqiei.webp",
  },
  {
    label: "Nhà Cửa & Đời Sống",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908411/image-7_xcxhdi.webp",
  },
  {
    label: "Sắc Đẹp",
    image: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747908412/image-8_uk7vna.webp",
  },
];

function CategoryGrid() {
  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-base font-semibold text-[#EE4D2D]">DANH MỤC</h2>
        <div className='flex items-center gap-1'>
            <button className="text-xs text-gray-500 hover:text-red-500">Xem Thêm </button>
            <ChevronRightIcon className='w-3 h-3'/>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 text-center">
        {categories.map((item, index) => (
          <a href='' key={index} className="flex flex-col items-center text-xs">
            <div className="w-18 h-18 rounded-full bg-gray-100 flex items-center justify-center">
              <img src={item.image} alt={item.label} className="w-full h-full object-contain" />
            </div>
            <span className="mt-2 text-sm">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default CategoryGrid
