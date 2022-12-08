import React from 'react';
import { IconAdjustments, IconAffiliate, IconCalendar, IconDogBowl, IconHome, IconUsers } from '@tabler/icons';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import Link from 'next/link';
import useDashboardStyles from "../../container/Dashboard/Dashboard.style";
import { useRouter } from 'next/router';


interface MainLinkProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

function MainLink({ icon, title, link }: MainLinkProps) {

  const { classes, cx } = useDashboardStyles();
  const router = useRouter();

  return (
    <Link
    href={link}
    className={cx(classes.link, { [classes.linkActive]: link === router.asPath })}>
      <UnstyledButton>
        <Group>
          <ThemeIcon color='violet' variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{title}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const data = [
  {
    title: "Accueil",
    link: "/dashboard",
    icon: <IconHome />,
  },
  {
    title: "Mon Calendrier",
    link: "/dashboard/my-calendar",
    icon: <IconCalendar />,
  },
  {
    title: "Mes employés",
    link: "/dashboard/my-employees",
    icon: <IconUsers />,
  },
  {
    title: "Mes centres",
    link: "/dashboard/my-centers",
    icon: <IconAffiliate />,
  },
  {
    title: "Chiens",
    link: "/dashboard/dogs",
    icon: <IconDogBowl />
  },
  {
    title: "Mon profil",
    link: "/dashboard/my-profile",
    icon: <IconAdjustments />,
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.title} />);
  return <div>{links}</div>;
}