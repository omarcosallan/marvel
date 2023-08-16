import { useQuery } from "@tanstack/react-query";
import { fetchComic } from "../api/characters";

export function useComic(id, limit, offset) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchComic(id, limit, offset),
    queryKey: ["comic", id],
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
      error: "Ocorreu um erro ao buscar a história em quadrinho.",
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
