import { useQuery } from "@tanstack/react-query";
import { fetchSeriesCharacter } from "../api/characters";

export function useSeries(id, limit, offset) {
  const { data } = useQuery({
    queryFn: () => fetchSeriesCharacter(id, limit, offset),
    queryKey: ["series", id, limit, offset],
    staleTime: 1000 * 60 * 5,
  });
  return { series: data?.data?.results };
}
