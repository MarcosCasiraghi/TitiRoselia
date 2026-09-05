import styles from './como_pedir.module.css'
import { Grid, Text, Button, Image } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { Carousel } from '@mantine/carousel';


function ComoPedir() {

    const isMobile = useMediaQuery('(max-width: 768px)');

    if (isMobile) {
        return (
            <div className={styles.mobileContent} id="como-pedir">
                <Text className={styles.title}>¿Cómo pedir?</Text>
                <Text className={styles.hint}>
                    ¡Escribinos al Whatsapp y dejanos saber que torta queres!
                </Text>

                <Button
                    className={styles.contact_button}
                    // fullWidth
                    size="md"
                    rightSection={<IconBrandWhatsapp size={20} color='#201b5b' />}
                    component='a'
                    href="https://wa.me/541138230020"
                    target="_blank"
                    mt="md"
                    mb="xl"
                >
                    <Text className={styles.button_text}>Escribir al Whatsapp</Text>
                </Button>

                <Carousel 
                    withIndicators 
                    slideSize="80%" 
                    slideGap="md" 
                    loop
                >
                    <Carousel.Slide>
                        <Image src="/images/tres_chicas.webp" loading="lazy" className={styles.mobileImage} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src="/images/chocotorta_chica.webp" loading="lazy" className={styles.mobileImage} />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image src="/images/dos_chicas.webp" loading="lazy" className={styles.mobileImage} />
                    </Carousel.Slide>
                </Carousel>

                <Text className={styles.hint} mt="md">
                    Pedí con al menos 48 horas de anticipación
                </Text>
                <Text className={styles.hint} mt="xs">
                    Consulta por opciones sin TACC
                </Text>
            </div>
        );
    }

    return (
        <Grid justify='center' align='stretch' className={styles.content} id="como-pedir">
            <Grid.Col span={4} className={styles.centered}>
                <div className={styles.slightly_up}>
                    <Text className={styles.title}>
                        ¿Como pedir?
                    </Text>
                    <br />
                    <Text className={styles.hint}>
                        ¡Escribinos al Whatsapp y dejanos saber que torta queres!
                    </Text>
                    <br />
                    <Button
                        className={styles.contact_button}
                        rightSection={<IconBrandWhatsapp size={20} color='#201b5b' />}
                        component='a'
                        href="https://wa.me/541138230020"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Text className={styles.button_text}>
                            Escribir al Whatsapp
                        </Text>
                    </Button>
                </div>
            </Grid.Col>
            <Grid.Col span={5} className={styles.masonry}>
                <div className={styles.masonry_container}>
                    <div className={styles.column}>
                        <Image src="/images/tres_chicas.webp" loading="lazy" className={styles.image} />
                        <Image src="/images/chocotorta_chica.webp" loading="lazy" className={styles.image} />
                    </div>
                    <div className={styles.centered}>
                        <Text className={styles.hint}>
                            Pedí con al menos 48 horas de anticipación
                        </Text>
                        <br />
                        <Image src="/images/dos_chicas.webp" loading="lazy" className={styles.image} />
                        <br />
                        <Text className={styles.hint}>
                            Consulta por opciones sin TACC
                        </Text>
                    </div>
                </div>
            </Grid.Col>
        </Grid>
    )
}

export default ComoPedir;