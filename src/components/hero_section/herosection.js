import styles from './herosection.module.css';
import { useEffect, useState } from 'react';
import { IconChevronCompactDown } from "@tabler/icons-react";

function HeroSection() {
    const [opacity, setOpacity] = useState(1);
    const [showArrow, setShowArrow] = useState(true);
    const [showLogo, setShowLogo] = useState(true);

    // Opacity of logo
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(1 - scrollY / 300, 0);
            setOpacity(newOpacity);
            setShowArrow(scrollY < 100);
            // Hide logo completely when opacity reaches 0
            setShowLogo(newOpacity > 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollDown = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    return (
        <section className={styles.hero}>
            {showLogo && (
                <img
                    className={styles.logo}
                    src="/images/logo_con_fondo_1.png"
                    alt="Logo"
                    style={{ opacity: opacity }}
                />
            )}
            {showArrow && (
                <div className={styles.arrow} onClick={handleScrollDown}>
                    <IconChevronCompactDown size={55} stroke={1.5} />
                </div>
            )}
        </section>
    )
}

export default HeroSection;