import { useState } from 'react';
import { Modal } from 'antd';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

function VoucherModal({ product, voucherCode, setVoucherCode, voucherSale, setDiscountPercent, toastSuccess, toastError }) {
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [note, setNote] = useState('');

    const voucherData = [
        {
            priceSale: 80,
            dateRandom: 4,
            divideRandom: 99,
            useRandom: 900,
            mutiRandom: 2,
        },
        {
            priceSale: 40,
            dateRandom: 6,
            divideRandom: 96,
            useRandom: 600,
            mutiRandom: 3,
        },
        {
            priceSale: 60,
            dateRandom: 2,
            divideRandom: 98,
            useRandom: 800,
            mutiRandom: 1,
        },
    ];

    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };

    const showModal2 = () => {
        setIsModalOpen2(true);
    };
    const handleOk2 = () => {
        setIsModalOpen2(false);
    };
    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const handleApplyVoucher = () => {
        const trimmedCode = voucherCode.trim().toLowerCase();
        if (voucherSale.hasOwnProperty(trimmedCode)) {
            setDiscountPercent(voucherSale[trimmedCode]);
            setVoucherCode('');
            toastSuccess()
            handleOk1();
        } else {
            toastError()
            setDiscountPercent(0);
            // alert('Mã không hợp lệ!');
        }
    };

    return (
        <div className="mb-4 w-full">
            <div className="w-full text-sm text-gray-600 border-t pt-3 border-b pb-3">
                <button className="w-full flex py-2 justify-between" onClick={showModal1}>
                    <span className="text-sm text-[#000000DE]">Voucher của shop</span>
                    <div className="flex items-center gap-1 text-[#BDBDBD]">
                        <span className="text-sm">Chọn hoặc nhập mã Voucher</span>
                        <ChevronRightIcon className="w-3 h-3" />
                    </div>
                </button>
                <Modal
                    title={`${product.author} - AAR Voucher`}
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen1}
                    onOk={handleOk1}
                    onCancel={handleCancel1}
                    width="100%"
                    className="custom-modal"
                    styles={{ body: { padding: 0 } }}
                >
                    <div className=" bg-white">
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                type="text"
                                placeholder="Nhập mã voucher của Shop"
                                className="flex-1 border border-gray-300 rounded px-2 py-2 text-sm outline-none"
                            />
                            <button
                                onClick={handleApplyVoucher}
                                className="bg-red-500 text-white text-sm px-3 py-2 rounded"
                            >
                                Áp Dụng
                            </button>
                        </div>
                        {voucherData.map((item, index) => (
                            <div key={index} className="flex border rounded-md overflow-hidden relative mb-3">
                                <div className="flex flex-col items-center justify-center w-24 bg-pink-200 p-2">
                                    <div className="w-12 h-12 flex items-center justify-center">
                                        <img
                                            className="rounded-full"
                                            src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748528907/icon-viettel_v7dsbm.jpg"
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="text-[10px] mt-[-4px] text-white bg-[#EF4444] px-1 rounded-[2px]">
                                        Mall
                                    </div>
                                </div>
                                <div className="flex-1 pt-2 pb-2 pl-2 text-sm">
                                    <p className="text-[15px] font-medium text-gray-800">Giảm ₫{item.priceSale}k</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Đơn tối thiểu ₫{item.useRandom}</p>
                                    <div className="inline-block border border-red-500 text-red-500 text-[10px] px-1 py-0.5 rounded mt-1">
                                        Sản phẩm nhất định
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Đã dùng {item.divideRandom}%, Sắp hết hạn: Còn {item.dateRandom} ngày
                                    </div>
                                </div>
                                <div className="flex items-center px-3">
                                    <button className="bg-orange-500 text-white text-xs px-3 py-1 rounded">Lưu</button>
                                </div>
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl">
                                    x{item.mutiRandom}
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal>
                <button className="w-full flex py-2 justify-between" onClick={showModal2}>
                    <span className="text-sm text-[#000000DE]">Lời nhắn cho shop</span>
                    <div className="flex items-center gap-1 text-[#BDBDBD]">
                        <span className="text-sm">Để lại lời nhắn</span>
                        <ChevronRightIcon className="w-3 h-3" />
                    </div>
                </button>
                <Modal
                    title="Lời nhắn cho shop"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}
                    width="100%"
                    className="custom-modal"
                    styles={{ body: { padding: 0 } }}
                >
                    <div className=" bg-white">
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                type="text"
                                placeholder="Để lại lời nhắn"
                                className="flex-1 border border-gray-300 rounded px-2 py-4 text-sm outline-none"
                            />
                        </div>
                    </div>
                </Modal>
                <button className="w-full flex py-2 justify-between">
                    <span className="text-sm text-[#000000DE]">Hóa đơn điện tử</span>
                    <div className="flex items-center gap-1 text-[#BDBDBD]">
                        <span className="text-sm">Yêu cầu ngay</span>
                        <ChevronRightIcon className="w-3 h-3" />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default VoucherModal;
