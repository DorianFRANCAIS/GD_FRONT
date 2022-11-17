import { ChangeEvent, FormEventHandler, useState } from "react";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Container,
  Group,
  Button,
} from "@mantine/core";

const Login = () => {
  const [credentials, setCredentials] = useState({
    emailAddress: "",
    password: "",
  });

  const handleLogin: FormEventHandler = (event: ChangeEvent) => {
    event.preventDefault();
    console.log(credentials);
  };

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
        <form onSubmit={handleLogin}>
          <TextInput
            label="Adresse email"
            name="emailAddress"
            placeholder="john.doe@icloud.com"
            onChange={(event) => {
              event.preventDefault();
              setCredentials({
                ...credentials,
                emailAddress: event.currentTarget.value,
              });
            }}
            required
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="Votre mot de passe"
            onChange={(event) => {
              event.preventDefault();
              setCredentials({
                ...credentials,
                password: event.currentTarget.value,
              });
            }}
            required
            mt="md"
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
          <Button color="violet.6" radius="lg" fullWidth mt="xl" type="submit">
            Je me connecte
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
