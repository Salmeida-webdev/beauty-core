"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login.schema";

type UseLoginFormOptions = {
  defaultEmail?: string;
};

export function useLoginForm(
  options: UseLoginFormOptions = {},
) {
  return useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: options.defaultEmail ?? "",
      senha: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
}
