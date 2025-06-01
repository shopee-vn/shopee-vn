import { Routes, Route } from 'react-router-dom';
import { Cart } from './pages/cart';
import Home from './pages/home/home';
import PageError from './pages/pageError/pageError';
import { Payment } from './pages/payment';
import { SearchResult } from './pages/searchResult';
import { ProductDetail } from './pages/productDetail';

import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set, get, push } from 'firebase/database';
import app from './firebaseConfig';
import { useEffect, useState } from 'react';
import { PaymentSuccess } from './components/paymentSuccess';
import { ScrollToTop } from './components/scrollToTop';
import { Login } from './pages/login';
import { Register } from './pages/register';

function App() {

    const products = [
        {
            name: 'Keo Tản Nhiệt CPU MX4 (20g / 8g / 4g)',
            price: '38.000',
            oldPrice: '48.000',
            shipPrice: '19.456',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925073/image-1_slofek.webp',
            sold: '3,3',
            discount: '-46%',
            quantity: '260',
            author: 'Tran Doan Store',
            color: 'Đen',
            authorImage:
                'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363512/Ch%E1%BB%8B_thu%E1%BA%ADn_nwitxu.png',
            rating: '4.8',
            spayLater: '1.200',
            description:
                'Keo tản nhiệt cao cấp cho CPU-GPU  MX-4 dạng Xilanh,Dung tích 4G làm mát hiệu quả cao Lưu ý:Quý khách hàng lựa chọn theo phân loại gồm 3 Model: Loại dung tích 20Gram-8Gram và 4Gram Keo tản nhiệt Arctic MX-4, một loại keo tản nhiệt được sử dụng rộng rãi trong ngành công nghiệp máy tính và điện tử để tăng cường khả năng dẫn nhiệt giữa các bộ phận như CPU và GPU với bộ tản nhiệt. Đây là một sản phẩm của hãng Arctic, nổi tiếng với các giải pháp làm mát hiệu quả.Đặc điểm của sản phẩm: - Tên sản phẩm: Arctic MX-4 Thermal Compound - Dung tích: Có nhiều lựa chọn dung tích như 20g, 8g, và 4g.- Chức năng chính: Cải thiện khả năng dẫn nhiệt giữa các bề mặt tiếp xúc. - Dạng sản phẩm: Ống tiêm tiện lợi, dễ dàng bơm keo lên bề mặt cần thiết',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925073/image-1_slofek.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251153/keo-tan-nhiet-2_ikzuzz.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251153/keo-tan-nhiet-4_oxpbne.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251152/keo-tan-nhiet-3_wlgcee.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251151/keo-tan-nhiet-1_yb0jv7.webp',
                },
            ],
        },
        {
            name: 'Đồ Bộ Mặc Nhà Hai Dây Quần Đùi Lụa Satin Hisexy MS12',
            price: '89.000',
            oldPrice: '125.000',
            shipPrice: '16.875',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925073/image-6_tcyymt.webp',
            sold: '8,9',
            discount: '-36%',
            quantity: '220',
            author: 'Hoang Soi Store',
            color: 'Trắng',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363511/2_b8tor0.png',
            rating: '4.9',
            spayLater: '8.000',
            description: 'Đồ Ngủ Mặc Nhà Bộ Đồ Ngủ Hisexy Lụa Satin, 100% Made in Việt Nam, Chất liệu: lụa hàn mềm mịn, tạo cảm giác thoải mái dễ chịu cho làn da người phụ nữ. Với chất liệu lụa hàn mềm mịn kết hợp với ren xẻ tinh tế không chỉ tạo cảm giác thoải mái, mát mẻ cho người mặc mà còn tạo lên sự khuyến rũ cho người phụ nữ hiện đại. Hỗ trợ đổi hàng trong 7 ngày nếu hàng không đúng chất liệu hoặc không như hình. ',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925073/image-6_tcyymt.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251204/quan-ao-nu-4_so12p2.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251202/quan-ao-nu-3_sm7ldy.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251200/quan-ao-nu-2_tqxxjq.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251200/quan-ao-nu-1_c9gajl.webp',
                },
            ],
        },
        {
            name: 'Điện thoại Apple iPhone 16 Pro Max 512GB',
            price: '38.290.000',
            oldPrice: '40.000.000',
            shipPrice: '26.800',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925073/iphone-3_mks4ks.webp',
            sold: '10,9',
            discount: '-7%',
            quantity: '89',
            author: 'Hoang Ha Mobile',
            color: 'Vàng',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363511/1_dheely.png',
            rating: '4.9',
            spayLater: '2.300.000',
            description: 'iPhone 16 Pro Max. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro. - THIẾT KẾ TITAN TUYỆT ĐẸP – iPhone 16 Pro Max có thiết kế titan nhẹ và cứng cáp với màn hình Super Retina XDR 6,9 inch lớn hơn. Thiết bị bền bỉ tuyệt vời với chất liệu Ceramic Shield thế hệ mới nhất, bền chắc gấp 2 lần mặt kính các điện thoại thông minh khác - NẮM TOÀN QUYỀN ĐIỀU KHIỂN CAMERA – Điều Khiển Camera giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn, như thu phóng hoặc độ sâu trường ảnh, nhờ vậy bạn có thể chụp ảnh hoàn hảo siêu nhanh',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925073/iphone-3_mks4ks.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251131/iphone-1_aode91.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251131/iphone-2_yf3kzc.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-3_rfecte.webpp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-d_zkjou2.webp',
                },
            ],
        },
        {
            name: 'Điện thoại Apple iPhone 16 128GB',
            price: '21.490.000',
            oldPrice: '23.999.000',
            shipPrice: '14.900',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
            sold: '4,3',
            discount: '-10%',
            quantity: '198',
            author: 'One Mobile',
            color: 'Bạc',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363511/2_b8tor0.png',
            rating: '4.8',
            spayLater: '1.200.000',
            description: 'iPhone 16. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro. - THIẾT KẾ TITAN TUYỆT ĐẸP – iPhone 16 Pro Max có thiết kế titan nhẹ và cứng cáp với màn hình Super Retina XDR 6,9 inch lớn hơn. Thiết bị bền bỉ tuyệt vời với chất liệu Ceramic Shield thế hệ mới nhất, bền chắc gấp 2 lần mặt kính các điện thoại thông minh khác - NẮM TOÀN QUYỀN ĐIỀU KHIỂN CAMERA – Điều Khiển Camera giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn, như thu phóng hoặc độ sâu trường ảnh, nhờ vậy bạn có thể chụp ảnh hoàn hảo siêu nhanh',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-c_fhsfag.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-a_sxtdki.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-b_zpgfg8.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-d_zkjou2.webp',
                },
            ],
        },
        {
            name: 'iPhone 15 Pro Max 256GB Chính Hãng VN/A',
            price: '29.590.000',
            oldPrice: '40.000.000',
            shipPrice: '34.241',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
            sold: '8,9',
            discount: '-32%',
            quantity: '106',
            author: 'Mobile City',
            color: 'Đen',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363511/1_dheely.png',
            rating: '4.9',
            spayLater: '1.400.000',
            description: 'iPhone 15 Pro Max. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro. - THIẾT KẾ TITAN TUYỆT ĐẸP – iPhone 16 Pro Max có thiết kế titan nhẹ và cứng cáp với màn hình Super Retina XDR 6,9 inch lớn hơn. Thiết bị bền bỉ tuyệt vời với chất liệu Ceramic Shield thế hệ mới nhất, bền chắc gấp 2 lần mặt kính các điện thoại thông minh khác - NẮM TOÀN QUYỀN ĐIỀU KHIỂN CAMERA – Điều Khiển Camera giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn, như thu phóng hoặc độ sâu trường ảnh, nhờ vậy bạn có thể chụp ảnh hoàn hảo siêu nhanh',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251131/iphone-1_aode91.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251131/iphone-2_yf3kzc.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-3_rfecte.webpp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-d_zkjou2.webp',
                },
            ],
        },
        {
            name: 'Điện thoại Apple iPhone 16 256GB',
            price: '23.490.000',
            oldPrice: '25.999.000',
            shipPrice: '32.684',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
            sold: '1,3',
            discount: '-10%',
            quantity: '118',
            author: 'Ha Com',
            color: 'Trắng',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363511/1_dheely.png',
            rating: '4.9',
            spayLater: '1.200.000',
            description: 'iPhone 16. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro. - THIẾT KẾ TITAN TUYỆT ĐẸP – iPhone 16 Pro Max có thiết kế titan nhẹ và cứng cáp với màn hình Super Retina XDR 6,9 inch lớn hơn. Thiết bị bền bỉ tuyệt vời với chất liệu Ceramic Shield thế hệ mới nhất, bền chắc gấp 2 lần mặt kính các điện thoại thông minh khác - NẮM TOÀN QUYỀN ĐIỀU KHIỂN CAMERA – Điều Khiển Camera giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn, như thu phóng hoặc độ sâu trường ảnh, nhờ vậy bạn có thể chụp ảnh hoàn hảo siêu nhanh',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-c_fhsfag.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-a_sxtdki.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-b_zpgfg8.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-d_zkjou2.webp',
                },
            ],
        },
        {
            name: 'iPhone 16 Pro Max 512GB Chính Hãng VN/A',
            price: '33.590.000',
            oldPrice: '47.999.000',
            shipPrice: '46.251',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
            sold: '3,3',
            discount: '-32%',
            quantity: '198',
            author: 'The Gioi Di Dong',
            color: 'Vàng',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363512/Ch%E1%BB%8B_thu%E1%BA%ADn_nwitxu.png',
            rating: '5.0',
            spayLater: '2.400.000',
            description: 'iPhone 16 Pro Max. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro. - THIẾT KẾ TITAN TUYỆT ĐẸP – iPhone 16 Pro Max có thiết kế titan nhẹ và cứng cáp với màn hình Super Retina XDR 6,9 inch lớn hơn. Thiết bị bền bỉ tuyệt vời với chất liệu Ceramic Shield thế hệ mới nhất, bền chắc gấp 2 lần mặt kính các điện thoại thông minh khác - NẮM TOÀN QUYỀN ĐIỀU KHIỂN CAMERA – Điều Khiển Camera giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn, như thu phóng hoặc độ sâu trường ảnh, nhờ vậy bạn có thể chụp ảnh hoàn hảo siêu nhanh',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-c_fhsfag.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-a_sxtdki.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-b_zpgfg8.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-d_zkjou2.webp',
                },
            ],
        },
        {
            name: 'Bộ Đồ Nữ Thể Thao Họa Tiết Thêu Ngực Chất Liệu Cotton Co Giãn 4 Chiều',
            price: '135.000',
            oldPrice: '300.000',
            shipPrice: '13.660',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/image-5_bxlcvr.webp',
            sold: '28,6',
            discount: '-55%',
            quantity: '89',
            author: 'Ha My Store',
            color: 'Bạc',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363511/2_b8tor0.png',
            rating: '4.7',
            spayLater: '10.000',
            description: 'Đồ Ngủ Mặc Nhà Bộ Đồ Ngủ Hisexy Lụa Satin, 100% Made in Việt Nam, Chất liệu: lụa hàn mềm mịn, tạo cảm giác thoải mái dễ chịu cho làn da người phụ nữ. Với chất liệu lụa hàn mềm mịn kết hợp với ren xẻ tinh tế không chỉ tạo cảm giác thoải mái, mát mẻ cho người mặc mà còn tạo lên sự khuyến rũ cho người phụ nữ hiện đại. Hỗ trợ đổi hàng trong 7 ngày nếu hàng không đúng chất liệu hoặc không như hình. ',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/image-5_bxlcvr.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252546/ao-theu-1_qdhizq.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252563/ao-theu-4_csp9sh.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252559/ao-theu-2_ovuii0.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252561/ao-theu-3_mhhfst.webp',
                },
            ],
        },
        {
            name: 'iPhone 16 Pro Max 512GB Chính Hãng VN/A',
            price: '31.590.000',
            oldPrice: '45.999.000',
            shipPrice: '32.563',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
            sold: '6,3',
            discount: '-32%',
            quantity: '198',
            author: 'The Gioi Di Dong',
            color: 'Đen',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363511/2_b8tor0.png',
            rating: '4.9',
            spayLater: '2.300.000',
            description: 'iPhone 16 Pro Max. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro. - THIẾT KẾ TITAN TUYỆT ĐẸP – iPhone 16 Pro Max có thiết kế titan nhẹ và cứng cáp với màn hình Super Retina XDR 6,9 inch lớn hơn. Thiết bị bền bỉ tuyệt vời với chất liệu Ceramic Shield thế hệ mới nhất, bền chắc gấp 2 lần mặt kính các điện thoại thông minh khác - NẮM TOÀN QUYỀN ĐIỀU KHIỂN CAMERA – Điều Khiển Camera giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn, như thu phóng hoặc độ sâu trường ảnh, nhờ vậy bạn có thể chụp ảnh hoàn hảo siêu nhanh',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-c_fhsfag.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-a_sxtdki.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-b_zpgfg8.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-d_zkjou2.webp',
                },
            ],
        },
        {
            name: 'Áo Tay Hến Cộc Khuy Bấm - Quần Sóoc',
            price: '199.999',
            oldPrice: '260.000',
            shipPrice: '21.452',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/image-8_dqr6im.webp',
            sold: '38,1',
            discount: '-23%',
            quantity: '130',
            author: 'Quanh Dev Store',
            color: 'Trắng',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363512/Ch%E1%BB%8B_thu%E1%BA%ADn_nwitxu.png',
            rating: '4.9',
            spayLater: '15.000',
            description: 'Đồ Ngủ Mặc Nhà Bộ Đồ Ngủ Hisexy Lụa Satin, 100% Made in Việt Nam, Chất liệu: lụa hàn mềm mịn, tạo cảm giác thoải mái dễ chịu cho làn da người phụ nữ. Với chất liệu lụa hàn mềm mịn kết hợp với ren xẻ tinh tế không chỉ tạo cảm giác thoải mái, mát mẻ cho người mặc mà còn tạo lên sự khuyến rũ cho người phụ nữ hiện đại. Hỗ trợ đổi hàng trong 7 ngày nếu hàng không đúng chất liệu hoặc không như hình. ',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/image-8_dqr6im.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252546/ao-theu-1_qdhizq.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252563/ao-theu-4_csp9sh.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252559/ao-theu-2_ovuii0.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748252561/ao-theu-3_mhhfst.webp',
                },
            ],
        },
        {
            name: 'iPhone 15 Pro Max 128GB Chính Hãng VN/A',
            price: '26.590.000',
            oldPrice: '39.999.000',
            shipPrice: '32.863',
            image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
            sold: '9,3',
            discount: '-32%',
            quantity: '118',
            author: 'The Gioi Di Dong',
            color: 'Vàng',
            authorImage: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748363512/Ch%E1%BB%8B_thu%E1%BA%ADn_nwitxu.png',
            rating: '4.9',
            spayLater: '2.400.000',
            description: 'iPhone 16 Pro Max. Sở hữu thiết kế titan tuyệt đẹp. Điều Khiển Camera. 4K Dolby Vision tốc độ 120 fps. Và chip A18 Pro. - THIẾT KẾ TITAN TUYỆT ĐẸP – iPhone 16 Pro Max có thiết kế titan nhẹ và cứng cáp với màn hình Super Retina XDR 6,9 inch lớn hơn. Thiết bị bền bỉ tuyệt vời với chất liệu Ceramic Shield thế hệ mới nhất, bền chắc gấp 2 lần mặt kính các điện thoại thông minh khác - NẮM TOÀN QUYỀN ĐIỀU KHIỂN CAMERA – Điều Khiển Camera giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn, như thu phóng hoặc độ sâu trường ảnh, nhờ vậy bạn có thể chụp ảnh hoàn hảo siêu nhanh',
            imageList: [
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747925074/iphone-5_naq8yo.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-c_fhsfag.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-a_sxtdki.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251132/iphone-16-b_zpgfg8.webp',
                },
                {
                    image: 'https://res.cloudinary.com/dlpgjjkfj/image/upload/v1748251133/iphone-16-d_zkjou2.webp',
                },
            ],
        },
    ];

    const uploadProducts = () => {
        const db = getDatabase(app);
        const productsRef = ref(db, 'shope/products');

        const data = {};
        products.forEach((product, index) => {
            const id = uuidv4();
            data[id] = product;
        });

        set(productsRef, data)
            .then(() => {
                console.log('Dữ liệu đã được thêm thành công!');
            })
            .catch((error) => {
                console.error('Lỗi khi thêm dữ liệu: ', error);
            });
    };

    // uploadProducts();

    return (
        <>
        <ScrollToTop />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/paymentSuccess" element={<PaymentSuccess />} />
            <Route path="/searchResult" element={<SearchResult />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageError />} />
        </Routes>
        </>
    );
}

export default App;
