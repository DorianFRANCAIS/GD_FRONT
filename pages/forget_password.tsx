import { useState } from "react";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconCheck } from "@tabler/icons";
import Router from "next/router";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

const ForgetPassword = () => {
  const { classes } = useStyles();
  const [showNotification, setShowNotification] = useState(false);
  const form = useForm<{ emailAddress: string }>({
    initialValues: { emailAddress: "" },

    validate: {
      emailAddress: (value) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
          value,
        )
          ? null
          : "Ceci n'est pas une adresse email",
    },
  });

  const handleSendEmailAddress = () => {
    console.log("Mail envoyé !");
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      Router.push("/login");
    }, 2000);
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Mot de passe oublié ?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Entrez votre adresse mail pour pouvoir le réinitialiser
      </Text>

      {showNotification ? (
        <Notification
          mt="md"
          icon={<IconCheck size={20} />}
          color="teal"
          radius="md"
          title="Envoie du mail de réinitialisation"
          disallowClose
        >
          Nous vous avons envoyé un mail de réinitialisation
        </Notification>
      ) : undefined}

      <Paper withBorder shadow="md" p={30} radius="lg" mt="xl">
        <form onSubmit={form.onSubmit(handleSendEmailAddress)}>
          <TextInput
            label="Votre adresse email"
            placeholder="john.doe@icloud.com"
            {...form.getInputProps("emailAddress")}
            required
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor
              color="violet.4"
              component="a"
              href="/login"
              size="sm"
              className={classes.control}
            >
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Retourner à la page de connexion</Box>
              </Center>
            </Anchor>
            <Button type="submit" color="violet.6" className={classes.control}>
              Réinitialiser mon mot de passe
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgetPassword;
