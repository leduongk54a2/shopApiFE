import React, { useState } from "react";
import ProductFormModal from "./component/ProductFormModal";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  return (
    <div className="bg-white">
      <div className="mx-5 max-w-2x lg:max-w-7xl ">
        <div
          className="px-5 py-2 ml-5 mt-5 rounded  text-white bg-blue-600 w-fit cursor-pointer"
          onClick={() => setVisible(true)}
        >
          Add
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductFormModal visible={visible} />
    </div>
  );
}

export default ProductManagement;
