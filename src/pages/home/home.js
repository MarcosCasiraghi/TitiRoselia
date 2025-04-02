import React, { useEffect } from 'react';
import styles from './home.module.css';
import HeaderMenu from '../../components/header/header';
import '@mantine/core/styles.css';
// import { useMediaQuery } from "@mantine/hooks";
import Footer from '../../components/footer/footer';
import HeroSection from '../../components/hero_section/herosection';
import ProductOptions from '../../components/product_options/product_options';
import InfiniteSlide from '../../components/infinite_slide/infinite_slide';
import ImageCarousel from '../../components/image_carousel/image_carousel';
import TitiRosa from '../../components/titirosa/titirosa';
import GabiPili from '../../components/gabipili/gabipili';
import ComoPedir from '../../components/como_pedir/como_pedir';



function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.home_container}>
            <HeroSection />
            <div>
                <HeaderMenu />

                <ProductOptions />

                <InfiniteSlide />

                <ImageCarousel />

                <TitiRosa />

                <GabiPili />

                <ComoPedir/>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
