import { IconBrandInstagram, IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import classes from './footer.module.css';
import '@mantine/core/styles.css';
import { useMediaQuery } from "@mantine/hooks";

export default function Footer() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo_and_name}>
                    <img src="/images/only_logo_outline.png" alt="Logo_outline" className={classes.logo} />
                    <Text className={classes.icon}>
                        Titi Roselia
                    </Text>
                </div>
                <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
                    {
                        isMobile ?
                            <a href="mailto:titiroselia@gmail.com" target="_blank" rel="noopener noreferrer">
                                <ActionIcon size="lg" variant="subtle" className={classes.icon}>
                                    <IconMail size={23} stroke={1.5} />
                                </ActionIcon>
                            </a>
                            :
                            <span className={classes.icon} style={{paddingRight: "0.5rem"}}>
                                titiroselia@gmail.com
                            </span>
                    }
                    <a href="https://wa.me/541138230020" target="_blank" rel="noopener noreferrer">
                        <ActionIcon size="lg" variant="subtle" className={classes.icon}>
                            <IconBrandWhatsapp size={23} stroke={1.5} />
                        </ActionIcon>
                    </a>
                    <a href="https://instagram.com/titiroselia" target="_blank" rel="noopener noreferrer">
                        <ActionIcon size="lg" variant="subtle" className={classes.icon}>
                            <IconBrandInstagram size={23} stroke={1.5} />
                        </ActionIcon>
                    </a>
                </Group>
            </Container>
        </div>
    );
}