import { useState, useEffect } from "react";
import axios from "axios";
import { SingleProduct } from "../config/api";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<Product | null>(null);
  const { addToCart, showPopup } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) {
        console.error("Product ID is not defined");
        return;
      }

      try {
        const response = await axios.get(SingleProduct(id));
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [id]);

  return (
    <>
      <section className="dark:bg-gray-700">
        <div className="mx-auto w-full max-w-screen-xl ">
          <div className="max-w-8x1 mx-auto px-4 py-6 ">
            <div className="mt-8 mx-auto text-white">
              {productData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
                  <div className="mx-24">
                    <img
                      src={productData.image}
                      alt={productData.description}
                      className="md:col-start-10 w-80 h-80"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold mb-5">
                      {productData.title}
                    </h1>
                    <h1 className="text-7xl font-semibold mb-5">
                      ${productData.price}
                    </h1>
                    <button className="font-semibold mb-5 bg-gray-300 rounded-md p-2 cursor-default text-gray-800">
                      Free Delivery With Advanced Payments
                    </button>
                    <div className="mt-2 flex items-center gap-5 mb-5">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(productData);
                          showPopup('Item added to cart');
                        }}
                        className="inline-flex w-60 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >                     
                        <svg
                          className="-ms-2 me-2 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                          />
                        </svg>
                        Add to cart
                      </button>
                      <button
                        data-tooltip-target="favourites-tooltip-2"
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <ul>
                      <li className="max-w-xl text-gray-400">
                        <strong>{productData.description}</strong>
                      </li>
                      <li className="mt-3">
                        <strong>Category:</strong>{" "}
                        <span className="text-red-500 font-semibold">
                          {productData.category.toUpperCase()}
                        </span>
                      </li>

                      <li className="flex items-center mt-2">
                        <strong className="mr-1">Rating:</strong>
                        {Array.from({
                          length: Math.floor(productData.rating.rate),
                        }).map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 1l2.5 6.5H18l-5 4.1 2.5 6.4L10 13l-5 4.1 2.5-6.4-5-4.1h5.5L10 1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </li>
                      <li className="mt-2">
                        <strong>Reviews:</strong> {productData.rating.count}
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                  <p className="text-lg text-white">
                    Fetching Products Details...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
