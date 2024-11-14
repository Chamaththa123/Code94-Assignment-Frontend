import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/productSlice';

export const AddProduct = () => {
  const [productData, setProductData] = useState({
    sku: '',
    quantity: '',
    productName: '',
    productDescription: '',
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(null);
  const dispatch = useDispatch();

  const handleInputChange = ({ target: { name, value } }) => {
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = ({ target: { files } }) => {
    const selectedFiles = Array.from(files);
    setImages((prevImages) => [...prevImages, ...selectedFiles]);
    setImagePreviews((prevPreviews) =>
      [...prevPreviews, ...selectedFiles.map((file) => URL.createObjectURL(file))]
    );
  };

  const handleSetMainImage = (index) => setMainImageIndex(index);

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    if (mainImageIndex === index) setMainImageIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sku', productData.sku);
    formData.append('quantity', productData.quantity);
    formData.append('product_name', productData.productName);
    formData.append('product_description', productData.productDescription);

    images.forEach((image, index) => {
      formData.append('images', image);
      formData.append('isMain', index === mainImageIndex);
    });

    dispatch(addProduct(formData));
    setProductData({ sku: '', quantity: '', productName: '', productDescription: '' });
    setImages([]);
    setImagePreviews([]);
    setMainImageIndex(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {['sku', 'quantity', 'productName'].map((field, idx) => (
        <div key={field} className={`flex gap-3 ${idx < 2 ? 'mb-3' : 'mb-4'}`}>
          <div className="w-[50%]">
            <label>{field === 'sku' ? 'Product SKU' : field === 'productName' ? 'Product Name' : 'Quantity'}</label>
            <input
              type={field === 'quantity' ? 'number' : 'text'}
              name={field}
              value={productData[field]}
              onChange={handleInputChange}
              className="bg-[#F7F7F7] w-full rounded-lg py-2"
              required
            />
          </div>
        </div>
      ))}
      
      <div className="flex gap-3 mb-3">
        <div className="w-[100%]">
          <label>Product Description</label>
          <textarea
            name="productDescription"
            value={productData.productDescription}
            onChange={handleInputChange}
            className="bg-[#F7F7F7] w-full rounded-lg py-2"
            rows="4"
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label>Product Images</label>
        <input type="file" multiple onChange={handleImageChange} className="bg-[#F7F7F7] w-full rounded-lg py-2" required />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt={`Preview ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
            <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
              &times;
            </button>
            <div className="flex items-center mt-1">
              <input type="radio" name="mainImage" checked={mainImageIndex === index} onChange={() => handleSetMainImage(index)} />
              <label className="ml-1">Set as Main</label>
            </div>
          </div>
        ))}
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Add Product</button>
    </form>
  );
};
