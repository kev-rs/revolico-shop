import { createContext } from "react";

interface Store {
  search: string
  searchQuery: (text: string) => void;
}

export const SearchContext = createContext<Store>({} as Store);

export const { Provider } = SearchContext;
