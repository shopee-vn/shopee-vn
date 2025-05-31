    import { useEffect, useState } from 'react';
    import app from '../../../firebaseConfig';
    import { getDatabase, ref, set, get, push } from 'firebase/database';
    import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
    import { Link } from 'react-router-dom';

    function ProductList() {
        let [products, setProducts] = useState([]);

        useEffect(() => {
            const fetchdata = async () => {
                const db = getDatabase(app);
                const dbRef = ref(db, 'shope/products');
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const dataObj = snapshot.val();
                    const dataWithId = Object.keys(dataObj).map((key) => ({
                        id: key,
                        ...dataObj[key],
                    }));
                    setProducts(dataWithId);
                } else {
                    alert('error');
                }
            };
            fetchdata();
        }, []);

        return (
            <div className="bg-white p-4 rounded shadow max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-semibold text-[#EE4D2D]">GỢI Ý HÔM NAY</h2>
                    <div className="flex items-center gap-1">
                        <button className="text-xs text-gray-500 hover:text-red-500">Xem Thêm </button>
                        <ChevronRightIcon className="w-3 h-3" />
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                    {products.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="relative border rounded hover:shadow mb-2">
                            <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-2" />
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
                <button className="w-full flex justify-center items-center border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-50 transition mt-6 mb-4">
                    Xem thêm
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                </button>
            </div>
        );
    }

    export default ProductList;
