import React, { useEffect, useState } from 'react';
import styles from './navidad.module.css';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


// Image list from public/images/navidad

const desktop_images = [
    '/images/navidad/desktop_four.webp',
    '/images/navidad/pavlova.webp',
    '/images/navidad/merry_choco.webp',
    '/images/navidad/chocodream.webp',
]

const mobile_images = [
    '/images/navidad/mobile_four.webp',
    '/images/navidad/pavlova.webp',
    '/images/navidad/merry_choco.webp',
    '/images/navidad/snowberry.webp',
    '/images/navidad/chocodream.webp',
]

function Navidad() {
    const navigate = useNavigate()

    // Pick images depending on screen size
    const [images, setImages] = useState(
        window.matchMedia("(max-width: 720px)").matches
            ? mobile_images
            : desktop_images
    );

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className={styles.wrapper} aria-label="Navidad en Titi Roselia">
            <div className={styles.overlay} />
            {images.map((src, i) => (
                <div
                    key={i}
                    className={`${styles.slide} ${i === index ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${src})` }}
                    aria-hidden={i === index ? 'false' : 'true'}
                />
            ))}

            <div className={styles.content}>
                <Text className={styles.title}>¡Llegó la Navidad a Titi Roselia!</Text>
                <button variant="outline" className={styles.btn} onClick={() => navigate("/productos?categoria=navidad")}>Ver tortas</button>
            </div>
        </section>
    );
}

export default Navidad;

