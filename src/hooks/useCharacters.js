import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api/characters";
import { useCharacterContext } from "../contexts/CharactersContext";

export function useCharacters() {
  const { setTotalPages, offset } = useCharacterContext();

  const { data, isLoading, error } = useQuery({
    queryFn: () => fetchCharacters(30, offset),
    queryKey: ["characters", 30, offset],
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
      error: "Ocorreu um erro ao buscar os personagens.",
      loading: isLoading,
    };
  }

  if (data) {
    setTotalPages(Math.ceil(data?.data?.total / data?.data?.limit));
    return {
      data: data?.data?.results,
      loading: isLoading,
    };
  }

  return {
    loading: isLoading,
  };
}
