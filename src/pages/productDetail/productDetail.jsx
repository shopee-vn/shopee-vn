import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useParams, useNavigate } from 'react-router-dom';
import app from '../../firebaseConfig';
import { getDatabase, ref, set, get, push } from 'firebase/database';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import {
    ChevronRightIcon,
    ShoppingCartIcon,
    ShieldCheckIcon,
    ChevronDownIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { ProductList } from '../../components/layout/productList';
import { Footer } from '../../components/layout/footer';
import { Header } from '../../components/layout/header';

function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [expanded, setExpanded] = useState(false);

    let timmer = Math.floor(Math.random() * 10) + 1;
    const today = new Date();
    const startDate = addDays(today, 2);
    const endDate = addDays(today, 6);
    const formatDate = (date) => format(date, "d 'Th'MM", { locale: vi });

    const handleBuyProduct = () => {
        navigate(`/payment/${id}`);
    };

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

    return (
        <>
            <Header />
            <div className="max-w-4xl mx-auto px-4 pb-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        {Array.isArray(product?.imageList) && product.imageList.length > 0 && (
                            <Swiper
                                spaceBetween={10}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Thumbs]}
                                className="mb-4"
                            >
                                {product?.imageList?.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img.image}
                                            alt={`iPhone 16 Pro Max ${index + 1}`}
                                            className="w-full"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                        <div className="text-sm py-2">Màu sắc: Đen</div>
                        {Array.isArray(product?.imageList) && product.imageList.length > 0 && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={4}
                                slidesPerView={6}
                                watchSlidesProgress
                                className="rounded-md"
                            >
                                {product?.imageList?.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img.image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-16 object-cover rounded-md border hover:border-blue-500"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                        <div className="flex flex-wrap py-2 justify-between">
                            <div className="flex gap-2 items-end">
                                <div className="flex items-center">
                                    <p className="text-xs text-red-600 font-semibold">₫</p>
                                    <p className="text-xl text-red-600 font-semibold">{product.price}</p>
                                </div>
                                <div className="text-sm line-through text-gray-500">{product.oldPrice} ₫</div>
                            </div>
                            <div className="flex items-end">
                                <p className="text-sm">Đã bán {product.sold}k</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p className="text-xs py-1">Chỉ từ {product.spayLater}₫ x 12 tháng với 0% TRẢ GÓP</p>
                            <ChevronRightIcon className="w-3 h-3" />
                        </div>
                        <div className="mt-6">
                            <button onClick={handleBuyProduct} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white uppercase">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className=" space-y-2 text-sm text-gray-700">
                        <div className="flex gap-2">
                            <div>
                                <ShoppingCartIcon className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-4 justify-between">
                                <div>
                                    <p>
                                        Nhận từ {formatDate(startDate)} - {formatDate(endDate)}
                                    </p>
                                    <p>Miễn phí vận chuyển (Tặng Voucher ₫15.000 nếu đơn giao sau thời gian trên.)</p>
                                </div>
                                <div>
                                    <ChevronRightIcon className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div>
                                <ShieldCheckIcon className="w-4 h-4 text-red-400" />
                            </div>
                            <p>Trả hàng miễn phí 15 ngày - Chính hãng 100%</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6  border-t pt-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 pb-3">
                                <div>
                                    <img
                                        src={product.authorImage}
                                        alt="avatar"
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{product.author}</p>
                                    <p className=" text-gray-500 text-xs">Online {timmer} phút trước</p>
                                </div>
                            </div>
                            <div>
                                <button className="px-3 py-1 border border-red-600 text-red-600 hover:bg-red-100 text-sm">
                                    Xem Shop
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm text-gray-500">
                                <span className="text-red-500">{product.quantity} </span>
                                Sản phẩm
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="text-red-500">{product.rating} </span>
                                Đánh giá
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="text-red-500">100% </span>
                                Phản hồi Chat
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-3 bg-white overflow-hidden">
                    <div className="flex justify-between py-3 border-b text-sm">
                        <span className="text-black">Chi tiết sản phẩm</span>
                        <span className="text-gray-500">Kho, Thương hiệu &gt;</span>
                    </div>
                    <div className="py-3 text-sm text-gray-700">
                        <h3 className="font-medium mb-1">Mô tả sản phẩm</h3>
                        <div className={expanded ? '' : 'line-clamp-3'}>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="text-center py-2 border-t border-b">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex justify-center items-center w-full border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition mt-6 mb-4"
                        >
                            Xem Thêm
                            <ChevronDownIcon className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
            </div>
            <ProductList />
            <Footer />
        </>
    );
}

export default ProductDetail;
