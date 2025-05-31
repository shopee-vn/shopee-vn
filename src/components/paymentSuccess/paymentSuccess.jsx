import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { ProductList } from '../layout/productList';
import { Footer } from '../layout/footer';

function PaymentSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/');
    };

    useEffect(() => {
        if (location.state?.showToast) {
            toast.success('Đặt hàng thành công', {
                autoClose: 2000,
            });
        }
    }, [location.state]);

    return (
        <div className="">
            <button onClick={handleBackHome} className="w-full bg-[#ff5722] p-4 text-white">
                <div className="flex items-center gap-2">
                    <ArrowLeftIcon className="w-5 h-4" />
                    <h1 className="text-lg font-semibold">Quay lại</h1>
                </div>
            </button>
            <ToastContainer />
            <div className="bg-[#ff5722] p-4 text-white">
                <div className="mt-6">
                    <div className="flex items-center justify-center gap-1">
                        <ExclamationCircleIcon className="w-7 h-7" />
                        <span className="text-xl">Đang chờ thanh toán</span>
                    </div>
                    <p className="text-sm pt-3 text-center">
                        Cùng Shopee bảo vệ quyền lợi của bạn - <br />
                        <span className="uppercase">KHÔNG CHUYỂN TIỀN TRƯỚC</span> cho Shipper khi đơn hàng chưa được
                        giao tới với bất kỳ lý do gì
                    </p>
                </div>
            </div>
            <div className="bg-[#ff5722] p-4 text-white">
                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={handleBackHome} className="w-full border border-white py-2 rounded-lg">
                        Trang chủ
                    </button>
                    <button onClick={handleBackHome} className="w-full border border-white py-2 rounded-lg">
                        Đơn mua
                    </button>
                </div>
            </div>
            <div className="mt-6 bg-white rounded-md">
                <img
                    src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748653760/spaylate_rq1faa.webp"
                    alt="banner"
                    className="rounded w-full"
                />
            </div>
            <div className="flex items-center mt-6 bg-gray-100 rounded-md p-4">
                <div className="h-[1px] w-[50%] bg-gray-500 "></div>
                <h2 className="w-full text-gray-500 text-base text-center">Có thể bạn cũng thích</h2>
                <div className="h-[1px] w-[50%] bg-gray-500 "></div>
            </div>
            <ProductList />
            <Footer />
        </div>
    );
}

export default PaymentSuccess;
