import styles from './dia_de_la_madre.module.css';
import { useNavigate } from 'react-router-dom';
import { Text } from "@mantine/core"

function DiaDeLaMadre() {
    const navigate = useNavigate();

    return (
        <section className={styles.half_content}>
            <div className={styles.overlay}>
                <Text className={styles.title}>¡Especial <span style={{ fontStyle: 'italic' }}>día de la Madre</span>!</Text>
                <Text className={styles.colaboracion}>Titi Roselia & Barbara Soldati</Text>
                <div className={styles.button_container}>
                    <button variant='outline' className={styles.btn} onClick={() => navigate('/productos?categoria=dia-de-la-madre')}>Ver Cajas</button>
                </div>
            </div>
        </section>
    )
}

export default DiaDeLaMadre;