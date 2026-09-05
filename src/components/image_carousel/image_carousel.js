import { Carousel } from '@mantine/carousel';
import { useEffect, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useMediaQuery } from "@mantine/hooks";
import '@mantine/carousel/styles.css';

const carousel_images = [
    "/images/carousel_home/cheesecake_grande_chica.webp",
    "/images/carousel_home/chicas_cuatro.webp",
    "/images/carousel_home/carrot_cake_con_caja.webp",
    "/images/carousel_home/petit_four.webp",
    "/images/carousel_home/chocotorta_mitad.webp",
    "/images/carousel_home/minis_1.webp",
    "/images/carousel_home/pistacho_chica_mitad.webp",
    // "/images/carousel_home/minis_2.webp",
    "/images/carousel_home/rogel.webp",
    "/images/carousel_home/minis_3.webp",
    "/images/carousel_home/rulos_ambas.webp",
    "/images/carousel_home/minis_4.webp",
    "/images/carousel_home/sablee_ambas.webp",
    "/images/carousel_home/lemonpie_con_caja.webp"
]

function ImageCarousel() {
    const autoplay = useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true
        })
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            autoplay.current.play();
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const isMobile = useMediaQuery("(max-width: 768px)");
    const slideSize = isMobile ? "33.333333%" : "20%";
    const slideHeight = isMobile ? "150px" : "300px";

    return (
        <div>
            <Carousel
                slideGap="md"
                loop
                withControls={true}
                plugins={[autoplay.current]}
                slideSize={slideSize}
                align="start"
                containScroll="trimSnaps"
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.play}
                draggable={true}
                dragFree={false}
            >
                {carousel_images.map((src, index) => (
                    <Carousel.Slide key={index}>
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            width={620}
                            height={1100}
                            style={{
                                width: "100%",
                                height: slideHeight,
                                objectFit: "cover",
                                willChange: "transform" // Performance hint for animations
                            }}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "auto"}
                        />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageCarousel;