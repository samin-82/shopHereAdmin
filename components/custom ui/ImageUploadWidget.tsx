import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ImageUpload2 = ({
  image,
  setImage,
}: {
  image: string;
  setImage: (value: string) => void;
}) => {
  const onUpload = (result: any) => {
    // onChange(result.info.secure_url);
    // console.log(result.info.secure_url);
    setImage(result.info.secure_url);
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="firstUpload"
        // onUpload={onUpload}
        onSuccess={(results) => {
          //   console.log(results?.info?.secure_url);
          // onChange(results?.info?.secure_url);
          // const newRes=[...resource];
          // newRes.push(results?.info.secure_url);
          // setResource([...resource, results?.info.secure_url]);
          // setResource(newRes);
          onUpload(results);
        }}
      >
        {({ open }) => {
          return (
            <Button className="bg-grey-1 text-white" onClick={() => open()}>
              <Plus className="" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload2;
