import { useState } from "react";

const useAccountManagement = (onClose?: () => void) => {
  const [showAccountUpdateForm, setShowAccountUpdateForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const showUpdateAccountFormHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowAccountUpdateForm(true);
  };

  const closeUpdateAccountFormHandler = () => {
    setShowAccountUpdateForm(false);
  };

  const showChangePasswordFormHandler = () => {
    setShowChangePasswordForm(true);
  };

  const closeChangePasswordFormHandler = () => {
    setShowChangePasswordForm(false);
  };

  const closeAndReset = () => {
    setShowChangePasswordForm(false);
    setShowAccountUpdateForm(false);
    if (onClose) {
      onClose();
    }
  };

  return {
    showAccountUpdateForm,
    showChangePasswordForm,
    closeUpdateAccountFormHandler,
    closeChangePasswordFormHandler,
    showChangePasswordFormHandler,
    showUpdateAccountFormHandler,
    closeAndReset,
  };
};

export default useAccountManagement;
