import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api/characters";
import { useCharacterContext } from "../contexts/CharactersContext";

export function useCharacters() {
  const { setTotalPages, offset, setLoading } = useCharacterContext();
  setLoading(true);
  const { data, isLoading } = useQuery({
    queryFn: () => fetchCharacters(30, offset),
    queryKey: ["characters", 30, offset],
    staleTime: 1000 * 60 * 5,
  });

  setTotalPages(Math.ceil(data?.data?.total / data?.data?.limit));
  setLoading(isLoading);
  return {
    data: data?.data?.results,
  };
}
