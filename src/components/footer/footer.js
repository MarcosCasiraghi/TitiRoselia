import { IconBrandInstagram, IconBrandWhatsapp, IconMail } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import classes from './footer.module.css';
import '@mantine/core/styles.css';

export default function Footer() {
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
                    <ActionIcon size="lg" variant="subtle" className={classes.icon}>
                        <IconBrandWhatsapp size={23} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="subtle" className={classes.icon}>
                        <IconMail size={23} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="subtle" className={classes.icon}>
                        <IconBrandInstagram size={23} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}