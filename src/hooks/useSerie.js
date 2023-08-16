import { useQuery } from "@tanstack/react-query";
import { fetchSerie } from "../api/characters";

export function useSerie(id, limit, offset) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchSerie(id, limit, offset),
    queryKey: ["serie", id],
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
      error: "Ocorreu um erro ao buscar a série.",
      loading: isLoading,
    };
  }

  if (data) {
    return {
      data: data?.data?.results[0],
      loading: isLoading,
    };
  }

  return {
    loading: isLoading,
  };
}
