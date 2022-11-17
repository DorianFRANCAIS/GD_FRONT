import { useRouter } from "next/router"
import Link from 'next/link';
import Image from "next/image";
import { Navbar } from "@mantine/core";
import MyCalendar from "../../container/Dashboard/MyCalendar/MyCalendar";
import MyCenters from "../../container/Dashboard/MyCenters/MyCenters";
import MyEmployees from "../../container/Dashboard/MyEmployees/MyEmployees";
import MyProfile from "../../container/Dashboard/MyProfile/MyProfile";
import Error from "next/error";
import { IconHome, IconCalendar, IconAffiliate, IconSettings, IconUsers, IconAdjustments, IconLogout } from '@tabler/icons'
import useDashboardStyles from "../../container/Dashboard/Dashboard.style";

const mockLinks = [
  {
    title: "Accueil",
    link: "/dashboard",
    icon: IconHome,
  },
  {
    title: "Mon Calendrier",
    link: "/dashboard/my-calendar",
    icon: IconCalendar,
  },
  {
    title: "Mes employés",
    link: "/dashboard/my-employees",
    icon: IconUsers,
  },
  {
    title: "Mes centres",
    link: "/dashboard/my-centers",
    icon: IconAffiliate,
  },
  {
    title: "Mon profil",
    link: "/dashboard/my-profile",
    icon: IconAdjustments,
  },
];

const Dashboard = () => {

    const router = useRouter();
    const { query } = router;
    const { classes, cx } = useDashboardStyles();

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
      } 
    }

    const links = mockLinks.map((item, index) => {
      return (
        <a 
          className={cx(classes.link, { [classes.linkActive]: item.link === router.asPath })}
          href={item.link}
          key={item.title}
          onClick={() => {
            router.push(item.link)
          }}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <label>{item.title}</label>
        </a>
      )
    })

  return (
    <div className={classes.wrapper}>
      <Navbar height="100vh" sx={{
        background: "#9F72BF",
        borderRadius: "1.5rem"
      }} width={{ sm: 300 }} p="md">
        <Navbar.Section grow>
            <Link href='/'>
              <Image src="/Hard-A-ware_logo.png" style={{ borderRadius: "1rem" }} height={45} width={45} alt="header-logo" />
            </Link>
            <div className={classes.linksWrapper}>
              {links}
            </div>
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>

            <a className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Déconnexion</span>
            </a>
          </Navbar.Section>
        </Navbar>
        <div>
          {displayComponent()}
        </div>
    </div>
  )
}

// Dashboard.getInitialProps = async (ctx : any) => {

// }

export default Dashboard