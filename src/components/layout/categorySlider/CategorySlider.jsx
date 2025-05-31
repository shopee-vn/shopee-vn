import React from 'react'

const categories = [
  {
    icon: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747907112/icon-1_t3afao.png",
    label: "ShopeeFood Giảm 50%",
  },
  {
    icon: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747907112/icon-2_okhdfx.png",
    label: "Mã Giảm Giá",
  },
  {
    icon: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747907112/icon-3_xrqwhe.png",
    label: "Khách Hàng Thân Thiết",
  },
  {
    icon: "https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747907112/icon-4_euolt4.png",
    label: "Shopee Voucher",
  },
];


function CategorySlider() {
  return (
    <div className="pt-4 pb-4 flex justify-center">
      <div className="flex space-x-4 px-4 py-2">
        {categories.map((item, index) => (
          <a href=''
            key={index}
            className="flex flex-col items-center min-w-[80px] text-center"
          >
            <div className="w-11 h-11 flex items-center justify-center">
              <img src={item.icon}/>
            </div>
            <p className="text-xs mt-2">{item.label}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default CategorySlider
