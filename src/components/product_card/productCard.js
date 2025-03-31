import { AspectRatio, Card, Image, Text } from '@mantine/core';
import classes from './productCard.module.css';

function ProductCard({ title, image1, image2, price }) {
    return (
        <Card
            key={title}
            p="md"
            radius="md"
            className={classes.card}
        >
            <div className={classes.imageContainer}>
                <AspectRatio ratio={1 / 1}>
                    <Image src={image1} className={classes.image} />
                    <Image src={image2} className={classes.imageNew} />
                </AspectRatio>
            </div>
            <Text mt={5} size='lg'>
                {title}
            </Text>
            <Text className={classes.text} size="md" tt="uppercase" fw={700} mt="md">
                {price}
            </Text>
        </Card>
    );
}

export default ProductCard;
