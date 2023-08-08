import { useQuery } from "@tanstack/react-query";
import { fetchComicsCharacter } from "../api/characters";

export function useComics(id, limit, offset) {
  const { data } = useQuery({
    queryFn: () => fetchComicsCharacter(id, limit, offset),
    queryKey: ["comics", id, limit, offset],
    staleTime: 1000 * 60 * 5,
  });
  return { comics: data?.data?.results };
}
