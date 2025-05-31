import React from 'react';

function Footer() {
    const keywords = [
        'súng nước điện',
        'máy cạo râu',
        'đai lưng cột sống',
        'nintendo switch',
        'estee lauder',
        'cần gạt mưa ô tô',
        'quat mini cầm tay',
        'loa báo chuyển khoản',
        'giá đỡ laptop',
        'cpu',
        'doremon',
        'máy đo đường huyết không cần lấy máu',
        'bảng vẽ điện tử',
        'ổ cứng ssd 512gb',
        'cặp ly dạ quang',
        'usb wifi',
        'tai nghe mini',
        'khẩu trang y tế',
        'xe đạp điện',
        'máy tính casio 580',
        'kẹo dâu phòng bơ sữa',
        'đổi đồ gãy vàng',
        'áo thanh xuân trung quốc',
        'xác điện thoại realme',
        'Candypants',
        'micro maono',
        'weekaseven',
        'quạt cầm tay m11',
        'kem main thorakao ốc sên',
        'quần bỉ ngỡ nữ',
    ];
    return (
        <div className="bg-white border-t">
            <div className="max-w-5xl mx-auto text-sm">
                <h2 className="font-semibold text-gray-800 pb-4 pt-3 px-4 bg-[#EFEFEF]">CÓ THỂ BẠN ĐANG TÌM KIẾM</h2>
                <div className="flex flex-wrap gap-y-2 text-gray-600 bg-[#EFEFEF] px-4 pb-6">
                    {keywords.map((item, idx) => (
                        <span key={idx} className="hover:underline cursor-pointer text-xs">
                            {item}
                            {idx !== keywords.length - 1 && <span className="px-1 text-gray-600">|</span>}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs text-gray-500 px-4">
                    <p className="hover:underline cursor-pointer text-center">🔒 CHÍNH SÁCH BẢO MẬT</p>
                    <p className="hover:underline cursor-pointer text-center">📜 QUY CHẾ HOẠT ĐỘNG</p>
                    <p className="hover:underline cursor-pointer text-center">🚚 CHÍNH SÁCH VẬN CHUYỂN</p>
                    <p className="hover:underline cursor-pointer text-center">🔄 CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</p>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6 flex-wrap px-4">
                    <div className="flex flex-col items-center gap-4 px-4">
                        <div className="flex justify-center gap-4">
                            <img
                                src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748249457/icon-footer-2_ubsbxi.png"
                                alt="Đã đăng ký"
                                className="h-12"
                            />
                            <img
                                src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748249457/icon-footer-2_ubsbxi.png"
                                alt="Đã đăng ký"
                                className="h-12"
                            />
                        </div>
                        <div className="flex justify-center">
                            <img
                                src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748249458/icon-footer-3_winqaw.png"
                                alt="Bộ công thương"
                                className="h-16"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center text-xs text-gray-500 px-4 pb-3">
                    <p className="leading-relaxed">
                        Công ty TNHH Shopee <br />
                        Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba
                        Đình, Thành phố Hà Nội, Việt Nam. <br />
                        Số điện thoại: 19001221 - Email: cskh@hotro.shopee.vn <br />
                        Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
                    </p>
                    <p className="mt-2">&copy; 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
