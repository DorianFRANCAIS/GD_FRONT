import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Container,
  Group,
  Button,
  Notification,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Router from "next/router";
import { IconCheck } from "@tabler/icons";

const Login = () => {
  const [showNotification, setShowNotification] = useState(false);
  const form = useForm<{ emailAddress: string; password: string }>({
    initialValues: { emailAddress: "", password: "" },

    validate: {
      emailAddress: (value) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
          value,
        )
          ? null
          : "Ceci n'est pas une adresse email",
    },
  });

  const handleLogin = () => {
    console.log("Connecté !");
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      Router.push("/");
    }, 2000);
  };

  return (
    <Container size={420} my={40}>
      {showNotification ? (
        <Notification
          mt="md"
          icon={<IconCheck size={20} />}
          color="teal"
          radius="md"
          title="Connexion"
          disallowClose
        >
          Nous vous connectons à votre espace de gestion
        </Notification>
      ) : undefined}

      <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <TextInput
            label="Adresse email"
            name="emailAddress"
            placeholder="john.doe@icloud.com"
            {...form.getInputProps("emailAddress")}
            required
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="Votre mot de passe"
            mt="md"
            {...form.getInputProps("password")}
            required
          />
          <Group position="apart" mt="md">
            <Anchor
              color="violet.4"
              component="a"
              href="/forget_password"
              size="sm"
            >
              Mot de passe oublié ?
            </Anchor>
          </Group>
          <Button type="submit" color="violet.6" radius="lg" fullWidth mt="xl">
            Je me connecte
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
