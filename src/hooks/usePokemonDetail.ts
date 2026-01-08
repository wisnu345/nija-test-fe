import { useQuery } from "@tanstack/react-query";
import { getPokemonDetail } from "@/services/pokemon.service";

export function usePokemonDetail(identifier: string | number | null) {
  return useQuery({
    queryKey: ["pokemon-detail", identifier],
    queryFn: () => getPokemonDetail(identifier!),
    enabled: !!identifier,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}