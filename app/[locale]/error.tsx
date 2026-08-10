"use client";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/states";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const uz=useParams<{locale:string}>().locale==="uz";
  return <div className="container-shell grid min-h-[600px] place-items-center"><div className="w-full max-w-lg"><ErrorState title={uz?"Sahifani yuklab bo‘lmadi":"Something went wrong"} body={uz?"Ma’lumotlaringiz saqlanib qoladi. Sahifani qayta yuklab ko‘ring.":"Your data is safe. Please try loading this page again."}/><Button className="mt-4" onClick={reset}>{uz?"Qayta urinish":"Try again"}</Button></div></div>;
}
