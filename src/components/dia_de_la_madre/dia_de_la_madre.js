import styles from './dia_de_la_madre.module.css';
import { useNavigate } from 'react-router-dom';
import { Text } from "@mantine/core"

function DiaDeLaMadre() {
    const navigate = useNavigate();

    return (
        <section className={styles.half_content}>
            <div className={styles.overlay}>
                <Text className={styles.title}>¡Especial día de la <span style={{ fontStyle: 'italic' }}>Madre</span>!</Text>
                <div className={styles.button_container}>
                    <button variant='outline' className={styles.btn} onClick={() => navigate('/productos?categoria=dia-de-la-madre')}>Ver Caja</button>
                </div>
            </div>
        </section>
    )
}

export default DiaDeLaMadre;