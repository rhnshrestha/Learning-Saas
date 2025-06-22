//multer configuration
//disc storage --> inbuilt method 

import { Request } from "express";
import multer from "multer";
const storage  = multer.diskStorage({
    destination : function(req:Request, file: Express.Multer.File, cb:any){
        cb(null, './src/storage')  //error aayo vani null, success vayo vani tyo location ma rakhdey vaneko cb=callback function
    },
    filename : function(req:Request, file:Express.Multer.File, cb:any){
        cb(null,Date.now() + file.originalname + "_haha")
    }
})

export {multer, storage}