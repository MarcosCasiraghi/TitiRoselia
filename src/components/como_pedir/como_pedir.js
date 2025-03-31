import styles from './como_pedir.module.css'
import { Grid, Text, Button, Image } from '@mantine/core';
import { IconBrandWhatsapp } from '@tabler/icons-react';


function ComoPedir() {
    return (
        <Grid justify='center' align='stretch' className={styles.content} id="como-pedir">
            <Grid.Col span={5} className={styles.seperate}>
                <div>
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
                <Text className={styles.hint}>
                    Consulta por opciones sin TACC
                </Text>
            </Grid.Col>
            <Grid.Col span={5} justify="center" align="center">
                <Image
                    src="/images/tres_chicas.webp"
                    h={400}
                    w={300}
                />
            </Grid.Col>
        </Grid>
    )
}

export default ComoPedir;