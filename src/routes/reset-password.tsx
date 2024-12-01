import { createFileRoute } from '@tanstack/react-router'
import AuthCard from '../features/auth/components/AuthCard';
import AuthWrapper from '../features/auth/components/wrapper/AuthWrapper';
import ForgotPassword from '../features/auth/forgot-password/ForgotPassword';
import ResetPassword from '../features/auth/reset-password/ResetPassword';

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  return (
		<AuthWrapper>
			<AuthCard
				title="Reset Your Password"
				anchorLabel="No longer need to reset your password?"
				anchorText="Log in"
				to="/login"
			>
				<ResetPassword />
			</AuthCard>
		</AuthWrapper>
	);
}
