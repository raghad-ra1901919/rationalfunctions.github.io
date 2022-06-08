import mongoose from "mongoose";
import Student from "../models/student.js";
import Users from "../models/users.js";
import fs from "fs-extra";

export default class StudentRepo {
    async initialize() {
        try {
            const hostname = "localhost";
            const port = "27017";
            const database = "students";
            const uri = `mongodb://${hostname}:${port}/${database}`;
           // const deploymenturi = `mongodb+srv://shadowomizi:qaIC1MvsrU4aUCOv@projects.o8ea3.mongodb.net/?retryWrites=true&w=majority`

            mongoose.connect(uri, async function(error) {
                if (error) {
                    console.error(error);
                }
            });

            await Student.deleteMany();
            try {
                const data = await fs.readJSON(`./public/data/students.json`);
                data.forEach(async (element) => {
                    await Student.create(element);
                });
            } catch (error) {
                console.log("Error initialising", Student);
                console.log(error);
            }


            await Users.deleteMany(); //initalize teacher login details
            try {
                const data = await fs.readJSON(`./public/data/users.json`);
                data.forEach(async (element) => {
                    await Users.create(element);
                });
            } catch (error) {
                console.log("Error initialising", Users);
                console.log(error);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    async addStudent(student){
        const studentObject = await Student.create(student);
        return studentObject._id.toString();
    }

    async getStudents(){
        try{
        return await Student.find({}, { _id: 0, __v: 0 }).sort({ date: 1 });
        }
        catch (error) {
            console.log(error);
        }
    }

    async updateStudentSurvey(uuid, answer){
        try{
            return await Student.findOneAndUpdate({_id: uuid},{survey: answer});
        }
        catch (e) {
            console.log(e);
        }
    }

    async updateStudentTest(uuid, answer){
        try{
            return await Student.findOneAndUpdate({_id: uuid},{test: answer});
        }
        catch (e) {
            console.log(e);
        }
    }

    async getStats(){
        const participants = await Student.aggregate([
            { $group: { _id: null, count: { $sum: 1 } } },
        ]);

        const statAnalysis = [];
        for(let j = 0; j<10; j++) {
            let answers = await Student.aggregate([
                {
                    "$group": {
                        "_id": {"$arrayElemAt": ["$survey", j]},
                        "count": {"$sum": 1}
                    }
                }
            ])
            statAnalysis.push(answers);
        }

        return {participants, statAnalysis};
}
}