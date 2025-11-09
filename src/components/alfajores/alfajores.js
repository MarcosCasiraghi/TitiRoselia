import styles from './alfajores.module.css'
import { useNavigate } from 'react-router-dom';
import { Text } from "@mantine/core"

function Alfajores() {
    const navigate = useNavigate()

    return (
        <section className={styles.half_content}>
            <div className={styles.overlay}>
                <Text className={styles.title}>¡Probá nuestros alfajores!</Text>
                <div className={styles.button_container}>
                    <button variant='outline' className={styles.btn} onClick={() => navigate('/productos?categoria=alfajores')}>Ver Alfajores</button>
                </div>
            </div>
        </section>
    )
}

export default Alfajores;