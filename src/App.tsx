import { useState, ChangeEvent, FormEvent } from "react";
import { colors, formInputsList, productList } from "./Data"
import ProductCard from "./components/ProductCard"
import Modal from "./components/UI/Modal";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage";
import CircleColor from "./components/CircleColor";
import { v4 as uuid } from 'uuid';

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
  const [errorMessage, setErrorMessage] = useState({title: '', description: '', imageURL: '', price: ''});
  const [tempColor, setTempColor] = useState<string[]>([]);
  /* ___________ ADD & UPDATE PRODUCT ___________*/
  const [products, setProducts] = useState<IProduct[]>(productList);

  /* ______________________________ Type Annotations ________ */
  const[product, setProduct] = useState<IProduct>(defaultProductObj);

  /* ___________ HANDLER ___________*/
    const closeModal = () => setIsOpen(false);
    const openModal = () => setIsOpen(true);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;

      setProduct({
        ...product,
        [name]: value,
      });

      setErrorMessage({
        ...errorMessage,
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
      const hasErrorMessage = Object.values(error).some(value => value === "") && Object.values(error).every(value => value === "");

      if (!hasErrorMessage) {
        setErrorMessage(error);
        return;
      }

      setProducts(prev => [{...product, id: uuid(), colors: tempColor}, ...prev]);
      setProduct(defaultProductObj);
      setTempColor([]);
      closeModal();
    }

  /* ___________ RENDER ___________*/
  const renderProductList = products.map(product => <ProductCard key={product.id} product={product}/>);

  const renderFormInputList = formInputsList.map(input => {
    return (
      <div className="flex flex-col" key={input.id}>
        <label htmlFor={input.id} className="mb-[2px] text-sm font-medium text-gray-700">{input.label}</label>
        <Input type={input.type} name={input.name} id={input.id} value={product[input.name]} onChange={onChangeHandler} />
        <ErrorMessage message={errorMessage[input.name]} />
      </div>
    );
  });

  /* ___________ Render Circle Colors ___________ */
  const renderProductColors = colors.map(color => (
    <CircleColor key={color} color={color} onClick={() => {
      if (tempColor.includes(color)) {
        setTempColor(prev => prev.filter(item => item !== color));
        return;
      }
      setTempColor(prev => [...prev, color]);
    }} />
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

          <div className="flex items-center flex-wrap space-x-1">{renderProductColors}</div>

          <div className="flex items-center flex-wrap space-x-1">
            {tempColor.map(color => (
              <span 
                key={color} style={{backgroundColor: color}}
                className="p-1 mr-1 mb-1 text-xs rounded-md text-white"
              >{color}
              </span>
            ))}
          </div>

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