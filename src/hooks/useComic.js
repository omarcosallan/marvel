import { useQuery } from "@tanstack/react-query";
import { fetchComic } from "../api/characters";

export function useComic(id, limit, offset) {
  const { data } = useQuery({
    queryFn: () => fetchComic(id, limit, offset),
    queryKey: ["comic", id],
    staleTime: 1000 * 60 * 5,
  });
  return { comic: data?.data?.results[0] };
}
