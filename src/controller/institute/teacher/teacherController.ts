import  {Response} from "express";
import IExtendedRequest from "../../../middleware/type";
import sequelize from "../../../database/connection";
import generateRandomPassword from "../../../services/generateRandomPassword";
import { QueryTypes } from "sequelize";
import sendMail from "../../../services/sendMail";



const createTeacher = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const {teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise,salary, joinedDate, courseId} = req.body;
    const teacherPhoto = req.file ? req.file.path : null 

    if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExpertise || !salary || !joinedDate){
        return res.status(400).json({
            message : "please provide teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise,salary, joinedDate"
        })
    }

    //password generate function 
    const data = generateRandomPassword(teacherName)
    const insertedData = await sequelize.query(`INSERT INTO teacher_${instituteNumber} (teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise,salary,teacherPhoto, joinedDate, teacherPassword) VALUES (?,?,?,?,?,?,?,?)`,{
        type : QueryTypes.INSERT,
        replacements : [teacherName, teacherEmail,teacherPhoneNumber, teacherExpertise, salary,teacherPhoto, joinedDate, data.hashedVersion]
    })

    const teacherData : {id:string}[]= await sequelize.query(`SELECT id FROM teacher_${
        instituteNumber} WHERE teacherEmail=?`,{
            type : QueryTypes.SELECT,
            replacements : [teacherEmail]
        })

    console.log(teacherData,"teacher data");
    await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,{
        type : QueryTypes.UPDATE,
        replacements : [teacherData[0].id, courseId]
    })

    const mailInformation = {
        to : teacherEmail,
        subject : "Welcome to the first in NEPAL SaaS FullStack Course",
        text : `We are excited to welcome you sir/madam, email: ${teacherEmail} password: ${data.plainVersion}`
    }
    await sendMail(mailInformation)

    res.status(200).json({
        message : "teacher created"
    })
}

const getTeachers = async(req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const teachers = await sequelize.query(`SELECT * FROM teacher_${instituteNumber}`,{
        type : QueryTypes.SELECT,
    
    });
    res.status(200).json({
        message : "teacher fetched",
        data : teachers
    })
}

const deleteTeacher = async(req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    await sequelize.query(`DELETE * FROM teacher_${instituteNumber} WHERE id=?`,{
        type : QueryTypes.DELETE,
        replacements : [id]
    });
    res.status(200).json({
        message : "teacher deleted successfully",
    })
}

export {createTeacher,getTeachers,deleteTeacher}