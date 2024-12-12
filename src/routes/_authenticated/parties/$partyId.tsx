import { createFileRoute } from '@tanstack/react-router'
import { QueryParams } from '../../../shared/types'
import PartyPage from '../../../features/party/PartyPage'
import partyService from '../../../features/party/api/services/party.service'

export const Route = createFileRoute('/_authenticated/parties/$partyId')({
  component: PartyPage,
  validateSearch: (params: Record<string, string | number>): QueryParams => {
    return {
      search: params.search as string | undefined,
      orderBy: params.orderBy as string | undefined,
      sortBy: params.sortBy as string | undefined,
      dateFilter: params.dateFilter as string | undefined,
      pageNumber: params.pageNumber as number,
      startDate: params.startDate as string | undefined,
      endDate: params.endDate as string | undefined,
      partyId: params.partyId as string | undefined,
    }
  },
})
