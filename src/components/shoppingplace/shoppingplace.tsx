import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import useProducts from "./useProducts.ts";

const NAME_KEY = "search";
const CONDITION_KEY = "select_condition";
const SOLD_BY_KEY = "";
const SIZE_KEY = "select_size";
const GENDER_KEY = "select_gender";
const BRAND_KEY = "select_brand";
const CATEGORY_KEY = "select_category";
const PRIZE_MIN_KEY = "prize_min";
const PRIZE_MAX_KEY = "prize_max";

function ShoppingPlace() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [condition, setCondition] = useState("");
  const [sold_by, setSoldBy] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [prize_min, setPrizeMin] = useState("");
  const [prize_max, setPrizeMax] = useState("");
  //const [burningTimeMin, setBurningTimeMin] = useState("");
  //const [burningTimeMax, setBurningTimeMax] = useState("");
  //const [priceMin, setPriceMin] = useState("");
  //const [priceMax, setPriceMax] = useState("");

  //const [totalPages, setTotalPages] = useState(0);
  //const { currentPage, setCurrentPage, pages } = usePagination({
    //pagesCount: totalPages,
    //initialState: { currentPage: 1 },
  //});
  const { data } = useProducts({
    //page: currentPage,
    name,
    condition,
    sold_by,
    size,
    gender,
    brand,
    category,
    prize_min,
    prize_max,
  });
  const navigate = useNavigate();


  const handleSoldByFilter = (
    sold_by: string | null
  ) => {
    console.log(sold_by ? sold_by : 'henlo')
    searchParams.set(SOLD_BY_KEY, sold_by ? sold_by.toString() : "");
    navigate({
      pathname: "/reango-frontend/shoppingplace",
      search: searchParams.toString(),
    });
  };


/*   const handlePriceFilter = (
    minBurningTime: number | null,
    maxBurningTime: number | null
  ) => {
    searchParams.set(
      PRICE_MIN_KEY,
      minBurningTime ? minBurningTime.toString() : ""
    );
    searchParams.set(
      PRICE_MAX_KEY,
      maxBurningTime ? maxBurningTime.toString() : ""
    );
    navigate({
      pathname: "/products",
      search: searchParams.toString(),
    });
  }; */


/*   const handleProductSearch = (search: string) => {
    return navigate({
      pathname: "",
      search: createSearchParams({
        search: search,
        //page: "1",
      }).toString(),
    });
  };
 */

  //useEffect(() => {
    //setTotalPages(data?.totalPages || 0);
  //}, [data]);

  //useEffect(() => {
    //const url = new URL(window.location.toString());
    //url.searchParams.set("page", currentPage.toString());
    //window.history.pushState(null, "", url.toString());
  //}, [currentPage]);


  useEffect(() => {
    // Reset to the first page
    //setCurrentPage(1);

    setName(searchParams.get(NAME_KEY) || "");
    setCondition(searchParams.get(CONDITION_KEY) || "");
    setSoldBy(searchParams.get(SOLD_BY_KEY) || "");
    setSize(searchParams.get(SIZE_KEY) || "");
    setGender(searchParams.get(GENDER_KEY) || "");
    setBrand(searchParams.get(BRAND_KEY) || "");
    setCategory(searchParams.get(CATEGORY_KEY) || "");
    setPrizeMin(searchParams.get(PRIZE_MIN_KEY) || "");
    setPrizeMax(searchParams.get(PRIZE_MAX_KEY) || "");
  }, [searchParams]);

  return (
    <div>
    <button onClick={() => handleSoldByFilter("STORE")}>Filter by STORE</button>
    <button onClick={() => handleSoldByFilter(null)}>Show All Products</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Sold By</th>
          </tr>
        </thead>
        <tbody>
        {data ? (
          data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.condition}</td>
              <td>{product.sold_by}</td>
            </tr>
          ))
        ) : (
          <p>Loading...</p>
        )}

        </tbody>
      </table>
    </div>
  );
}

export default ShoppingPlace;

