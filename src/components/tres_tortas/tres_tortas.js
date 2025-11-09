import styles from './tres_tortas.module.css'
import { Grid, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';


function TresTortas() {
    const tortas = [
        {
            name: 'Havanette',
            image: '/images/tres_tortas/havanette.webp',
            link: '/productos/havanette_grande'
        },
        {
            name: 'Tarta de Frutillas',
            image: '/images/tres_tortas/frutillas.webp',
            link: '/productos/tarta_de_frutilla'
        },
        {
            name: 'Torta Vasca',
            image: '/images/tres_tortas/vasca.webp',
            link: '/productos/torta_vasca'
        }
    ];

    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.container}>
            <div className={styles.title_overlay}>
                <Text className={styles.title}>Descubrí nuestras <i>nuevas</i> tortas!</Text>
            </div>
            {isMobile ? (
                /* MOBILE: Carousel */
                <Carousel
                    withIndicators
                    loop
                    slideSize="100%"
                    slideGap="md"
                    align="center"
                    className={styles.carousel}
                >
                    {tortas.map((torta, index) => (
                        <Carousel.Slide key={index}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={torta.image}
                                    alt={torta.name}
                                    className={styles.image}
                                />
                                <div className={styles.overlay}>
                                    <button
                                        className={styles.btn}
                                        onClick={() => navigate(torta.link)}
                                    >
                                        {torta.name}
                                    </button>
                                </div>
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            ) : (
                /* DESKTOP / TABLET: original Grid */
                <Grid gutter={0}>
                    {tortas.map((torta, index) => (
                        <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={torta.image}
                                    alt={torta.name}
                                    className={styles.image}
                                />
                                <div className={styles.overlay}>
                                    <button
                                        className={styles.btn}
                                        onClick={() => navigate(torta.link)}
                                    >
                                        {torta.name}
                                    </button>
                                </div>
                            </div>
                        </Grid.Col>
                    ))}
                </Grid>
            )}
        </div>
    );
}

export default TresTortas;