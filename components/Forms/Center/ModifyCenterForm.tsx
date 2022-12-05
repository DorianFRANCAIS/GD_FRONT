import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EstablishmentInterface } from "../../../interfaces/Establishment.interface";
import { UserInterface } from "../../../interfaces/User.interface";

const ModifyCenterForm = ({
  establishment,
  owner,
}: {
  establishment: EstablishmentInterface;
  owner: UserInterface;
}) => {
  const form = useForm({
    initialValues: {
      ownerId: owner.id,
      name: establishment.name,
      adress: establishment.adress,
      phoneNumber: establishment.phoneNumber,
      email: establishment.email,
      description: establishment.description,
    },
  });

  const handleSubmit = () => {
    console.log("Modify a Center");
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Nom du centre"
        p="lg"
        name="name"
        {...form.getInputProps("name")}
      />
      <TextInput
        required
        label="Adresse du centre"
        name="adress"
        p="lg"
        {...form.getInputProps("adress")}
      />
      <TextInput
        required
        label="Numéro de Téléphone"
        name="phoneNumber"
        p="lg"
        {...form.getInputProps("phoneNumber")}
      />
      <TextInput
        name="email"
        label="Adresse Email"
        required
        p="lg"
        {...form.getInputProps("email")}
      />
      <Textarea
        name="description"
        label="Description"
        p="lg"
        {...form.getInputProps("description")}
      />
      <Button m="lg" type="submit" color="violet.6" radius="lg">
        Enregistrer ce centre
      </Button>
    </form>
  );
};

export default ModifyCenterForm;
