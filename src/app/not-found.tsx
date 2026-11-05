import { redirect } from "next/navigation";

// Unknown paths outside a locale fall back to the default locale.
export default function RootNotFound() {
  redirect("/en");
}
