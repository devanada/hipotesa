"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { CustomFormField } from "@/components/custom-formfield";
import { ButtonForm } from "@/components/ui/button-form";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import { RegisterSchema, registerSchema } from "@/lib/types/auth";
import { useFormAction } from "@/lib/hooks/useFormAction";
import { postRegister } from "@/lib/actions/auth";

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormAction(postRegister);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!state) return;

    if (state.message.length !== 0) {
      toast(state.message);
    }
  }, [state]);

  return (
    <Form {...form}>
      <form
        data-testid="form-login"
        className="space-y-8 w-full md:w-3/4 lg:w-1/2"
        action={formAction}
        onSubmit={(e) => {
          form.trigger();
          if (form.formState.isValid) {
            formRef.current?.requestSubmit();
          } else {
            e.preventDefault();
          }
        }}
      >
        <CustomFormField control={form.control} name="name" label="Name">
          {(field) => (
            <Input
              {...field}
              data-testid="input-name"
              placeholder="John Doe"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            />
          )}
        </CustomFormField>
        <CustomFormField control={form.control} name="email" label="Email">
          {(field) => (
            <Input
              {...field}
              data-testid="input-email"
              placeholder="john_doe@mail.com"
              type="email"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
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
            />
          )}
        </CustomFormField>
        <div className="flex flex-col mt-20 gap-y-5 relative">
          <ButtonForm data-testid="btn-submit" type="submit">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 mr-2 animate-spin w-4" />
                Please wait
              </>
            ) : (
              "Sign up"
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
            variant="outline"
            asChild
          >
            <Link href="/login">Sign in</Link>
          </ButtonForm>
        </div>
      </form>
    </Form>
  );
}
