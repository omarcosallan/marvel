import { useQuery } from "@tanstack/react-query";
import { fetchSeriesCharacter } from "../api/characters";

export function useSeries(id, limit, offset) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchSeriesCharacter(id, limit, offset),
    queryKey: ["series", id, limit, offset],
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (failureCount <= 3) {
        return 100;
      }
      return false;
    },
  });

  if (error) {
    return {
      error: "Ocorreu um erro ao buscar as series do personagem.",
      loading: isLoading,
    };
  }

  if (data) {
    return {
      data: data?.data?.results,
      loading: isLoading,
    };
  }

  return {
    loading: isLoading,
  };
}
