import { client } from "../../api";
import { ProductFilterParams, ProductList } from "../../types";

export const retrieveProductList = async (
  params: ProductFilterParams
): Promise<ProductList> => {
  const response = await client.get<ProductList>("/createproduct/", {
    params: params,
  });
  return response.data;
};