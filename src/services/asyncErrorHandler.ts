import { NextFunction, Request, Response } from "express"

//wrapper class banako 
const asyncErrorHandler = (fn:Function) =>{
    return (req:Request, res:Response, next:NextFunction)=>{
        fn(req, res, next).catch((err:Error)=>{
            return res.status(500).json({
                message : err.message,
                fullError : err
             })
            })
         }
    }


const sum = (a:string, b:number) =>{

}

export default asyncErrorHandler