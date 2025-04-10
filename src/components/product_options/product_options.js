import styles from './product_options.module.css'
import { useNavigate } from 'react-router-dom';
import { Text } from "@mantine/core"

function ProductOptions() {
    const navigate = useNavigate()

    const handleClick = (category) => {
        if (category == null) {
            navigate('/productos/')
        } else {
            navigate(`/productos?categoria=${category}`)
        }
    }

    return (
        <section className={styles.half_content}>
            <div className={styles.overlay}>
                <Text className={styles.title}>¡Conocé nuestras tortas!</Text>
                <div className={styles.button_container}>
                    <button variant='outline' className={styles.btn} onClick={() => handleClick("grande")}>Grandes</button>
                    <button variant='outline' className={styles.btn} onClick={() => handleClick("chica")}>Chicas</button>
                    <button variant='outline' className={styles.btn} onClick={() => handleClick("mini")}>Minis</button>
                    <button variant='outline' className={styles.btn} onClick={() => handleClick()}>Ver todo</button>
                </div>
            </div>
        </section>
    )
}

export default ProductOptions;