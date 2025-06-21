import { Response } from "express";
import sequelize from "../../../database/connection";
import IExtendedRequest from "../../../middleware/type";

const getStudents = async(req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const students = await sequelize.query(`SELECT * FROM student_${instituteNumber}`);
    res.status(200).json({
        message: "students fetched",
        data: students
    })
}
export default getStudents