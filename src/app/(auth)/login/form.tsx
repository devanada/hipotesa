"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { CustomFormField } from "@/components/custom-formfield";
import { ButtonForm } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import { LoginSchema, loginSchema } from "@/lib/types/auth";
import { IResponseFailed } from "@/lib/types/api";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    // TODO: Handle redirect here whether there is callbackUrl on query params or not
    const response = await signIn("credentials", data);

    if (!response?.ok) {
      return toast((JSON.parse(response?.error!) as IResponseFailed).message);
    }
  };

  return (
    <Form {...form}>
      <form
        data-testid="form-login"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full md:w-3/4 lg:w-1/2"
      >
        <CustomFormField control={form.control} name="email" label="Email">
          {(field) => (
            <Input
              {...field}
              data-testid="input-email"
              placeholder="name@domain.com"
              type="email"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              value={field.value as string}
            />
          )}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          name="password"
          label="Password"
        >
          {(field) => (
            <Input
              {...field}
              data-testid="input-password"
              placeholder="Password"
              type="password"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              value={field.value as string}
            />
          )}
        </CustomFormField>
        <div className="flex flex-col mt-20 gap-y-5 relative">
          <ButtonForm
            data-testid="btn-submit"
            type="submit"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 mr-2 animate-spin w-4" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </ButtonForm>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <ButtonForm
            data-testid="btn-navigate"
            type="button"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
            variant="outline"
            asChild
          >
            <Link href="/register">Register</Link>
          </ButtonForm>
        </div>
      </form>
    </Form>
  );
}
