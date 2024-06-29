// ** productObj === errorObj (Title, Description, Image, Price)

export const productValidation = (product: { title: string, description: string, imageURL: string, price: string }) => {
    // ** Returns an object
    const error: { title: string, description: string, imageURL: string, price: string } = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    };

    // ** Regular Expression
    const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        error.title = "Product title must be between 10 and 80 characters!";
    }

    if (!product.description.trim() || product.description.length < 10 || product.description.length > 80) {
        error.description = "Product description must be between 10 and 900 characters!";
    }

    if (!product.imageURL.trim() || !validUrl) {
        error.imageURL = "Valid image URL is required!";
    }

    if (!product.price.trim() || isNaN(Number(product.price))) {
        error.price = "Valid price is required!";
    }

    return error
}