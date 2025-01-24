"use client";

import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProductDetails = async () => {
    const { productId } = await params;
    try {
      //   const res = await fetch(`/api/products/${params.productId}`, {
      const res = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
      console.log(productDetails);
    } catch (err) {
      console.log("[productId_GET]", err);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  console.log(productDetails);

  return loading ? <Loader /> : <ProductForm initialData={productDetails} />;
  return <div>hi</div>
};

export default ProductDetails;
