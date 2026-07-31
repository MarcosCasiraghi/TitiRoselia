import { IconChevronDown } from '@tabler/icons-react';
import { Burger, Center, Container, Group, Menu, Text, Anchor, Drawer, Button, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import '@mantine/core/styles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { analytics } from '../../firebase/firebase';
import { logEvent } from 'firebase/analytics';
import { NAV_CATEGORIES } from '../../data/categories';


const links = [
    {
        label: 'Productos',
        links: [
            ...NAV_CATEGORIES.map(c => ({ link: `/productos?categoria=${c.slug}`, label: c.label })),
            { link: '/productos', label: 'Ver todo' }
        ],
    },
    {
        label: 'Sobre nosotros',
        link: '/',
        scrollTo: 'about-section'
    },
    {
        label: 'Cómo pedir',
        link: '/',
        scrollTo: 'como-pedir'
    }
];

export default function HeaderMenu() {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = useCallback((id, shouldClose = true) => {
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = document.querySelector(`.${classes.header}`)?.offsetHeight || 56; // Default height if not found
            const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Get absolute position
            window.scrollTo({ top: elementPosition - navbarHeight - 10, behavior: 'smooth' });
        }
        if( shouldClose) {
            close()
        }
    }, [close]);

    useEffect(() => {
        let timeoutId;
        if (location.state?.scrollTo) {
            timeoutId = setTimeout(() => {
                handleScroll(location.state.scrollTo, false);
            }, 300);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [location.state, handleScroll]);

    const desktopNavItems = links.map((link) => {
        if (link.links) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <Anchor
                            component="button"
                            type="button"
                            underline={false}
                            className={classes.link2} // Use the same class as other links
                        >
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                                <IconChevronDown className={classes.dropdown_arrow} size={14} stroke={1.5} />
                            </Center>
                        </Anchor>
                    </Menu.Target>
                    <Menu.Dropdown>
                        {link.links.map((item) => (
                            <Menu.Item
                                key={item.link}
                                onClick={() => window.location.href = item.link}
                                className={classes.link}
                            >
                                {item.label}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Anchor
                key={link.label}
                onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname === '/') {
                        handleScroll(link.scrollTo);
                    } else {
                        navigate('/');
                        setTimeout(() => handleScroll(link.scrollTo), 300);
                    }
                }}
                underline={false}
                className={classes.link2}>
                {link.label}
            </Anchor>
        );
    });

    const mobileNavItems = links.map((link) => {
        if (link.links) {
            return (
                <div key={link.label} className={classes.menuSection}>
                    <Text className={classes.menuTitle}>{link.label}</Text>
                    <div className={classes.subLinks}>
                        {link.links.map((item) => (
                            <Anchor key={item.link} href={item.link} className={classes.subLink}>
                                {item.label}
                            </Anchor>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <Anchor
                key={link.label}
                onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname === '/') {
                        navigate('/', { 
                            replace: true,
                            state: { scrollTo: link.scrollTo }
                        });
                    } else {
                        navigate('/');
                        setTimeout(() => handleScroll(link.scrollTo), 300);
                    }
                    close()
                }}
                underline={false}
                className={classes.link2}
            >
                {link.label}
            </Anchor>
        );
    });


    return (
        <header className={classes.header}>
            <Container size="md">
                <div className={classes.inner}>
                    <Group gap="md" visibleFrom="sm" className={classes.group}>
                        {desktopNavItems}
                    </Group>
                    <Link
                        to="/"
                        className={classes.logoContainer}
                        onClick={(e) => {
                            if (location.pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                    >
                        <img src="/images/only_logo_outline.png" alt="Logo_outline" className={classes.logo} />
                    </Link>
                    <Button 
                        component='a' 
                        href="https://wa.me/541138230020" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={classes.button}
                        onClick={() => {
                            logEvent(analytics, 'whatsapp_click', {
                                page_location: window.location.pathname
                            });
                        }}
                    >
                        ¡Contáctanos!
                    </Button>
                    <Burger className={classes.group} opened={opened} onClick={open} size="sm" hiddenFrom="sm" />

                    {/* Drawer */}
                    <Drawer opened={opened} onClose={close} size="75%" padding="md" title="Menú" position="left">
                        <ScrollArea style={{ height: '100%' }}>
                            <div className={classes.drawerContent}>
                                {mobileNavItems}
                            </div>
                        </ScrollArea>
                    </Drawer>
                </div>
            </Container>
        </header>
    );
}
