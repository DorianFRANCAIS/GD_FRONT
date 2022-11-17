import React, { FormEventHandler } from 'react'
import useRegisterStyle from './Register.style'
import { useForm } from '@mantine/form';
import { Container, Title, Text, Anchor, Paper, TextInput, PasswordInput, Button } from '@mantine/core';

const Register = () => {

    const { classes } = useRegisterStyle();

    const form = useForm({
        initialValues: { email: '', tel: '', siret: '' },
    
        // functions will be used to validate values at corresponding key
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
          tel: (value) => (/^(\+33\s[1-9]{8})|(0[1-9]\s{8})$/.test(value) ? null : 'Numéro invalide'),
          siret: (value) => (/^[0-9]{9}$/.test(value) ? null : "SIRET Invalide")
        },
      });

    const handleSubmit = (event : any) => {
        event.preventDefault()
    }

  return (
    <Container size={700} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Bienvenue sur Canine Project !
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Vous avez déjà un compte ?{' '}
        <Anchor component='a' href="/login" size="sm">
          Se connecter
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="Adresse mail" name='email' placeholder="john.doe@icloud.com" required {...form.getInputProps('name')} />
            <TextInput label="Téléphone" placeholder="+33 XX XX XX XX" mt="md" required {...form.getInputProps('tel')} />
            <TextInput label="SIRET" placeholder="XXXXXXXXXXXXX" mt="md" required {...form.getInputProps('siret')} />
            <PasswordInput label="Mot de passe" placeholder="**********" required mt="md" />
            <PasswordInput label="Confirmation du mot de passe" placeholder="**********" required mt="md" />
            <Button fullWidth radius="lg" mt="xl" color="violet.6">
            S&apos;incrire
            </Button>
        </form>
      </Paper>
    </Container>

  )
}

export default Register