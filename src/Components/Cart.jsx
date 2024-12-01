import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  fetchCartItemsAction,
  removeCartItemThunk,
  addOrderThunk,
  clearUserCartThunk,
  fetchOrdersThunk,
  totalPriceSelector,
  addToCartThunk,
} from "../Redux/Reducers/Product.Reducer";
function CartItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector);
  console.log(cartItems);
  const totalAmount = useSelector(totalPriceSelector);
  console.log(totalAmount);

  console.log("you reached your cart");

  // function to navigate to orders page after purchasing items in cart
  function navOrders() {
    dispatch(addOrderThunk());
    dispatch(clearUserCartThunk());
    dispatch(fetchOrdersThunk());
    navigate("/myorders");
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <div className=" max-w-7xl  min-w-[60rem] mx-auto p-6 -ml-4">
          <div className="grid grid-cols-12 pl-0 pr-10 ">
            <div className="col-span-3 ml-0">
              <div className=" bg-orange-400 p-6 rounded-lg h-auto fixed w-60  ">
                <div className="mb-8">
                  <p className="text-lg text-sky-800 font-bold mb-2">
                    Total-Price:-{Math.round(totalAmount)}
                  </p>
                </div>

                {/* Purchase now button */}
                <button
                  onClick={navOrders}
                  className="bg-purple-700 border-2 border-solid border-purple-700 p-2 rounded-lg text-white hover:bg-white hover:text-black transition duration-300 ease-in-out"
                >
                  Purchase Now
                </button>
              </div>
            </div>

            {/* Product Grid */}

            <div className="col-span-9 grid grid-cols-3 gap-6 ">
              {cartItems.map((product) => (
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
                    <div className="flex gap-5 items-center">
                      <p className="text-xl font-bold">
                        ₹ {product.data.price}
                      </p>
                      <img
                        src="./images/minus.png"
                        className=" w-6 h-6"
                        onClick={() => dispatch(removeCartItemThunk(product))}
                      />
                      <span>{product.Qnt}</span>
                      <img
                        src="./images/plus.png"
                        className=" w-6 h-6"
                        onClick={() => dispatch(addToCartThunk(product))}
                      />
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => dispatch(removeCartItemThunk(product))}
                      className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-5xl font-bold col-span-4 text-center">
          Cart is Empty!
        </h1>
      )}
    </>
  );
}
export { CartItems };
