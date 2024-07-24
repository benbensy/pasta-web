import { Stack, Link, Image } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png'

function MenuLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link as={NavLink} to={to} fontWeight="500" color="blue.500" fontSize='large'>
      {children}
    </Link>
  );
}

export function AppMenu() {
  return (
    <Stack direction="row" spacing={4}>
      <MenuLink to="/">{<Image boxSize={20} src={logo} />}</MenuLink>
      <MenuLink to="/">New</MenuLink>
      <MenuLink to="/list">List</MenuLink>
      <MenuLink to="/guide">Guide</MenuLink>
      <MenuLink to="/history">History</MenuLink>
    </Stack>
  );
}
