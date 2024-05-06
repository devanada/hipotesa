"use client";

import { Category } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormAction } from "@/lib/hooks/useFormAction";
import { editCategory } from "@/lib/actions/categories";

interface Props {
  data: Category;
}

export default function Form(props: Props) {
  const formActionWithId = editCategory.bind(null, props.data.id);
  const [errorMsg, formAction] = useFormAction(formActionWithId);

  return (
    <form
      className="grid gap-4 lg:grid-cols-3 lg:gap-8"
      id="create-form"
      action={formAction}
    >
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>
              Details about your category for your product
            </CardDescription>
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
                  placeholder="Power Supply"
                  defaultValue={props.data.name}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
