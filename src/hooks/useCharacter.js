import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "../api/characters";

export function useCharacter(id) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchCharacter(id),
    queryKey: ["character", id],
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
        "Ocorreu um erro ao buscar o personagem. Tente novamente em instantes.",
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
