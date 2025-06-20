import { Request } from "express"

interface IExtendedRequest extends Request{
    user ?: {
        id : string,
        currentInstituteNumber? : number | string | null
    },       
    instituteNumber ?: number | string 
}


export default IExtendedRequest