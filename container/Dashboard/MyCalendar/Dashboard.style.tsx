import { createStyles } from "@mantine/core";

const useDashboardStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    wrapper: {
      display: "flex",
      flexDirection: "row",
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    linksWrapper: {
      paddingTop: "5rem"
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    navbar: {
        background: 'rgba(217, 217, 217, 0.8)',
        borderRadius: "25px",
        border: "none",
        boxShadow: "5px 0px 4px rgba(0, 0, 0, 0.15)",
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      margin: "1rem 0",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.lg,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.white,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.black,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.black })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.black,
          }).color,
        },
      },
    },
    title: {
      marginRight: 'auto',
    },
    navbarHeader: {
      paddingLeft: theme.spacing.xs,
      paddingRight: theme.spacing.xs,
      paddingBottom: theme.spacing.lg,
      borderBottom: `1px solid ${theme.colors.gray[2]}`,
    },
    headerMobile: {},
    eventTitle: {
      marginRight: 1
    }
  };
});

export default useDashboardStyles;