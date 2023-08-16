import { useQuery } from "@tanstack/react-query";
import { fetchComicsCharacter } from "../api/characters";

export function useComics(id, limit, offset) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchComicsCharacter(id, limit, offset),
    queryKey: ["comics", id, limit, offset],
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
      error:
        "Ocorreu um erro ao buscar as histórias em quadrinhos do personagem.",
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
