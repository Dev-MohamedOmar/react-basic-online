import { useState, ChangeEvent, FormEvent } from "react";
import { formInputsList, productList } from "./Data"
import ProductCard from "./components/ProductCard"
import Modal from "./components/UI/Modal";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {

  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: '',
    },
  }

  /* ___________ STATE ___________*/
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [errors, setErrors] = useState({title: '', description: '', imageURL: '', price: '',});

  /* ___________ HANDLER ___________*/
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;

      setProduct({
        ...product,
        [name]: value,
      });

      setErrors({
        ...errors,
        [name]: "",
      });
    }

    const onCancel = () => {
      setProduct(defaultProductObj);
      closeModal();
    }

    const submitHandler= (event: FormEvent<HTMLFormElement>): void =>  {
      event.preventDefault();

      const { title, description, imageURL, price } = product;
      const error = productValidation({
        title,
        description,
        price,
        imageURL,
      });
      console.log(error);

      // ** Check if any property has a value of "" && Check if all properties have a value of ""
      const hasErrorMessage = 
      Object.values(error).some(value => value === "") && Object.values(error).every(value => value === "");

      if (!hasErrorMessage) {
        setErrors(errors);
        return;
      }
      console.log("SEND THIS PRODUCT TO OUR SERVER");
    }

  /* ___________ RENDER ___________*/
  const renderProductList = productList.map(product => <ProductCard key={product.id} product={product}/>);

  const renderFormInputList = formInputsList.map(input => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">{input.label}</label>
      <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage message={errors[input.name]} />
    </div>
  ));


  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={openModal}>Add</Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 rounded-md">
        {renderProductList}
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal} title="Add A New Product">
        <form className="space-y-2" onSubmit={submitHandler} >
          {renderFormInputList}

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500" onClick={onCancel}>Cancel</Button>
          </div>

        </form>
      </Modal>

    </main>
  )
}

export default App