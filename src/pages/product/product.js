import styles from './product.module.css'
import { useEffect, useState } from "react";
import { useLocation, useParams, Link, Navigate } from "react-router-dom";
import { getProductById } from "../../firebase/firestore/firebase_products.js"
import HeaderMenu from "../../components/header/header.js";
import Footer from "../../components/footer/footer.js";
import { Container, Grid, Text, Title, Loader, Card, Box, List, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { IconBrandWhatsapp } from '@tabler/icons-react';


const categoryToTitle = new Map([
    ["grande", "Tortas Grandes"],
    ["chica", "Tortas Chicas"],
    ["mini", "Tortas minis"],
    ["navidad", "Especial Navidad"],
    ["dia-de-la-madre", "Especial Día de la Madre"],
    ["alfajores", "Alfajores"]
])

function Product() {

    const isMobile = useMediaQuery("(max-width: 768px)");
    const slideHeight = isMobile ? "500px" : "400px"

    const { productId } = useParams();

    const { state } = useLocation()
    const [product, setProduct] = useState(state?.productItem || null);
    const [loading, setLoading] = useState(false);

    const [link, setLink] = useState("")

    // For mini options
    const [middleIndex, setMiddleIndex] = useState(null)
    const [firstCol, setFirstCol] = useState(null)
    const [secondCol, setSecondCol] = useState(null)

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (state?.productItem) {
            setProduct(state.productItem)
            setupProductData(state.productItem)
        }
        else {
            setLoading(true);
            getProductById(productId)
                .then((data) => {
                    if (!data) {
                        setNotFound(true);
                    } else {
                        setProduct(data);
                        setupProductData(data);
                    }
                    setLoading(false);
                })
        }
    }, [state, productId]);

    function setupProductData(data) {
        if (data.category === "mini" || data.category === "dia-de-la-madre") {
            const lines = data.options.split("\\n").filter((line) => line.trim() !== "");
            const midIndex = Math.ceil(lines.length / 2);
            setMiddleIndex(midIndex);
            setFirstCol(lines.slice(0, midIndex));
            setSecondCol(lines.slice(midIndex));
        }
        if (data.category === "alfajores") {
            const lines = data.options?.split("\\n").filter((line) => line.trim() !== "");
            setFirstCol(lines);
        }
        const text = `Hola! Quiero pedir una ${data.name}`;
        setLink(`https://wa.me/541138230020?text=` + encodeURIComponent(text));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (notFound) {
        return <Navigate to="/not-found" replace />;
    }

    if (loading) {
        return (
            <div className={styles.full_size}>
                <HeaderMenu />
                <Container className="flex justify-center items-center h-screen">
                    <Loader size="lg" />
                </Container>
                <Footer />
            </div>
        );
    }

    const isDiaDeLaMadre = (name) => {
        console.log(name)
        return name.includes("día de la madre")
    }

    return (
        <div className={styles.full_size}>
            <HeaderMenu />
            <Container className={styles.product_container}>
                {product && (
                    <>
                        {/* Breadcrumb */}
                        <Text className={styles.breadcrumb}>
                            <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
                            {" > "}
                            <Link to={`/productos?categoria=${product.category}`} className={styles.breadcrumbLink}>
                                {categoryToTitle.get(product.category)}
                            </Link>
                        </Text>
                        <Grid gutter="xl" className="mt-10" justify="center">
                            {isMobile ? (
                                <>
                                    {/* Full Width Image Carousel on Mobile */}
                                    <Grid.Col span={12}>
                                        <Carousel withIndicators loop>
                                            {product.images.map((image, index) => (
                                                <Carousel.Slide key={index}>
                                                    <img src={image} alt={`Product ${index}`} style={{ width: "100%", height: slideHeight, objectFit: "cover" }} />
                                                </Carousel.Slide>
                                            ))}
                                        </Carousel>
                                    </Grid.Col>

                                    {/* Full Width Product Info on Mobile */}
                                    <Grid.Col span={12}>
                                        <Card padding="lg" radius="md" className={styles.product_information}>
                                            <Title order={2}>{product.name}</Title>
                                            <Text size="md">{product.size}</Text>
                                            <br />
                                            <Text size="xl" className={styles.price_text} weight={700}>
                                                {!isDiaDeLaMadre(product.name) ? "$" + product.price : "SIN STOCK"}
                                            </Text>
                                            <br />
                                            <Text size="lg" className="mt-4">{product.description}</Text>
                                            <br />
                                            {(product.category === "mini" || product.category === "dia-de-la-madre") && (
                                                <>
                                                    <Box style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                                        {/* First Column */}
                                                        <List>
                                                            {firstCol && firstCol.length > 0 &&
                                                                firstCol.map((line, index) => {
                                                                    if (product.category === "dia-de-la-madre" && line.startsWith("Torta de 10cm a elección")) {
                                                                        const [main, extra] = line.split(" (ver opciones)");
                                                                        return (
                                                                            <List.Item key={index} >
                                                                                <span>{main.trim()} (</span>
                                                                                <Link to="/productos?categoria=chica" className={styles.optionsLink} style={{ fontSize: "1rem" }}>
                                                                                    ver opciones
                                                                                </Link>
                                                                                <span>)</span>
                                                                            </List.Item>
                                                                        );
                                                                    } else {
                                                                        return <List.Item key={index}>{line}</List.Item>;
                                                                    }
                                                                })
                                                            }
                                                            {secondCol && secondCol.length > 0 &&
                                                                secondCol.map((line, index) => (
                                                                    <List.Item key={index + middleIndex}>{line}</List.Item>
                                                                ))
                                                            }
                                                        </List>
                                                    </Box>
                                                    <br />
                                                </>
                                            )}
                                            {product.category === "alfajores" && (
                                                <>
                                                    <List>
                                                        {firstCol && firstCol.length > 0 &&
                                                            firstCol.map((line, index) => (
                                                                <List.Item key={index}>{line}</List.Item>
                                                            ))
                                                        }
                                                    </List>
                                                    <br />
                                                </>
                                            )}
                                            {
                                                product.category !== "dia-de-la-madre" &&
                                                <Button className={styles.contact_button} rightSection={<IconBrandWhatsapp size={20} />} component='a' href={link} target="_blank" rel="noopener noreferrer">
                                                    ¡Pedí ahora!
                                                </Button>
                                            }

                                        </Card>
                                    </Grid.Col>
                                </>
                            ) : (
                                <>
                                    {/* Left Side: Carousel (1/3 of the screen) */}
                                    <Grid.Col span={4}>
                                        <Carousel withIndicators loop>
                                            {product.images.map((image, index) => (
                                                <Carousel.Slide key={index}>
                                                    <img src={image} alt={`Product ${index}`} style={{ width: "100%", height: slideHeight, objectFit: "cover" }} />
                                                </Carousel.Slide>
                                            ))}
                                        </Carousel>
                                    </Grid.Col>

                                    {/* Right Side: Product Info (2/3 of the screen) */}
                                    <Grid.Col span={8}>
                                        <Card padding="lg" radius="md" className={styles.product_information}>
                                            <Title order={1}>{product.name}</Title>
                                            <Text size="md">{product.size}</Text>
                                            <br />
                                            <Text size="xl" className={styles.price_text} weight={700}>
                                                {!isDiaDeLaMadre(product.name) ? "$" + product.price : "SIN STOCK"}
                                            </Text>
                                            <br />
                                            <Text size="lg" className="mt-4">{product.description}</Text>
                                            <br />
                                            {(product.category === "mini" || product.category === "dia-de-la-madre") && (
                                                <>
                                                    <Box style={{ display: "flex", gap: "2rem" }}>
                                                        {/* First Column */}
                                                        <List style={{ width: "50%" }}>
                                                            {firstCol && firstCol.length > 0 &&
                                                                firstCol.map((line, index) => {
                                                                    if (
                                                                        product.category === "dia-de-la-madre" &&
                                                                        line.trim().startsWith("Torta de 10cm a elección") &&
                                                                        line.includes("(ver opciones)")
                                                                    ) {
                                                                        const [main, extra] = line.split("(ver opciones)");
                                                                        return (
                                                                            <List.Item key={index}>
                                                                                <span>{main.trim()}</span>
                                                                                <br />
                                                                                <span>(</span>
                                                                                <Link to="/productos?categoria=chica" className={styles.optionsLink} style={{ fontSize: "1rem" }}>
                                                                                    ver opciones
                                                                                </Link>
                                                                                <span>)</span>
                                                                            </List.Item>
                                                                        );
                                                                    } else {
                                                                        return <List.Item key={index}>{line}</List.Item>;
                                                                    }
                                                                })
                                                            }
                                                        </List>

                                                        {/* Second Column */}
                                                        <List style={{ width: "50%" }}>
                                                            {secondCol && secondCol.length > 0 &&
                                                                secondCol.map((line, index) => (
                                                                    <List.Item key={index + middleIndex}>{line}</List.Item>
                                                                ))}
                                                        </List>
                                                    </Box>
                                                    <br />
                                                </>
                                            )}
                                            {product.category === "alfajores" && (
                                                <>
                                                    <List>
                                                        {firstCol && firstCol.length > 0 &&
                                                            firstCol.map((line, index) => (
                                                                <List.Item key={index}>{line}</List.Item>
                                                            ))
                                                        }
                                                    </List>
                                                    <br />
                                                </>
                                            )}
                                            {
                                                product.category !== "dia-de-la-madre" &&
                                                <Button className={styles.contact_button} rightSection={<IconBrandWhatsapp size={20} />} component='a' href={link} target="_blank" rel="noopener noreferrer">
                                                    ¡Pedí ahora!
                                                </Button>
                                            }
                                        </Card>
                                    </Grid.Col>
                                </>
                            )}
                        </Grid>
                    </>
                )}
            </Container>
            <Footer />
        </div >
    )
}

export default Product