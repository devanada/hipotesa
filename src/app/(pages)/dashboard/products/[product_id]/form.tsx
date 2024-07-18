"use client";

import { ChangeEvent, useState } from "react";
import { Category } from "@prisma/client";
import { Upload } from "lucide-react";
import Image from "next/image";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFormAction } from "@/utils/hooks/use-form-action";
import { ProductExtend } from "@/utils/types/products";
import { handleEditProduct } from "@/utils/actions/products";

interface Props {
  data: ProductExtend;
  categories: Category[];
}

export default function Form(props: Props) {
  const formActionWithId = handleEditProduct.bind(null, String(props.data.id));
  const [errorMsg, formAction] = useFormAction(formActionWithId);
  const [imageSrc, setImageSrc] = useState(
    props.data.image ?? "/placeholder.svg"
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedFile = event.target.files[0];
    setImageSrc(URL.createObjectURL(selectedFile));
  };

  return (
    <form
      className="grid gap-4 lg:grid-cols-3 lg:gap-8"
      id="create-form"
      action={formAction}
    >
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Details about your product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full"
                  placeholder="Lenovo R27Q Gaming Monitor"
                  defaultValue={props.data.name}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="min-h-32"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                  defaultValue={props.data.description}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  className="w-full"
                  placeholder="xxxxxx"
                  defaultValue={props.data.price}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-07-chunk-2">
          <CardHeader>
            <CardTitle>Product Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category_id"
                  defaultValue={String(props.data.category_id)}
                >
                  <SelectTrigger id="category" aria-label="Select category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {props.categories.map((category) => (
                      <SelectItem value={String(category.id)} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
            <CardDescription>List of your product images</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Image
                id="product-image-1"
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                src={imageSrc}
                width="300"
                priority
              />
              <div className="grid grid-cols-3 gap-2">
                <label
                  htmlFor="input-image"
                  className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </label>
                <input
                  id="input-image"
                  name="image"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
