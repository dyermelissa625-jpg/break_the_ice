"use client"

import { Button } from "../ui/button"
import Link from "next/link";

interface SignInButtonProps {
    className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <Button asChild className={className}>
        <Link href="auth/sign-up">Sign In</Link>
    </Button>
  );
}