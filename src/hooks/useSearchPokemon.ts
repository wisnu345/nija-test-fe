import { useQuery } from "@tanstack/react-query";
import { searchPokemon } from "@/services/pokemon.service";

export function useSearchPokemon(searchTerm: string) {
  return useQuery({
    queryKey: ["pokemon-search", searchTerm],
    queryFn: () => searchPokemon(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 0,
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
}