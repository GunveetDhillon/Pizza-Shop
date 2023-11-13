import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Pizza } from "../types/Pizza";

export const useGetPizzasQuery = () =>
  useQuery({
    queryKey: ["pizzas"],
    queryFn: async () => (await apiClient.get<Pizza[]>(`api/pizzas`)).data,
  });

export const useGetPizzaDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["pizzas", slug],
    queryFn: async () =>
      (await apiClient.get<Pizza>(`api/pizzas/slug/${slug}`)).data,
  });
