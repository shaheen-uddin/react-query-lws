import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="flex m-2">
     <ProductList />
     <ProductDetails />
    </div>
  );
}

export default App;
