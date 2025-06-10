import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper=({
    clasName,
    children
}:{
    clasName?:string
    children:ReactNode
})=>{
   return <div className={cn(" mx-auto w-full max-w-screen px-2.5 md:px-20",clasName)}>
       {children}
   </div>
} 

export default MaxWidthWrapper;