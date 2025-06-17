import { Request } from "express";

interface IExtendedRequest extends Requestest {
    user : {
        id : string,
        
    }
}