import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../redux/productSlice";
import { Loader } from "../../components/Loader";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select state from Redux
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  // Fetch the product data
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="md:flex mt-5 font-satoshi">
    <div className="md:w-[50%] w-full px-5">
  {selectedProduct?.images && selectedProduct.images.length > 0 ? (
    <>
      <div className="main-image mb-4">
        <img
          src={selectedProduct.images.find((img) => img.isMain)?.path}
          alt="Main product"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>
      <div className="related-images">
        <div className="sub-images grid grid-cols-3 gap-2">
          {selectedProduct.images
            .filter((img) => !img.isMain)
            .map((img) => (
              <img
                key={img._id}
                src={img.path}
                alt="Product thumbnail"
                className="w-full h-auto object-cover rounded-md"
              />
            ))}
        </div>
      </div>
    </>
  ) : (
    <p className="text-gray-500">No images available</p>
  )}
</div>



      <div className="md:w-[50%] w-full">
        <div className="font-medium text-[#001EB9] text-[16px]">
          {selectedProduct?.sku}
        </div>
        <div className="flex py-3 text-[18px] text-[#162427]">
          <div className="w-[30%] font-bold">Product Name</div>
          <div className="w-[70%] font-normal">
            {selectedProduct?.product_name}
          </div>
        </div>
        <div className="flex py-3 text-[18px] text-[#162427]">
          <div className="w-[30%] font-bold">Product Description</div>
          <div className="w-[70%] font-normal">
            {selectedProduct?.product_description}
          </div>
        </div>
        <div className="flex py-3 font-bold text-[18px] text-[#162427]">
          <div className="w-[30%] font-bold">Product Quantity</div>
          <div className="w-[70%] font-normal">{selectedProduct?.quantity}</div>
        </div>
      </div>
    </div>
  );
};
