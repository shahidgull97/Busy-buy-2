import React from "react";

import GridApp from "./Spinner";
import { useState, useEffect } from "react";
// new imports
import { orderSelector } from "../Redux/Reducers/Product.Reducer";
import { useSelector } from "react-redux";
const OrderSummary = () => {
  // const { orders } = useProduct();
  const [loading, setLoading] = useState(true); // State to control spinner visibility
  const orders = useSelector(orderSelector);
  console.log(orders);

  // This useEffect is for the spinner duration and message which shows
  useEffect(() => {
    // Set a timer to stop showing the spinner after a few seconds
    const timer = setTimeout(() => {
      setLoading(false); // Hide spinner after 3 seconds
    }, 1000); // Adjust the duration (in milliseconds) as needed

    // Clear the timer if the component unmounts before timeout
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading && Object.keys(orders).length === 0 ? <GridApp /> : ""}
      {/* orders contains nested objects and array that is three loops are used to get he required nested data */}
      {Object.keys(orders).length !== 0 ? (
        <div className="max-w-4xl mx-auto p-6">
          {Object.entries(orders).map(([date, items]) => (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-center  text-gray-800">
                  Ordered On: {date}
                </h2>
              </div>
              {items.map((result) => (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium text-gray-900 w-2/5">
                          Title
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-900">
                          Price
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-900">
                          Quantity
                        </th>
                        <th className="py-3 px-4 text-left font-medium text-gray-900">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {result.items.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }
                        >
                          <td className="py-3 px-4 text-gray-800 font-medium">
                            {item.data.title.length > 35
                              ? item.data.title.substring(0, 35) + "..."
                              : item.data.title}
                          </td>
                          <td className="py-3 px-4 text-gray-800">
                            ₹ {item.data.price.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-blue-600 font-medium">
                            {item.Qnt}
                          </td>
                          <td className="py-3 px-4 text-gray-800">
                            ₹ {(item.data.price * item.Qnt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-white">
                        <td colSpan="3" className="py-4 px-4"></td>
                        <td className="py-4 px-4 font-medium text-gray-800">
                          ₹ {result.totalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h1 className=" font-bold text-3xl text-center">No Orders Found!</h1>
      )}
    </>
  );
};

export default OrderSummary;
