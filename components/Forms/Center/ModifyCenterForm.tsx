import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EstablishmentInterface } from "../../../interfaces/Establishment.interface";

const ModifyCenterForm = ({
  establishment,
}: {
  establishment: EstablishmentInterface;
}) => {
  const form = useForm({
    initialValues: {
      name: establishment.name,
      address: establishment.address,
      phoneNumber: establishment.phoneNumber,
      emailAddress: establishment.emailAddress,
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
        name="address"
        p="lg"
        {...form.getInputProps("address")}
      />
      <TextInput
        required
        label="Numéro de Téléphone"
        name="phoneNumber"
        p="lg"
        {...form.getInputProps("phoneNumber")}
      />
      <TextInput
        name="emailAddress"
        label="Adresse Email"
        required
        p="lg"
        {...form.getInputProps("emailAddress")}
      />
      <Textarea
        name="description"
        label="Description"
        required
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
