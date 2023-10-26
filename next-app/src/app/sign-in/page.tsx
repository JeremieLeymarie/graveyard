import { NextPage } from "next";
import SignInForm from "../../components/auth/SignInForm";
import CenteredModal from "../../components/CenteredModal";
import styles from "../styles/common.module.css";

const SignIn: NextPage = () => {
  return (
    <div className={styles.container}>
      <CenteredModal>
        <SignInForm />
      </CenteredModal>
    </div>
  );
};

export default SignIn;
