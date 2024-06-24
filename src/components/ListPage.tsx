import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
}

const ListPage: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart, showPopup } = useCart();
  return (
    <>
      <section className="bg-white dark:bg-gray-700">
        <div className="grid max-w-screen-xl px-4 mx-auto">
          <div className="mx-auto w-full max-w-screen-xl py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 cursor-pointer text-white">
              {products &&
                products.map((product) => (
                  <div
                    key={product.id} // Add a key to the root element in the map to avoid warnings
                    className="relative overflow-hidden bg-blue-30 shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:scale-105 dark:bg-gray-800"
                  >
                    <Link to={`/products/${product.id}`}>
                      <img
                        className="object-cover h-48 mb-3"
                        src={product.image}
                        alt=""
                      />
                      <h2 className="text-lg font-semibold mb-2">
                        {product.title}
                      </h2>
                      <p className="text-gray-400 mb-2">
                        <strong>Description:</strong>{" "}
                        {product.description.length > 100
                          ? `${product.description.slice(0, 100)}...`
                          : product.description}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Category: </strong>
                        {product.category}
                      </p>
                      <p className="text-gray-400 mb-2">
                        <strong>Price: </strong>
                        {product.price}
                      </p>
                    </Link>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(product);
                          showPopup('Item added to cart');
                        }}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      >
                        Add to Cart
                      </button>

                      <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300">
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListPage;
