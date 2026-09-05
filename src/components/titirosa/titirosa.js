import styles from './titirosa.module.css'
import { Grid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function TitiRosa() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return isMobile ? (
        <div className={styles.historyMobile} id='about-section'>
            <div className={styles.image_container}>
                <img src="/images/abuelas.webp" alt="abuelas" width={633} height={394} loading="lazy" className={styles.abuelas} />
                <Text className={styles.text_left}>Titi</Text>
                <Text className={styles.text_right}>Rosa</Text>
            </div>
            <div className={styles.text_container}>
                <Text className={styles.title}>Nuestra historia</Text>
                <Text className={styles.description}>
                    Titi Roselia nace de nuestra pasión por la cocina y los momentos compartidos en familia.
                    Mi mamá, Gabi, creció rodeada de aromas dulces y recetas heredadas de sus abuelas, Titi y Rosa,
                    quienes hacían de cada comida un gesto de amor. Esa misma pasión se convirtió
                    en el motor de este proyecto, donde juntas buscamos llevar ese amor a cada mesa, ofreciendo pastelería con el sabor de lo hecho en casa.
                </Text>
            </div>
        </div>
    ) : (
        <Grid className={styles.history} justify="center" align='center' id='about-section' >
            <Grid.Col className={styles.column} span={5} sm={12}>
                <div className={styles.image_container}>
                    <img src="/images/abuelas.webp" alt="abuelas" width={633} height={394} loading="lazy" className={styles.abuelas} />
                    <Text className={styles.text_left}>Titi</Text>
                    <Text className={styles.text_right}>Rosa</Text>
                </div>
            </Grid.Col>
            <Grid.Col className={styles.column} span={4} sm={12}>
                <Text className={styles.title}>
                    Nuestra historia
                </Text>
                <Text className={styles.description}>
                    Titi Roselia nace de nuestra pasión por la cocina y los momentos compartidos en familia.
                    Mi mamá, Gabi, creció rodeada de aromas dulces y recetas heredadas de sus abuelas, Titi y Rosa,
                    quienes hacían de cada comida un gesto de amor. Esa misma pasión se convirtió
                    en el motor de este proyecto, donde juntas buscamos llevar ese amor a cada mesa, ofreciendo pastelería con el sabor de lo hecho en casa.
                </Text>
            </Grid.Col>
        </Grid >
    )
}

export default TitiRosa;