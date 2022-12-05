import { TextInput, Textarea, PasswordInput, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { UserInterface } from "../../../interfaces/User.interface";

const ModifyEmployeeForm = ({ employee }: { employee: UserInterface }) => {
  const form = useForm({
    initialValues: {
      name: employee.name,
      firstName: employee.firstName,
      email: employee.email,
      birthDate: employee.birthDate ? new Date(employee.birthDate) : "",
      password: employee.password,
      phoneNumber: employee.phoneNumber,
    },
  });

  const handleSubmit = () => {
    console.log("Modify an Employee");
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Nom"
        name="name"
        required
        p="lg"
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Prénom"
        name="firstName"
        required
        p="lg"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        label="Email"
        required
        name="email"
        p="lg"
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Numéro de téléphone"
        name="phoneNumber"
        p="lg"
        {...form.getInputProps("phoneNumber")}
      />
      <DatePicker
        placeholder="DD-MM-YYYY"
        name="birthDate"
        mt="md"
        p="lg"
        label="Date de naissance"
        dropdownPosition="bottom-start"
        inputFormat="DD-MM-YYYY"
        {...form.getInputProps("birthDate")}
      />
      <Button type="submit" m="lg" radius="lg" color="violet.6">
        Modifier cet employé
      </Button>
    </form>
  );
};

export default ModifyEmployeeForm;
