import { useQuery } from "@tanstack/react-query";
import { retrieveProductList } from "./api.ts";
import { ProductFilterParams } from "../../types.ts";

const useProducts = (query: ProductFilterParams) =>
  useQuery({
    queryKey: [
      "products",
      query.name,
      query.condition,
      query.sold_by,
      query.size,
      query.gender,
      query.brand,
      query.category,
      query.prize_min,
      query.prize_max,
    ],
    queryFn: () => retrieveProductList(query),
  });

export default useProducts;

