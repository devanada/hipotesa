"use client";

import { Input, InputMessage } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFormAction } from "@/utils/hooks/use-form-action";
import { handleAddCategory } from "@/utils/actions/categories";

export default function Form() {
  const [errorMsg, formAction] = useFormAction(handleAddCategory);

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
                  defaultValue=""
                />
                <InputMessage message={errorMsg.reason?.["name"]} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
