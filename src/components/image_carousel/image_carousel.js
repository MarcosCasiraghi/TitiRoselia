import { Carousel } from '@mantine/carousel';
import { useEffect, useRef, useState } from 'react';
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
    "/images/carousel_home/minis_2.webp",
    "/images/carousel_home/rogel.webp",
    "/images/carousel_home/minis_3.webp",
    "/images/carousel_home/rulos_ambas.webp",
    "/images/carousel_home/minis_4.webp",
    "/images/carousel_home/sablee_ambas.webp",
    "/images/carousel_home/lemonpie_con_caja.webp"
]

function ImageCarousel() {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedCount, setLoadedCount] = useState(0);
    const autoplay = useRef(
        Autoplay({ 
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true
        })
    );

    // Enhanced preloading with tracking
    useEffect(() => {
        let mounted = true;
        const totalImages = carousel_images.length;
        
        const preloadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    if (mounted) {
                        setLoadedCount(prev => {
                            const newCount = prev + 1;
                            if (newCount === totalImages) {
                                setImagesLoaded(true);
                            }
                            return newCount;
                        });
                    }
                    resolve();
                };
                img.onerror = reject;
                img.src = src;
            });
        };

        // Preload all images in parallel
        Promise.all(carousel_images.map(preloadImage))
            .then(() => {
                if (mounted) {
                    setImagesLoaded(true);
                }
            })
            .catch(error => {
                console.error("Error preloading images:", error);
                // Still set as loaded to not block the carousel
                if (mounted) {
                    setImagesLoaded(true);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    // Start autoplay only after images are loaded
    useEffect(() => {
        if (imagesLoaded) {
            // Small delay to ensure smooth start
            const timer = setTimeout(() => {
                autoplay.current.play();
            }, 500);
            
            return () => clearTimeout(timer);
        }
    }, [imagesLoaded]);

    const isMobile = useMediaQuery("(max-width: 768px)");
    const slideSize = isMobile ? "33.333333%" : "20%";
    const slideHeight = isMobile ? "150px" : "300px";

    return (
        <div>
            {!imagesLoaded && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '20px',
                    background: '#f5f5f5',
                    borderRadius: '4px',
                    marginBottom: '10px'
                }}>
                    Loading images... {Math.round((loadedCount / carousel_images.length) * 100)}%
                </div>
            )}
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
                        <picture>
                            <source srcSet={src} type="image/webp" />
                            <img
                                src={src.replace('.webp', '.jpg')}
                                alt={`Slide ${index + 1}`}
                                style={{ 
                                    width: "100%", 
                                    height: slideHeight, 
                                    objectFit: "cover",
                                    willChange: "transform" // Performance hint for animations
                                }}
                                loading="eager" // Changed from lazy to eager for carousel images
                                decoding="async"
                                fetchPriority="high"
                            />
                        </picture>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageCarousel;