import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrievedProduct = async ({ queryKey }) => {
  /*  console.log(queryKey); */
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

export default function ProductDetails({ id }) {
  /*  console.log(id); */
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrievedProduct,
  });

  if (isLoading) return <div>Product retrieving ....</div>;
  if (error) return <div>An error occured. Error : {error.message} ....</div>;

  return (
    <div className="w-1/5">
      {id && (
        <>
          <h1 className="text-3xl my-2">Product Details</h1>
          <div className="border bg-gray-100 p-2.5 text-md rounded flex flex-col">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-cover h-24 w-24 border rounded-full m-auto"
            />
            <p>{product.title}</p>
            <p>{product.description}</p>
            <p>USD -{product.price}</p>
            <p>{product.rating}</p>
          </div>
        </>
      )}
    </div>
  );
}
