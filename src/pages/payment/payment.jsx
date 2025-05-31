import { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import app from '../../firebaseConfig';
import { getDatabase, ref, set, get, push } from 'firebase/database';
import {
    ArrowPathIcon,
    ChevronRightIcon,
    ShoppingCartIcon,
    InformationCircleIcon,
    CurrencyDollarIcon,
    CreditCardIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';

import { Header } from '../../components/layout/header';
import { VoucherModal } from '../../components/voucherModal';
import { ProductCardPayment } from '../../components/productCardPayment';

function Payment() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [voucherCode, setVoucherCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(0);

    const orderSuccess = () =>
        toast.success('Đặt hàng thành công', {
            autoClose: 2000,
            position: 'top-right',
        });
    const notifySuccess = () =>
        toast.success('Add mã giảm giá thành công', {
            autoClose: 2000,
            position: 'top-right',
        });
    const notifyError = () =>
        toast.error('Add mã giảm giá không thành công', {
            autoClose: 2000,
        });

    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/');
    };
    const handleOrder = () => {
        navigate('/paymentSuccess', { state: { showToast: true } });
    };

    const voucherSale = {
        giam1: 50,
        giam2: 60,
        giam3: 70,
        giam4: 80,
        giam5: 90,
        giam6: 100,
    };

    const voucherData = [
        {
            priceSale: 300,
            dateRandom: 4,
            divideRandom: 96,
            useRandom: 800,
            mutiRandom: 2,
        },
        {
            priceSale: 200,
            dateRandom: 6,
            divideRandom: 98,
            useRandom: 600,
            mutiRandom: 3,
        },
        {
            priceSale: 260,
            dateRandom: 8,
            divideRandom: 99,
            useRandom: 800,
            mutiRandom: 1,
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const today = new Date();
    const startDate = addDays(today, 2);
    const endDate = addDays(today, 6);
    const formatDate = (date) => format(date, "d 'Th'MM", { locale: vi });

    useEffect(() => {
        const fetchProduct = async () => {
            const db = getDatabase(app);
            const productRef = ref(db, `shope/products/${id}`);
            const snapshot = await get(productRef);
            if (snapshot.exists()) {
                setProduct(snapshot.val());
            } else {
                setProduct(null);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return (
            <div className="text-center text-gray-500">
                <Header />
                <div className="flex justify-center items-center mt-6 gap-2 ">
                    <div className="flex justify-center">
                        <ArrowPathIcon className="w-6 h-6" />
                    </div>
                    <div>Đang tải sản phẩm...</div>
                </div>
            </div>
        );
    }

    const originalPriceShipng = Number(product.shipPrice.replace(/\./g, ''));

    const originalPrice = Number(product.price.replace(/\./g, ''));
    const discountAmount = Math.floor((originalPrice * discountPercent) / 100);
    const finalPrice = originalPrice - discountAmount;
    const finalPriceSale = discountAmount + originalPriceShipng;

    const handleApplyVoucher = () => {
        const trimmedCode = voucherCode.trim().toLowerCase();
        if (voucherSale.hasOwnProperty(trimmedCode)) {
            setDiscountPercent(voucherSale[trimmedCode]);
            setVoucherCode('');
            notifySuccess();
            handleOk();
        } else {
            notifyError();
            setDiscountPercent(0);
        }
    };

    return (
        <div className="sm: w-full">
            <button onClick={handleBackHome} className="w-full flex items-center gap-2 p-3 border-b">
                <ArrowLeftIcon className="w-7 h-5 text-[#595959]" />
                <div className="text-xl">Thanh toán</div>
            </button>
            <div className="max-w-md mx-auto p-4">
                <ProductCardPayment product={product} />
                <VoucherModal
                    product={product}
                    voucherSale={voucherSale}
                    voucherCode={voucherCode}
                    setVoucherCode={setVoucherCode}
                    onApplyVoucher={handleApplyVoucher}
                    setDiscountPercent={setDiscountPercent}
                    toastSuccess={notifySuccess}
                    toastError={notifyError}
                />
                <div>
                    <div className="text-sm">
                        <div className="flex justify-between pb-4">
                            <div>Vận chuyển</div>
                            <div className="flex items-center gap-1">
                                <div className="text-xs">Xem tất cả</div>
                                <ChevronRightIcon className="w-3 h-3" />
                            </div>
                        </div>
                        <div className="p-4 border rounded bg-[#FAFAFA]">
                            <div className="flex justify-between text-xs">
                                <span>Nhanh</span>
                                <span className="">₫{originalPriceShipng.toLocaleString('vi-VN')}</span>
                            </div>
                            <div className="mt-1 text-xs">
                                <div className="flex items-center gap-1 py-1 text-[#25AA99]">
                                    <ShoppingCartIcon className="w-4 h-4" />
                                    <p>
                                        Đảm bảo nhận hàng từ{' '}
                                        <strong>
                                            {formatDate(startDate)} - {formatDate(endDate)}
                                        </strong>
                                    </p>
                                </div>
                                <div>
                                    Nhận Voucher trị giá <strong>₫15.000</strong> nếu đơn hàng được giao đến bạn sau
                                    ngày <strong>{formatDate(endDate)}</strong>.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#0000008A] text-xs py-4">
                        <p>Không đồng kiểm.</p>
                        <InformationCircleIcon className="w-4 h-4 " />
                    </div>
                </div>

                <div className="border-t py-4">
                    <div className="text-sm text-[#212121]">
                        <div className="flex justify-between">
                            <span>Tổng số tiền (1 sản phẩm)</span>
                            <span className="">₫{product.price}</span>
                        </div>
                    </div>
                </div>
                <button className="w-full flex py-2 justify-between" onClick={showModal}>
                    <span className="text-sm text-[#000000DE]">Platform Vouchers</span>
                    <div className="">
                        {discountAmount ? (
                            <div className="flex items-center gap-1">
                                <span className="text-red-500 border border-red-500 rounded-md p-1 text-xs">
                                    -₫{discountAmount.toLocaleString('vi-VN')}
                                </span>
                                <ChevronRightIcon className="w-3 h-3" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 text-[#BDBDBD]">
                                <span className="text-sm">Chọn hoặc nhập mã Voucher</span>
                                <ChevronRightIcon className="w-3 h-3" />
                            </div>
                        )}
                    </div>
                </button>
                <ToastContainer />
                <Modal
                    title={`${product.author} - AAR Voucher`}
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
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
                <div className="flex items-center justify-between mb-4 pt-3 mt-2 text-sm border-t">
                    <div className="flex items-center gap-1">
                        <CurrencyDollarIcon className="text-red-500 w-5 h-5" />
                        <p>Không thể sử dụng Xu</p>
                        <InformationCircleIcon className="w-4 h-4 " />
                    </div>
                </div>
                <div className="py-4 border-t space-y-3">
                    <div className="flex justify-between ">
                        <div className="text-sm">Phương thức thanh toán</div>
                        <div className="flex items-center gap-1">
                            <div className="text-xs">Xem tất cả</div>
                            <ChevronRightIcon className="w-3 h-3" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <CreditCardIcon className="w-5 h-5 text-red-500" />
                            <p className="text-xs">Thanh toán khi nhận hàng</p>
                        </div>
                        <CheckCircleIcon className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="h-5">
                            <img
                                className="h-full"
                                src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748574793/shopepay_dyzutw.png"
                                alt="shopepay"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <CreditCardIcon className="w-5 h-5 text-blue-500" />
                            <p className="text-xs">Thêm thẻ tin/Ghi nợ</p>
                        </div>
                        <button className="px-2 p-1 border border-gray-500 text-gray-500 text-xs rounded cursor-pointer">
                            Thêm
                        </button>
                    </div>
                </div>
                <div className="pt-3 border-t space-y-3">
                    <h3>Chi tiết thanh toán</h3>
                    <div className="flex items-center justify-between text-xs text-[#595959]">
                        <span>Tổng tiền hàng</span>
                        <span>₫{product.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#595959]">
                        <span>Tổng tiền phí vận chuyển</span>
                        <span>₫{originalPriceShipng.toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#595959]">
                        <span>Giảm giá phí vận chuyển</span>
                        <span className="text-[#EE4D2D]">-₫{originalPriceShipng.toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#595959]">
                        <span>Tổng cộng voucher giảm giá</span>
                        <span className="text-[#EE4D2D]">-₫{discountAmount.toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="bg-[#FAFAFA] p-2 text-xs text-[#595959]">
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopee
                    </div>
                    <div className="flex justify-end gap-3 border-t pt-3">
                        <div className="flex flex-col items-end justify-between text-xs text-[#212121]">
                            <p>
                                Tổng cộng{' '}
                                <span className="text-base text-[#EE4D2D]">₫{finalPrice.toLocaleString('vi-VN')}</span>
                            </p>
                            <p>
                                Tiết kiệm{' '}
                                <span className="text-[#EE4D2D]">₫{finalPriceSale.toLocaleString('vi-VN')}</span>
                            </p>
                        </div>
                        <div>
                            <button
                                onClick={handleOrder}
                                className="w-full px-6 py-3 bg-red-500 hover:bg-red-700 text-white text-sm rounded"
                            >
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
