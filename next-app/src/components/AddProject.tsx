import { Dispatch, FC, SetStateAction } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../types/common/zod";
import Input from "./ui/Input";
import formStyles from "../styles/form.module.css";

const formStyle = {
  width: "35vw",
};

const inputContainerStyle = {
  display: "flex",
  flexdirection: "row",
  gap: ".5rem",
  alignItems: "center",
};

type Props = {
  setIsAddProjectModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AddProject: FC<Props> = ({ setIsAddProjectModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  if (!register || !handleSubmit) return null;

  const onSubmit = async (data: FieldValues) => {
    const dataWithAdditionalFields = {
      ...data,
      status: "active",
    };
    const res = await fetch("/api/project", {
      method: "POST",
      body: JSON.stringify(dataWithAdditionalFields),
    });
    console.log(res.status);
    if (res.status === 200) {
      setIsAddProjectModalOpen(false);
    } else console.error("Woopsie");
  };

  return (
    <form
      className={formStyles.form}
      style={formStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        labelText="Name"
        registerProps={register("name")}
        errorMessage={errors.name?.message}
        inputContainerStyle={inputContainerStyle}
      />
      <Input
        labelText="Start of project"
        registerProps={register("createdAt")}
        errorMessage={errors.createdAt?.message}
        inputProps={{ type: "date" }}
        inputContainerStyle={inputContainerStyle}
      />
      <Input
        labelText="Last time you worked on the project"
        registerProps={register("lastWorkedOnAt")}
        errorMessage={errors.lastWorkedOnAt?.message}
        inputProps={{ type: "date" }}
        inputContainerStyle={inputContainerStyle}
      />
      <input type="submit" value="Add project" />
    </form>
  );
};

export default AddProject;
