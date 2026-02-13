import styles from './lima_maracuya.module.css'
import { Grid, Text, Group, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';


function LimaMaracuya() {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const autoplay = useRef(Autoplay({ delay: 4000 }));

    const mobileImages = [
        '/images/lima_maracuya/lime_maracuya_mobile.webp',
        '/images/lima_maracuya/lime_maracuya_mobile_2.webp',
        '/images/lima_maracuya/lime_maracuya_mobile_3.webp',
        '/images/lima_maracuya/lime_maracuya_mobile_4.webp',
    ];

    return (
        <div className={styles.container}>

            {isMobile ? (
                <div className={styles.mobileWrapper}>
                    <Carousel
                        loop
                        align="center"
                        withControls={false}
                        className={styles.carousel}
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.play}
                        onMouseLeave={autoplay.current.play}
                    >
                        {mobileImages.map((src, index) => (
                            <Carousel.Slide key={index}>
                                <img
                                    src={src}
                                    alt={`Lima y Maracuya ${index + 1}`}
                                    className={styles.image}
                                />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                    <div className={styles.mobileOverlay}>
                        <Text className={styles.title}><b>Conocé nuestras <br/> nuevas tortas</b></Text>
                        <Group justify="center" gap="xs">
                            <button className={styles.btn} onClick={() => navigate('/productos/key-lime-pie')}>Key Lime Pie</button>
                            <button className={styles.btn} onClick={() => navigate('/productos/cheesecake-de-maracuya')}>Cheesecake de Maracuyá</button>
                        </Group>
                    </div>
                </div>
            ) : (
                <div className={styles.desktopWrapper}>
                    <img
                        src="/images/lima_maracuya/lime_maracuya_desktop.webp"
                        alt="Lima y Maracuya"
                        className={styles.image}
                    />
                    <div className={styles.overlay}>
                        <Text className={styles.title}><b>Conocé nuestras nuevas tortas</b></Text>
                        <Group justify="center" gap="md" mt="md">
                            <button className={styles.btn} onClick={() => navigate('/productos/key-lime-pie')}>Key Lime Pie</button>
                            <button className={styles.btn} onClick={() => navigate('/productos/cheesecake-de-maracuya')}>Cheesecake de Maracuyá</button>
                        </Group>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LimaMaracuya;