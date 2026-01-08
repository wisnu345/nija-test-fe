import { useQuery } from "@tanstack/react-query";
import { getPokemons, getPokemonByGeneration } from "@/services/pokemon.service";

export function usePokemons(page: number, generationId?: number) {
  return useQuery({
    queryKey: ["pokemons", page, generationId],
    queryFn: () => {
      if (generationId) {
        return getPokemonByGeneration(generationId).then(results => ({
          count: results.length,
          results
        }));
      }
      return getPokemons({
        limit: 20,
        offset: page * 20,
      });
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}