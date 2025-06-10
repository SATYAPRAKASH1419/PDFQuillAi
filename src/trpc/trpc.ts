import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
const t = initTRPC.create();

const middleWare = t.middleware;


const isAuth =middleWare(async (options)=>{

    const {getUser} =getKindeServerSession();
    const user=await getUser();

    if(!user || !user.id){
        throw new TRPCError({code:"UNAUTHORIZED"})
    }

    return options.next({
        ctx:{
            userId:user.id,
            user
        }
    })

})
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure=t.procedure.use(isAuth);