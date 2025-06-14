import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router} from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import {z} from "zod"
export const appRouter =router({
   authCallback: publicProcedure.query(async()=>{
    const {getUser}=getKindeServerSession();
    const user=await getUser();

    if(!user?.id || !user.email) throw new TRPCError({code:"UNAUTHORIZED"})
    //check if the user is in the database or not
    const dbUser=await db.user.findFirst({
         where:{
            id:user.id
         }
      })

    if(!dbUser){
      //create the new user
      await db.user.create({
         data:{
            id:user.id,
            email:user.email
         }
      })
    }
    return {success:true}
   }),
// ctx-> context data passed by middleware
   getUserFiles:privateProcedure.query(async ({ctx})=>{
      const {userId}=ctx;

      return await db.file.findMany({
         where:{
            userId
         }
      })
   }),

   deleteFile:privateProcedure.input(
      z.object({id:z.string()})
   ).mutation(async ({ctx,input})=>{
         const {userId}=ctx;
            
         const file = await db.file.findFirst({
            where:{
               id:input.id,
               userId
            }
         })

         if(!file) throw new TRPCError({code:"NOT_FOUND"})

         await db.file.delete({
            where:{
               id:input.id,
            }
         })
         return file

   }),

   updateFileName: privateProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().min(1).optional(),
      
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { userId } = ctx;

    // Check if file exists and belongs to the user
    const file = await db.file.findFirst({
      where: {
        id: input.id,
        userId,
      },
    });

    if (!file) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    // Update the file with the given fields
    const updatedFile = await db.file.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name ?? file.name,
        
      },
    });

    return updatedFile;
  })

})


export type AppRouter=typeof appRouter;