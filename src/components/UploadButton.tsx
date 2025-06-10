"use client"

import { Dialog, DialogTrigger,DialogContent,DialogDescription,
  DialogHeader,
  DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";


const UploadButton =()=>{
     const [isOpen,setIsOpen]=useState<boolean>(false);

     return (
        <Dialog open={isOpen} onOpenChange={(visible)=>{
            if(!visible){
                setIsOpen(visible);
            }
        }}>
            <DialogTrigger asChild onClick={()=>setIsOpen(true)}>
                <Button>
                    Upload PDF
                </Button>
            </DialogTrigger>

            <DialogContent><DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader></DialogContent>
        </Dialog>
     )
}

export default UploadButton;