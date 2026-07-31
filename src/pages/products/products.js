import '@mantine/core/styles.css';
import HeaderMenu from '../../components/header/header';
import styles from './products.module.css';
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllProducts, getByCategory } from "../../firebase/firestore/firebase_products.js"
import ProductCard from '../../components/product_card/productCard.js';
import { Container, SimpleGrid, Skeleton, Text } from '@mantine/core';
import Footer from '../../components/footer/footer.js';
import { useMediaQuery } from "@mantine/hooks";
import { categoryToTitle, DISABLED_CATEGORIES } from "../../data/categories";

function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("categoria");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const [opened, setOpened] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");


  useEffect(() => {
    setLoading(true)

    if (DISABLED_CATEGORIES.includes(category)) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let fetchProducts;

    if (category === "grande") {
      fetchProducts = Promise.all([
        getByCategory("grande"),
        getByCategory("navidad")
      ]).then(([grandes, navidad]) => [...grandes, ...navidad]); // navidad ultimo
    } else {
      fetchProducts = category && category.trim() !== ""
        ? getByCategory(category)
        : getAllProducts();
    }

    fetchProducts.then((data) => {

      let ordered = [...data];

      const inStock = ordered.filter(p => p.outOfStock !== true);
      const outOfStock = ordered.filter(p => p.outOfStock === true);

      ordered = [...inStock, ...outOfStock];

      setProducts(ordered);
      setLoading(false);
    });

  }, [category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDiaDeLaMadre = (name) => {
    return name.includes("día de la madre")
  }

  // useEffect(() => {
  //   const hasSeenPromo = sessionStorage.getItem("seenMothersDayPromo");

  //   if (category !== "dia-de-la-madre" && !hasSeenPromo) {
  //     const timer = setTimeout(() => {
  //       setOpened(true);
  //       sessionStorage.setItem("seenMothersDayPromo", "true");
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   } else {
  //     sessionStorage.setItem("seenMothersDayPromo", "true");
  //   }
  // }, [category]);

  return (
    <div className={styles.full_size}>
      <HeaderMenu />
      <Container className={styles.container}>
        <div className={styles.title_holder}>
          <Text size='xl' className={styles.title}>
            {categoryToTitle.get(category) || "Nuestros Productos"}
          </Text>
        </div>
        {category === "dia-de-la-madre" &&
          <>
            <Text>Colaboración con las flores de Barbara Soldati</Text>
          </>
        }

        <Container py="xl" size='lg' fluid className={styles.product_content}>
          <SimpleGrid
            cols={isMobile ? 1 : 3}
            spacing="md"
          >
            {loading ?
              Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} className={styles.skeleton} height={360} radius="md" />
              ))
              : (
                products.length > 0 ?
                  products.map(product =>
                    <Link to={`/productos/${product.id}`} state={{ productItem: product }} style={{ textDecoration: 'none' }} key={product.id}>
                      <ProductCard
                        title={product.name}
                        image1={product.image1}
                        image2={product.image2}
                        price={product.outOfStock ? "SIN STOCK" : "$" + product.price}
                      />
                    </Link>
                  ) : (
                    <p>No hay productos en esta categoría.</p>
                  ))}
          </SimpleGrid>
        </Container>
      </Container>
      <Footer />

      {/* <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        withCloseButton={false}
        size="xl"
        classNames={{
          content: styles.modalContent, // whole modal box
          header: styles.modalHeader,   // header wrapper (where close button sits)
          close: styles.modalClose,     // close button
          body: styles.modalBody        // wrapper of your custom body
        }}
      >
        <div className={styles.modalInner}>
          <button className={styles.modalCustomClose} onClick={() => setOpened(false)}>
            ✕
          </button>

          <div className={styles.modalImage} />

          <div className={styles.modalText}>
            <Text size="xl" mb="md" className={styles.modalTitle}>
              Box desayuno + Ramo de flores = El regalo ideal para Mamá
            </Text>
            <Text size="md" mb="lg" className={styles.modalDescription}>
              ¡No te quedes sin tu caja especial para regalar en el Día de la Madre!
            </Text>
            <span className={styles.modalLimitedEdition}>Stock limitado</span>
            <br/>
            <Button
              fullWidth
              className={styles.modalButton}
              onClick={() => {
                setOpened(false);
                window.location.href = "/productos?categoria=dia-de-la-madre";
              }}
            >
              Ver Cajas
            </Button>
          </div>
        </div>
      </Modal> */}


    </div>
  );
}

export default Products
