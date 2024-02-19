import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const retrievedProducts = async ({queryKey}) => {
    console.log(queryKey[0]);
    const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);
    return response.data;

}

export default function ProductList() {
    const { data: products, error, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: retrievedProducts,
        retry: false,
        refetchInterval: 1000,
    })

    console.log(products, error, isLoading);
    if(isLoading) return <div>Loading products .....</div>
    if(error) return <div>An error occured. {error.message}</div>
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h2 className="text-3xl my-2">Product List</h2>
      <u className="list-none flex flex-row flex-wrap justify-center items-center">
      {
        products && products.map(product => (
            <li  key={product.id} 
            className="flex flex-col items-center m-2 border rounded-md"
            >
               <img 
                    className="object-cover h-32 w-48 rounded-sm"
                    src={product.thumbnail ? product.thumbnail: "" }
                    alt={product?.title}
               />
               <p className="text-xl m-3">{product.title}</p>

            </li>
        ))
      }
      </u>
    </div>
  )
}
