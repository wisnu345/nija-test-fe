import { useQuery } from "@tanstack/react-query";
import { getGenerations } from "@/services/pokemon.service";

export function useGenerations() {
  return useQuery({
    queryKey: ["generations"],
    queryFn: getGenerations,
    staleTime: Infinity,
  });
}