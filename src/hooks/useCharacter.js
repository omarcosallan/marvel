import { useQuery } from "@tanstack/react-query";
import { fetchCharacter } from "../api/characters";
import { useCharacterContext } from "../contexts/CharactersContext";

export function useCharacter(id) {
  const { setLoading } = useCharacterContext();
  setLoading(true);
  const { data, isLoading } = useQuery({
    queryFn: () => fetchCharacter(id),
    queryKey: ["character", id],
    staleTime: 1000 * 60 * 5,
  });
  setLoading(isLoading);
  return { character: data?.data?.results[0] };
}
