import styles from './gabipili.module.css';
import { Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function GabiPili() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return isMobile ? (
        // Mobile Layout (Vertical)
        <div className={styles.about_us_mobile}>
            <div className={styles.image_container}>
                <img
                    src="/images/gabiypili_2.webp"
                    alt="gabiypili"
                    className={styles.image}
                />
            </div>
            <div className={styles.text_container}>
                <Text className={styles.description}>
                    Somos madre e hija, y aunque cada una de nosotras emprendió su propio camino en la cocina,
                    encontramos en Titi Roselia la oportunidad de fusionar nuestros conocimientos y disfrutar creando algo especial.
                    Cocinar juntas es nuestro refugio y una motivación diaria, donde una aporta la dedicación y
                    la prolijidad en cada detalle, mientras la otra suma dinamismo y practicidad para dar forma a cada creación.
                </Text>
                <br />
                <Text className={styles.description}>
                    Cada torta que elaboramos no es solo un postre, sino una experiencia que celebra los encuentros,
                    los recuerdos y el placer de disfrutar algo realmente rico. En Titi Roselia,
                    creemos que el verdadero lujo está en los detalles, en la calidad de los ingredientes,
                    en la perfección de cada textura y en la calidez de compartir algo especial con quienes más queremos.
                </Text>
            </div>
        </div>
    ) : (
        // Desktop Layout (Horizontal)
        <Grid justify='center' align='center' className={styles.about_us}>
            <Grid.Col span={5} className={styles.story}>
                <Text className={styles.description}>
                    Somos madre e hija, y aunque cada una de nosotras emprendió su propio camino en la cocina,
                    encontramos en Titi Roselia la oportunidad de fusionar nuestros conocimientos y disfrutar creando algo especial.
                    Cocinar juntas es nuestro refugio y una motivación diaria, donde una aporta la dedicación y
                    la prolijidad en cada detalle, mientras la otra suma dinamismo y practicidad para dar forma a cada creación.
                </Text>
                <br />
                <Text className={styles.description}>
                    Cada torta que elaboramos no es solo un postre, sino una experiencia que celebra los encuentros,
                    los recuerdos y el placer de disfrutar algo realmente rico. En Titi Roselia,
                    creemos que el verdadero lujo está en los detalles, en la calidad de los ingredientes,
                    en la perfección de cada textura y en la calidez de compartir algo especial con quienes más queremos.
                </Text>
            </Grid.Col>
            <Grid.Col span={5} className={styles.column}>
                <img
                    src="/images/gabiypili_2.webp"
                    alt="gabiypili"
                    className={styles.image}
                />
            </Grid.Col>
        </Grid>
    );
}

export default GabiPili;
