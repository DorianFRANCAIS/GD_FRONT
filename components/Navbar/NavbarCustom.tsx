import { useState } from "react";
import { Navbar, MediaQuery } from "@mantine/core";
import { MainLinks } from "./MainLink";
import { User } from "./User";
import { NavbarHeader } from "./NavbarHeader";
import { UserInterface } from "../../interfaces/User.interface";

interface MainLinkProps {
  opened: boolean;
  user: UserInterface
}

export const NavbarCustom = ({ opened, user }: MainLinkProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section>
          <NavbarHeader source="navbar" />
        </Navbar.Section>
      </MediaQuery>
      <Navbar.Section grow mt="md">
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User user={user} />
      </Navbar.Section>
    </Navbar>
  );
};
