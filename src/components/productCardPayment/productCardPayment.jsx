import React from 'react';

function ProductCardPayment(props) {
    const priceRandom = Math.floor(Math.random() * 200) + 10;

    return (
        <div className="mb-4">
            <div className="flex gap-2 pb-3">
                <div className="flex items-center px-1 py-1 bg-red-600 text-white text-xs">Shopee Mall</div>
                <div className="flex items-center">{props.product.author}</div>
            </div>
            <div>
                <div className="">
                    <div className="flex gap-4 mb-3">
                        <div className="w-20 h-20">
                            <img
                                src={props.product.image}
                                alt={props.product.name}
                                className="w-full h-full object-cover border rounded"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <div>
                                <h2 className="text-xs text-[#595959]">{props.product.name}</h2>
                                <p className="text-xs text-[#999999]">Màu: {props.product.color}</p>
                            </div>
                            <div className="flex items-end gap-1 h-full">
                                <span className="text-sm text-red-600">₫</span>
                                <span className=" text-red-600 text-sm">{props.product.price}</span>
                                <span className="line-through text-sm text-gray-500">{props.product.oldPrice}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 flex gap-2 bg-[#FAFAFA]">
                        <div>
                            <input type="checkbox" id="insurance" />
                        </div>
                        <div className="w-full">
                            <div className="w-full flex justify-between">
                                <span htmlFor="insurance" className="text-sm text-gray-600">
                                    Bảo hiểm sản phẩm nâng cao
                                </span>
                                <div className="text-sm text-red-400">
                                    <span>₫</span>
                                    <span>{priceRandom}.999</span>
                                </div>
                            </div>
                            <div className="text-xs text-[#999999]">
                                Bảo vệ toàn diện sản phẩm của bạn trước những thiệt hại do sự cố, tiếp xúc với chất lỏng
                                và mất cắp/mất trộm.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCardPayment;
