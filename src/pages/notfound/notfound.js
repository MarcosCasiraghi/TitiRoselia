import Footer from "../../components/footer/footer";
import HeaderMenu from "../../components/header/header";
import styles from "./notfound.module.css"
import { useNavigate } from 'react-router-dom';


export default function NotFound() {
    const navigate = useNavigate()
    return (
      <div>
        <HeaderMenu/>
        <section className={styles.half_content}>
            <div className={styles.overlay}>
                <h1 className={styles.title}>Página no encontrada</h1>
                <div className={styles.button_container}>
                    <button variant='outline' className={styles.btn} onClick={() => navigate("/")}>Volver al inicio</button>
                </div>
            </div>  
        </section>
        <Footer/>
      </div>
    );
  }