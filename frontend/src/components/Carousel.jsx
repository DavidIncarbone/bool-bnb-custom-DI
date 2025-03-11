import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = ({ cardShow, data, CardComponent, cardProps }) => {
    const swiperRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.update(); // Forza l'aggiornamento se i dati cambiano
        }
    }, [data]);

    // Funzioni per fermare e riavviare autoplay
    const handleMouseEnter = () => {
        if (swiperRef.current && swiperRef.current.swiper?.autoplay) {
            swiperRef.current.swiper.autoplay.stop();
        }
    };

    const handleMouseLeave = () => {
        if (swiperRef.current && swiperRef.current.swiper?.autoplay) {
            swiperRef.current.swiper.autoplay.start();
        }
    };

    return (
        <div 
            style={{ position: 'relative', width: '100%', margin: '0 auto' }}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <Swiper
                ref={swiperRef}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                navigation={true}
                pagination={{ clickable: true }}
                spaceBetween={50}
                slidesPerView={cardShow}
                modules={[Navigation, Pagination, Autoplay]}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <CardComponent apartment={item} {...cardProps} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Stili inline per le frecce */}
            <style>
                {`
                    .swiper-button-next, .swiper-button-prev {
                         background: rgba(198, 166, 100, 0.8);
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        justify-content: center;
                        box-shadow: 0 4px 6px rgba(46, 53, 50, 0.2);
                        right: -25;
                        trasnform: translateX(50%);
                        z-index: 10;
                    }
                    .swiper-button-next::after, .swiper-button-prev::after {
                        font-size: 20px;
                        color: white;
                    }
                    .swiper-pagination {
    bottom: 0px !important;
    display: inline-flex; /* Usa inline-flex per centrare solo il contenuto */
    justify-content: center; /* Centra gli indicatori orizzontalmente */
    gap: 10px; /* Se necessario, imposta uno spazio tra gli indicatori */
}


                    .swiper-pagination-bullet {
                        background: rgba(0, 0, 0, 1);
                        width: 20px;
                        height: 20px;
                        position: relative;
                    }
                    .swiper-pagination-bullet-active {
                        background: #C6A664;
                    }
                `}
            </style>
        </div>
    );
};

export default Carousel;
