import { useFocusWithin } from "@mantine/hooks";
import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Container,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.lg,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

const ForgetPassword = () => {
  const { classes } = useStyles();
  const { ref, focused } = useFocusWithin();

  return (
    <Container size={600} my={40}>
      <div className={classes.wrapper}>
        <div>
          <Title className={classes.title}>Mot de passe oublié ?</Title>
          <Text weight={500} size="lg" mb={5}>
            Veuillez renseigner votre adresse email
          </Text>

          <div ref={ref} className={classes.controls}>
            <TextInput
              placeholder="john.doe@icloud.com"
              classNames={{ input: classes.input }}
            />
            <Button color="violet.6" className={classes.control}>
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ForgetPassword;
