import { useRouter } from "next/router";
import { AppShell, Burger, Header, MediaQuery } from "@mantine/core";
import MyCalendar from "../../container/Dashboard/MyCalendar/MyCalendar";
import MyCenters from "../../container/Dashboard/MyCenters/MyCenters";
import MyEmployees from "../../container/Dashboard/MyEmployees/MyEmployees";
import MyProfile from "../../container/Dashboard/MyProfile/MyProfile";
import Error from "next/error";
import { NavbarCustom } from "../../components/Navbar/NavbarCustom";
import { useState } from "react";
import { NavbarHeader } from "../../components/Navbar/NavbarHeader";
import HomeDashboard from "../../container/Dashboard/HomeDashboard/HomeDashboard";
import { withData } from "../../helpers/restrictions";
import { UserInterface } from "../../interfaces/User.interface";

const Dashboard = ({ user } : { user: UserInterface }) => {
  const [opened, setOpened] = useState(false);

  const router = useRouter();
  const { query } = router;

  const displayComponent = () => {
    if (query.tab && query.tab[0] && !query.tab[1]) {
      switch (query.tab[0]) {
        case "my-calendar":
          return <MyCalendar />;
        case "my-employees":
          return <MyEmployees />;
        case "my-centers":
          return <MyCenters />;
        case "my-profile":
          return <MyProfile />;
        default:
          return <Error statusCode={404} title="Page non trouvé" />;
      }
    } else {
      return <HomeDashboard />
    }
  };

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<NavbarCustom opened={opened} user={user} />}
      header={
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Header height={{ base: 70, sm: 0 }} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />

              <NavbarHeader source="header" />
            </div>
          </Header>
        </MediaQuery>
      }
    >
      {displayComponent()}
    </AppShell>
  );
};

Dashboard.getInitialProps = async (ctx: any) => {
  const { user } = await withData(ctx)

  return { user }
};

export default Dashboard;
