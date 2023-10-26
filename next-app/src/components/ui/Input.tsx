import { CSSProperties, FC } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";
import formStyles from "../../styles/form.module.css";

type Props = {
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  labelText?: string;
  inputProps?: Partial<HTMLInputElement>;
  horizontal?: boolean;
  registerProps: UseFormRegisterReturn;
  inputContainerStyle?: CSSProperties;
};

const containerStyle: { [key: string]: string } = {
  display: "flex",
};

const Input: FC<Props> = ({
  errorMessage,
  labelText,
  inputProps = {},
  horizontal = false,
  registerProps,
  inputContainerStyle,
}) => {
  const style = {
    ...containerStyle,
    flexDirection: horizontal ? "row" : "column",
  };
  return (
    <div style={style}>
      <label htmlFor={inputProps?.name}>{labelText}</label>
      <div style={inputContainerStyle}>
        <input
          className={formStyles.input}
          {...inputProps}
          {...registerProps}
        />
        {errorMessage && (
          <div className={formStyles.formError}>{errorMessage as string}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
