import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { ProductList } from '../../components/layout/productList';

function SearchResult({ product }) {
    const filterBar = [
        {
            title: 'Liên quan ',
            active: true,
            icon: false,
        },
        {
            title: '|',
            active: false,
            icon: false,
        },
        {
            title: 'Mới nhất',
            active: false,
            icon: false,
        },
        {
            title: '|',
            active: false,
            icon: false,
        },
        {
            title: 'Bán chạy',
            active: false,
            icon: false,
        },
        {
            title: '|',
            active: false,
            icon: false,
        },
        {
            title: 'Giá',
            active: false,
            icon: true,
        },
    ];

    const navbar = ['Hoả tốc', 'Shopee Mall', 'Shop yêu thích', "Miễn phí vận chuyển", 'Đánh giá'];

    return (
        <>
            {product && product.length > 0 ? (
                <>
                    <div className="border-b border-gray-200 p-4">
                        <div className="flex items-center justify-between text-sm pb-3">
                            {filterBar.map((item, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center gap-1 pb-2 text-sm ${
                                        item.active
                                            ? 'text-orange-500 border-b-2 border-orange-500'
                                            : 'text-[#0000008A] hover:text-gray-500'
                                    }`}
                                >
                                    {item.title}
                                    {item.icon ? <ChevronDownIcon className="w-3 h-3" /> : <></>}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {navbar.map((item, index) => (
                                <button
                                    key={index}
                                    className="flex items-center border text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-1">
                        {product.map((product) => (
                            <Link
                                to={`/product/${product.id}`}
                                key={product.id}
                                className="relative border rounded hover:shadow mb-2"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-contain mb-2"
                                />
                                <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-1 rounded">
                                    {product.discount}
                                </span>
                                <div className="p-2">
                                    <h3 className="text-xs font-medium line-clamp-2">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-2 flex-wrap">
                                        <div className="flex items-center">
                                            <p className="text-[#EE4D2D] text-[10px]">₫</p>
                                            <p className="text-[#EE4D2D] text-base">{product.price}</p>
                                        </div>
                                        <p className="text-xs">Đã bán {product.sold}k</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="pt-7 px-4 pb-4 flex items-center gap-2 text-[#EE4D2D] text-base">
                        <ExclamationTriangleIcon className="w-6 h-6" />
                        <div>Không tìm thấy sản phẩm mà bạn yêu cầu</div>
                    </div>
                    <ProductList />
                </>
            )}
        </>
    );
}

export default SearchResult;
