import { useState } from "react";
import { productList } from "./Data"
import ProductCard from "./components/ProductCard"
import Modal from "./components/UI/Modal";
import Button from "./components/UI/Button";

const App = () => {

  /* ___________ STATE ___________*/
  const [isOpen, setIsOpen] = useState(false);

  /* ___________ HANDLER ___________*/
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

  /* ___________ RENDER ___________*/
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product}/>);

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>Add</Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <div className="flex items-center space-x-2">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button className="bg-gray-400 hover:bg-gray-700">Cancel</Button>
        </div>
      </Modal>

    </main>
  )
}

export default App