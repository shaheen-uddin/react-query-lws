import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

function App() {
  const [productId, setProductId] = useState("");

  const getProductId = (id) => {
    setProductId(id);
  };
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList getProductId={getProductId} />
      <ProductDetails id={productId} />
    </div>
  );
}

export default App;
