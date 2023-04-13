import { TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { mutate, MutatorCallback } from "swr";
import { UserInterface } from "../../../interfaces/User.interface";

const NewCenterForm = ({
  owner,
  onClose,
  mutate,
}: {
  owner: UserInterface;
  onClose: () => void;
  mutate: MutatorCallback;
}) => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      ownerId: owner.id,
      name: "",
      adress: "",
      phoneNumber: "",
      email: "",
      description: "",
    },

    validate: {
      email: (value) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i.test(
          value,
        )
          ? null
          : "Ceci n'est pas une adresse email",
    },
  });

  const handleSubmit = () => {
    return fetch(`${process.env.SERVER_API}/establishments/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    })
      .then((response) => {
        if (response.status === 422) {
          throw new Error("This Establishment already exists");
        }
        return response.json();
      })
      .then(() => {
        onClose();
        mutate();
      })
      .catch((error) => {
        console.log("error : " + error.message);
      });
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
        Ajouter ce centre
      </Button>
    </form>
  );
};

export default NewCenterForm;
