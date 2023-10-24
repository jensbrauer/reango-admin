import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import useProducts from "./useProducts.ts";

const NAME_KEY = "search";
const CONDITION_KEY = "select_condition";
const SOLD_BY_KEY = "sold_by";
const SIZE_KEY = "select_size";
const GENDER_KEY = "select_gender";
const BRAND_KEY = "select_brand";
const CATEGORY_KEY = "select_category";
const PRIZE_MIN_KEY = "prize_min";
const PRIZE_MAX_KEY = "prize_max";
const USER_TYPE_KEY = "user_type";

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
  const [user_type, setUserType] = useState("");
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
    user_type,
  });
  const navigate = useNavigate();


  const handleUserTypeFilter = (user_type) => {
    console.log(user_type.join('&user='))
    //console.log(user_type ? user_type : 'henlo');
    for (const user in user_type) {
      searchParams.set(USER_TYPE_KEY, user ? user : "");
    }
    if (user_type !== null) {
    console.log(searchParams.toString())}
    navigate({
      pathname: "/reango-frontend/shoppingplace",
      search: searchParams.toString(),
    });
  };
  
  function createUserTypeFilter() {
    console.log(filterBundle.join())
  };

  const [filterBundle, setFilterBundle] = useState([]);

  function addFilter(filterValue) {
    if (!filterBundle.includes(filterValue)) {
      // If filterValue is not in the array, add it
      const newFilterBundle = [...filterBundle, filterValue];
      setFilterBundle(newFilterBundle);
      handleUserTypeFilter(newFilterBundle)
    } else {
      // If filterValue is already in the array, remove it
      const newFilterBundle = filterBundle.filter(item => item !== filterValue);
      setFilterBundle(newFilterBundle);
      handleUserTypeFilter(newFilterBundle)
    }
  }

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
    setUserType(searchParams.get(USER_TYPE_KEY) || "");
  }, [searchParams]);

  return (
    <div>
    <button onClick={() => handleUserTypeFilter('FEATURED')}>Filter by STORE</button>
    <button onClick={() => handleUserTypeFilter(null)}>Show All Products</button>
    <button onClick={() => addFilter('STORE')}>Store</button>
    <button onClick={() => addFilter('FEATURED')}>Featured</button>
    <button onClick={() => addFilter('USER')}>User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
        {data ? (
          data.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.condition}</td>
              <td>{product.user_type}</td>
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

