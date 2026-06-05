import styles from './alfajoresMundial.module.css';
import { useNavigate } from 'react-router-dom';

function AlfajoresMundial() {
    const navigate = useNavigate();

    return (
        <section className={styles.section}>
            <div className={styles.card}>
                <div className={styles.topStripe}></div>
                <div className={styles.cardContent}>
                    <div className={styles.stars}>★ ★ ★</div>
                    <h2 className={styles.title}>¡Alfajores del Mundial!</h2>
                    <button className={styles.btn} onClick={() => navigate('/productos/alfajores-mundial')}>
                        Ver Alfajores
                    </button>
                </div>
            </div>
        </section>
    );
}

export default AlfajoresMundial;
