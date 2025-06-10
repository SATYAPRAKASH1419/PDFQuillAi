"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const { data, isLoading, isError, isSuccess ,error} = trpc.authCallback.useQuery(undefined,
    {   retry: true,
        retryDelay: 500});
        console.log("reached in authcallback page")
  useEffect(()=>{
    if (isSuccess) {
      console.log("inside isSuccess")
    router.push(origin ? `/${origin}` : "/dashboard");
  }
  if(isError){
    console.log("inside is error")
    if(error.data?.code ==="UNAUTHORIZED"){
      router.push("/sign-in")
    }
  }
  },[isSuccess, isError, error, origin, router])

  return (
    <div className="w-full mt-24 flext justify-center">
      <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-800"/>
            <h3 className="font-semibold text-xl">Setting up your account...</h3>
            <p>
              you will be redirected automatically.
            </p>
      </div>
    </div>
  )
  
};

export default Page;
