// 'use client'
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageUpload2 from "./ImageUploadWidget";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  // onRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const [resource, setResource] = useState<string[]>(value);
  const [image, setImage] = useState<string>("");
  // console.log("resource");
  // console.log(resource);
  // console.log("image");
  // console.log(image);

  useEffect(() => {
    if (image) {
      setResource([...resource, image]);
      onChange(image);
    }
  }, [image]);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  const onRemoveAction = (result: any) => {
    // onChange(result.info.secure_url);
    const url = result;
    const newRes = resource.filter((image) => image !== url);
    // console.log("newres");
    // console.log(newRes);
    setResource(newRes);
    onRemove(url);
  };

  // console.log("value");
  // console.log(value);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value &&
          value.map((url) => (
            <div key={url} className="relative w-[200px] h-[200px]">
              <div className="absolute top-0 right-0 z-10">
                <Button
                  type="button"
                  // onClick={() => onRemove(url)}
                  onClick={() => onRemoveAction(url)}
                  // onClick={() => onRemove()}
                  size="sm"
                  className="bg-red-1 text-white"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                src={url}
                alt="collection"
                className="object-cover rounded-lg"
                width={200}
                height={200}
              />
            </div>
          ))}
      </div>
      <ImageUpload2 image={image} setImage={setImage}></ImageUpload2>
      {/* <CldUploadWidget
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
      </CldUploadWidget> */}
    </div>
  );
};

export default ImageUpload;
