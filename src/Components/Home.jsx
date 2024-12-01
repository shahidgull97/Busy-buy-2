import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebasedb";
import { useNavigate } from "react-router-dom";
import GridApp from "./Spinner";
import { addToCartThunk } from "../Redux/Reducers/Product.Reducer";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../Redux/Reducers/User.Reducer";
import { Timestamp } from "firebase/firestore";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState(500); // Default price range
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(userSelector);

  const handleAddToCart = (product) => {
    if (product && product.createdAt instanceof Timestamp) {
      product = {
        ...product,
        createdAt: product.createdAt.toDate().toISOString(), // Convert to ISO string
      };
    }

    dispatch(addToCartThunk(product));
  };

  // This to navigate to sign in Page
  function navigateSignIn() {
    navigate("/signin");
  }

  // This is used to get data from firestore database on initial render
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const getExpenses = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });

      setProducts(getExpenses);
      setResults(getExpenses);
    });
  }, []);

  // Real time searching of products based on search text price range and catagory
  useEffect(() => {
    if (!searchText && selectedCategories.length === 0 && priceRange === 100) {
      // If no filters are applied, show all products
      setProducts(results);
      console.log("no filters");
    } else {
      // Apply filters
      const filteredProducts = results.filter((product) => {
        const matchesSearch =
          !searchText.trim() ||
          product.data.title.toLowerCase().includes(searchText.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.data.category);

        const matchesPrice = product.data.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      });
      setProducts(filteredProducts);
    }
  }, [searchText, selectedCategories, priceRange, results]);

  // Handle checkbox changes values
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Category array
  const categories = [
    { id: "mens", label: "men's clothing" },
    { id: "womens", label: "women's clothing" },
    { id: "jewelery", label: "jewelery" },
    { id: "electronics", label: "electronics" },
  ];

  return (
    <>
      {!products.length > 0 ? <GridApp /> : ""}
      <div className="max-w-7xl  min-w-[60rem] mx-auto p-6 -ml-4">
        {/* Search Bar */}
        <div className=" relative mb-8 left-80   ">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search By Name"
            className="w-4/12 ml-20 p-3 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-font-bolc"
          />
        </div>

        <div className="grid grid-cols-12 pl-0 pr-10 ">
          {/* Filter Sidebar */}
          <div className="col-span-3 ml-0">
            <div className=" bg-blue-200 p-6 rounded-lg h-auto fixed w-auto ">
              <h2 className="text-xl font-semibold mb-6 text-blue-900">
                Filter
              </h2>

              {/* Price Filter */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 mb-2">
                  Price: {priceRange[0]}
                </p>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-medium mb-4  text-blue-900">
                  Category
                </h3>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2 mb-3"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.label)}
                      onChange={() => handleCategoryChange(category.label)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-span-9 grid grid-cols-3 gap-6 -ml-10">
            {products.map((product) => (
              <div
                key={product.data.id}
                className="overflow-hidden rounded-lg shadow-2xl"
              >
                <div className="p-4  min-w-[200px]">
                  <div className="aspect-square relative mb-4">
                    <img
                      src={product.data.image}
                      alt={product.data.title}
                      className="object-fit w-full h-full rounded-md"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {product.data.title}
                  </h3>
                  <p className="text-xl font-bold">₹ {product.data.price}</p>
                </div>
                <div className="p-4 pt-0">
                  <button
                    onClick={() =>
                      isLoggedIn ? handleAddToCart(product) : navigateSignIn()
                    }
                    className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;
