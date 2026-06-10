import type { Metadata } from "next";
import { CheckoutPage } from "@/components/templates/kreator-studio/slices/checkout/CheckoutPage";

export const metadata: Metadata = { title: "Checkout" };

export default function Page() {
  return <CheckoutPage />;
}
