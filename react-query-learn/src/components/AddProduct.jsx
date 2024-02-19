import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 0,
    thumbnail: "",
  });
  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(products);
    },
  });
  const handleChange = (e) => {
    let name = e.target.name;
    // console.log(name);
    let value =
      e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    // console.log(value);
    setState({
      ...state,
      [name]: value,
    });
    //  console.log(state);
  };
  const submitData = (evt) => {
    evt.preventDefault();
    console.log(state);
    const newData = { ...state, id: crypto.randomUUID() };
    mutation.mutate(newData);
  };
  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-2xl my-2">Add a Product</h2>
      <form onSubmit={submitData} className="flex flex-col space-y-2">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Enter product title"
          value={state.title}
          className="border rounded-sm p-2"
        />
        <textarea
          name="description"
          placeholder="Enter product description"
          onChange={handleChange}
          value={state.description}
          className="border rounded-sm p-2"
        ></textarea>
        <input
          type="number"
          name="price"
          onChange={handleChange}
          value={state.price}
          className="border rounded-sm p-2"
        />
        <input
          type="text"
          name="thumbnail"
          onChange={handleChange}
          placeholder="Enter product thumbnail.."
          className="border rounded-sm p-2"
          value={state.thumbnail}
        />
        <button
          type="submit"
          className="bg-orange-400 rounded-md text-white text-xl font-semibold py-1 hover:bg-orange-600"
        >
          Add
        </button>
      </form>
    </div>
  );
}
