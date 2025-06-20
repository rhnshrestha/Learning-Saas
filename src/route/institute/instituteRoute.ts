import express, { Router } from "express";
import {createCourseTable, createInstitute, createStudentTable, createTeacherTable} from "../../controller/institute/instituteController"; 
import isLoggedIn from "../../middleware/middleware";
const router:Router = express.Router()

router.route("/").post(isLoggedIn, createInstitute, createTeacherTable, createStudentTable, createCourseTable)

export default router