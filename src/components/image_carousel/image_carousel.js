import { Carousel } from '@mantine/carousel';
import { useEffect, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useMediaQuery } from "@mantine/hooks";
import '@mantine/carousel/styles.css';



// TODO add more photos or fix having to duplicate images
const carousel_images = [
    "/images/carousel_home/cheesecake_grande_chica.webp",
    "/images/carousel_home/chicas_cuatro.webp",
    "/images/carousel_home/carrot_cake_con_caja.webp",
    "/images/carousel_home/petit_four.webp",
    "/images/carousel_home/chocotorta_mitad.webp",
    "/images/carousel_home/minis_1.webp",
    "/images/carousel_home/pistacho_chica_mitad.webp",
    "/images/carousel_home/minis_2.webp",
    "/images/carousel_home/rogel.webp",
    "/images/carousel_home/minis_3.webp",
    "/images/carousel_home/rulos_ambas.webp",
    "/images/carousel_home/minis_4.webp",
    "/images/carousel_home/sablee_ambas.webp",
    "/images/carousel_home/lemonpie_con_caja.webp"
]

function ImageCarousel() {

    // Preloading carousel images for better loading
    useEffect(() => {
        carousel_images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    const autoplay = useRef(
        Autoplay({ 
            delay: 2000, 
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true
        })
    )

    useEffect(() => {
        setTimeout(() => {
            autoplay.current.play();
        }, 1000); // Delay autoplay start to allow rendering first
    }, []);


    const isMobile = useMediaQuery("(max-width: 768px)");
    const slideSize = isMobile ? "33.333333%" : "20%";
    const slideHeight = isMobile ? "150px" : "300px"


    return (
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
        >
            {carousel_images.map((src, index) => (
                <Carousel.Slide key={index}>
                    <picture>
                    <source srcSet={src} type="image/webp" />
                    <img
                        src={src.replace('.webp', '.jpg')}
                        alt={`Slide ${index + 1}`}
                        style={{ width: "100%", height: slideHeight, objectFit: "cover" }}
                        loading='lazy'
                        decoding="async"
                    />
                    </picture>
                </Carousel.Slide>
            ))}
        </Carousel>
    )
}

export default ImageCarousel;