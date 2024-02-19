import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductDetails from "./ProductDetails";

const retrievedProducts = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
  return response.data;
};

export default function ProductList({ getProductId }) {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retrievedProducts,
    retry: false,
  });
  /* 
  console.log(products, error, isLoading); */
  if (isLoading) return <div>Loading products .....</div>;
  if (error) return <div>An error occured. {error.message}</div>;
  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <u className="list-none flex flex-row flex-wrap justify-center items-center">
        {products &&
          products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 border rounded-md"
              onClick={() => getProductId(product.id)}
            >
              <img
                className="object-cover h-32 w-48 rounded-sm"
                src={product.thumbnail ? product.thumbnail : ""}
                alt={product?.title}
              />
              <p className="text-xl m-3">{product.title}</p>
            </li>
          ))}
      </u>
    </div>
  );
}
