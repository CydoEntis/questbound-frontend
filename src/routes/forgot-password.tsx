import { createFileRoute } from '@tanstack/react-router'
import AuthWrapper from '../features/auth/components/wrapper/AuthWrapper';
import AuthCard from '../features/auth/components/cards/AuthCard';
import ForgotPassword from '../features/auth/components/forms/ForgotPasswordForm';


export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  return (
		<AuthWrapper>
			<AuthCard
				title="Forgot Your Password?"
				anchorLabel="Remembered your password?"
				anchorText="Log in"
				to="/login"
			>
				<ForgotPassword />
			</AuthCard>
		</AuthWrapper>
	);
}
