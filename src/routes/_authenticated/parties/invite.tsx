import { createFileRoute } from '@tanstack/react-router'
import InvitePage from '../../../features/party/components/party-comps/party-invite/InvitePage'

export const Route = createFileRoute('/_authenticated/parties/invite')({
  component: InvitePage,
})
