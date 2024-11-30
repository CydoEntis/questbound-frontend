import { createFileRoute, redirect } from '@tanstack/react-router'
import { QueryParams } from '../../../shared/types/types'
import partiesService from '../../../features/party/api/services/parties.service'

export const Route = createFileRoute('/_authenticated/parties/')({
  beforeLoad: ({ context }) => {
    const isAuthenticated = context.authState.checkIsAuthenticated()
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: PartiesPage,
  validateSearch: (search: Record<string, unknown>): QueryParams => {
    return {
      searchTerm: search.query as string | undefined,
      sortDirection: search.sortDirection as string | undefined,
      sortField: search.sortField as string | undefined,
      dateFilterField: search.dateFilterField as string | undefined,
      pageNumber: search.pageNumber as number | undefined,
      startDate: search.startDate as string | undefined,
      endDate: search.endDate as string | undefined,
    }
  },
  loader: async () => {
    return await partiesService.getAllParties()
  },
})

function PartiesPage() {
  return <div>Hello "/parties/"!</div>
}
