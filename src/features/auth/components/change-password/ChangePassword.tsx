import ChangePasswordForm from "../change-password-form/ChangePasswordForm";
import ChangePasswordButton from "../change-password-button/ChangePasswordButton";

type ChangePasswordProps = {
  isOpened: boolean;
  closeFormHandler: () => void;
  showFormHandler: () => void;
};

function ChangePassword({
  isOpened,
  closeFormHandler,
  showFormHandler,
}: ChangePasswordProps) {
  if (isOpened) return <ChangePasswordForm handleClose={closeFormHandler} />;

  return <ChangePasswordButton showFormHandler={showFormHandler} />;
}

export default ChangePassword;
