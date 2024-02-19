import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const retrievedProduct = async ({queryKey}) => {
   const response = await axios.get(`http://localhost:3000/${queryKey[0]}/${queryKey[1]}`);
   return response.data;
}

export default function ProductDetails({id}) {

  const {data: product, error, isLoading} = useQuery({
    queryKey: ["products", id],
    queryFn: retrievedProduct(id),
  })
  if(isLoading) return <div>Product retrieving ....</div>
  if(error) return <div>An error occured. Error : {error.message} ....</div>
  return (
    <div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, aliquid.
    </div>
  )
}
