import { createFileRoute } from '@tanstack/react-router'
import AuthWrapper from '../features/auth/components/wrapper/AuthWrapper';
import AuthCard from '../features/auth/components/cards/AuthCard';
import ResetPassword from '../features/auth/components/forms/ResetPasswordForm';


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
