import { create } from "zustand";
import { PaginatedParties, Party } from "../features/party/shared/party.types";


export type PartyState = {
  parties: PaginatedParties | null;
  party: Party | null;
  recentParties: Party[] | null;

  setParties: (parties: PaginatedParties | null) => void; // Corrected the type
  setParty: (party: Party | null) => void;
  // setMembers: (members: PaginatedMembers | null) => void;
  setRecentParties: (recentParties: Party[] | null) => void;
};

const usePartyStore = create<PartyState>((set, get) => ({
  parties: null,
  party: null,
  members: null,
  recentParties: null,
  loading: {
    parties: false,
    party: false,
    members: false,
    recent: false,
  },
  setParties: (parties: PaginatedParties | null) => {
    if (parties) {
      set({ parties });
    } else {
      set({ parties: null });
    }
  },
  setParty: (party: Party | null) => {
    if (party) {
      set({ party });
    } else {
      set({ party: null });
    }
  },
  // setMembers: (members: PaginatedMembers | null) => {
  //   if (members) {
  //     set({ members });
  //   } else {
  //     set({ members: null });
  //   }
  // },
  setRecentParties: (recentParties: Party[] | null) => {
    if (recentParties) {
      set({ recentParties });
    } else {
      set({ recentParties: null });
    }
  },
}));

export default usePartyStore;
