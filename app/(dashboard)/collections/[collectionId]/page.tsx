"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import React from "react";
import { useEffect, useState } from "react";
import { string } from "zod";

const CollectionDetails = ({
  params,
}

: {
  // params: { collectionId: string };
  params: any;
}

) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  interface paramTypes {
    collectionId: string;
  }
  const { collectionId } = React.use<paramTypes>(params);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  console.log(collectionDetails);

  return loading ? <Loader /> : <CollectionForm initialData={collectionDetails} />;
};

export default CollectionDetails;
