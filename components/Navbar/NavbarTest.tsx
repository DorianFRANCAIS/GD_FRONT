import Link from 'next/link';
import { useState } from 'react';
import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Container,
  Paper,
  Navbar,
} from "@mantine/core";
import { MainLinks } from './MainLink';
import { User } from './User';
import { Header } from './Header';

const useStyles = createStyles(() => ({

}));

interface MainLinkProps {
  opened: boolean;
}

export const NavbarTest = ( { opened }: MainLinkProps ) => {
  const [active, setActive] = useState(false);
  const { classes } = useStyles();

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ base: 100, sm: 200, lg: 300, }} height='100vh' p="xs">
      <Navbar.Section><Header /></Navbar.Section>
      <Navbar.Section grow mt="md"><MainLinks /></Navbar.Section>
      <Navbar.Section><User /></Navbar.Section>
    </Navbar>
  );
};