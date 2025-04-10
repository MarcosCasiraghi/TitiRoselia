import styles from './herosection.module.css';
import { useEffect, useState, useRef } from 'react';
import { IconChevronCompactDown } from "@tabler/icons-react";

function HeroSection() {
    const [opacity, setOpacity] = useState(1);
    const [showArrow, setShowArrow] = useState(true);
    const [showLogo, setShowLogo] = useState(true);
    const scrollRef = useRef(null);

    // Opacity of logo
    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const newOpacity = Math.max(1 - scrollY / 300, 0);
                    
                    // Immediately hide logo when opacity is very low
                    if (newOpacity < 0.1) {
                        setShowLogo(false);
                    } else {
                        setShowLogo(true);
                        setOpacity(newOpacity);
                    }
                    
                    setShowArrow(scrollY < 100);
                    ticking = false;
                });
                
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        
        // Initial check
        handleScroll();

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