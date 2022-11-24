import React, { useContext } from "react";
import { useForm } from "@mantine/form";
import {
  Container,
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const Register = () => {
  const form = useForm({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      tel: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password
          ? "Les mots de passe ne sont pas identiques"
          : null,
      email: (value) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
          value,
        )
          ? null
          : "Ceci n'est pas une adresse email",
    },
  });

  const handleSubmit = () => {
    console.log(form.values);
  };

  return (
    <Container size={700} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Bienvenue sur Canine Project !
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Vous avez déjà un compte ?{" "}
        <Anchor component="a" href="/login" size="sm">
          Se connecter
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Nom"
            name="lastName"
            placeholder="Doe"
            required
            {...form.getInputProps("lastName")}
          />
          <TextInput
            label="Prénom"
            name="firstName"
            placeholder="John"
            mt="md"
            required
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Adresse mail"
            name="email"
            placeholder="john.doe@icloud.com"
            mt="md"
            required
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Téléphone"
            placeholder="XX XX XX XX"
            mt="md"
            required
            {...form.getInputProps("tel")}
          />

          <DatePicker
            placeholder="DD-MM-YYYY"
            name="birthDate"
            mt="md"
            label="Date de naissance"
            dropdownPosition="bottom-start"
            inputFormat="DD-MM-YYYY"
            {...form.getInputProps("birthDate")}
          />

          <PasswordInput
            label="Mot de passe"
            placeholder="**********"
            {...form.getInputProps("password")}
            required
            mt="md"
          />
          <PasswordInput
            label="Confirmation du mot de passe"
            placeholder="**********"
            {...form.getInputProps("confirmPassword")}
            required
            mt="md"
          />
          <Button type="submit" fullWidth radius="lg" mt="xl" color="violet.6">
            S&apos;incrire
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
