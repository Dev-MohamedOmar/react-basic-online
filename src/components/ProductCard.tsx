import { IProduct } from "../interfaces"
import { txtSlicer } from "../utils/function"
import Image from "./Image"
import Button from "./UI/Button"

interface IProps {
    product: IProduct
}

const ProductCard = ({product}: IProps) => {

    const { title, description, imageURL, price, category } = product;

    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3">
            <Image imageURL={imageURL} alt={category.name} className="rounded-md h-52 w-full lg:object-cover"/>

            <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
            <p className="text-sm text-gray-500 break-words">{txtSlicer(description)}</p>

            <div className="flex items-center space-x-2">
                <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"/>
                <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"/>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-blue-600 font-semibold">{price}</span>
                <Image imageURL={category.imageURL} alt={category.name} className="w-10 h-10 rounded-full object-bottom"/>
            </div>

            <div className="flex items-center justify-between space-x-2 mt-5">
                <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full">Edit</Button>
                <Button className="bg-red-700 hover:bg-red-800">Delete</Button>
            </div>
        </div>
    )
}

export default ProductCard