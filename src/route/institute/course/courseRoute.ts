import express, { Router } from "express";
import isLoggedIn from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncErrorHandler";
import { createCourse, deleteCourse, getCourses, getSingleCourse } from "../../../controller/institute/course/courseController";

const router:Router = express.Router()

router.route("/")
.post(isLoggedIn,asyncErrorHandler(createCourse))
.get(asyncErrorHandler(getCourses))

router.route("/:id")
.get(asyncErrorHandler(getSingleCourse))
.delete(asyncErrorHandler(deleteCourse))

export default router