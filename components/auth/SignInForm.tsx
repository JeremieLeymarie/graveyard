import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formStyles from "../../styles/form.module.css";
import { createUserSchema } from "../../types/common/zod";
import Input from "../ui/Input";

const formStyle = {
  width: "35vw",
};

const inputContainerStyle = {
  display: "flex",
  flexdirection: "row",
  gap: ".5rem",
  alignItems: "center",
};

type Props = {};

const SignIn: FC<Props> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
  });

  if (!register || !handleSubmit) return null;

  const onSubmit = async (data: FieldValues) => {
    const dataWithAdditionalFields = {
      ...data,
      status: "active",
    };
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(dataWithAdditionalFields),
    });
    console.log(res.status);
    if (res.status === 200) {
      console.log("yay");
    } else console.error("Woopsie");
  };

  return (
    <form
      className={formStyles.form}
      style={formStyle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        labelText="Username"
        registerProps={register("username")}
        errorMessage={errors.username?.message}
        inputContainerStyle={inputContainerStyle}
      />
      <Input
        labelText="Email"
        registerProps={register("email")}
        errorMessage={errors.email?.message}
        inputContainerStyle={inputContainerStyle}
      />
      <Input
        labelText="Password"
        registerProps={register("password")}
        errorMessage={errors.password?.message}
        inputProps={{ type: "password" }}
        inputContainerStyle={inputContainerStyle}
      />
      <Input
        labelText="Confirm password"
        registerProps={register("confirmPassword")}
        errorMessage={errors.confirmPassword?.message}
        inputProps={{ type: "password" }}
        inputContainerStyle={inputContainerStyle}
      />
      <input type="submit" value="Create account" />
    </form>
  );
};

export default SignIn;
