import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

function index() {
    return (
        <div className='w-full max-w-screen-xl mx-auto'>
        <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            pagination={{
                dynamicBullets: true,
            }}
            loop={true}
            className="mySwiper"
        >
            <SwiperSlide>
                <img
                    src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747732446/image-1_o74ypw.jpg"
                    alt="Banner-shope"
                    className=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747732448/image-2_zioihk.jpg"
                    alt="Banner-shope"
                    className=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747732447/image-4_coqjnp.png"
                    alt="Banner-shope"
                    className=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747732447/image-5_qymdkg.png"
                    alt="Banner-shope"
                    className=""
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://res.cloudinary.com/dlpgjjkfj/image/upload/v1747732446/image-3_yfvz8p.jpg"
                    alt="Banner-shope"
                    className=""
                />
            </SwiperSlide>
        </Swiper>
        </div>
    );
}

export default index;
