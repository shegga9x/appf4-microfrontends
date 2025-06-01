// app/store/page.tsx (this is a SERVER component by default)
"use client"; // this line is necessary to make this a CLIENT component
// export const metadata = {
//   title: "Store | Kitchen Sink",
// };
import { useRequireProfile } from "@repo/zustand";
import { useRouter } from "next/navigation";
import Store from "./store-client"; // rename your current file to store-client.tsx

export default function StorePage() {
  const router = useRouter();
  const { profile, loading } = useRequireProfile(router);
  if (loading || !profile) {
    return <p>Loading...</p>; // show spinner or skeleton while redirecting
  }

  return <Store />;
}
