import StudentRepo from "../repository/student-repo.js";

const studentRepo = new StudentRepo();
studentRepo.initialize();

export default class StudentService {
    async addStudent(req, res) {
        try {
            const response = await studentRepo.addStudent(req.body)
            res.json(response);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getStudents(req, res) {
        try {
            const response = await studentRepo.getStudents();
            res.json(response);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async updateStudentSurvey(req, res) {
        try {
            const student = await studentRepo.updateStudentSurvey(req.params.uuid, req.body);
            if(student)
                res.status(200).json(student);
            else
                res.sendStatus(404);
        }
        catch(e){
            res.status(500).send(e);
        }
    }

    async updateStudentTest(req, res) {
        try {
            const student = await studentRepo.updateStudentTest(req.params.uuid, req.body);
            if(student)
                res.status(200).json(student);
            else
                res.sendStatus(404);
        }
        catch(e){
            res.status(500).send(e);
        }
    }

    async getStats(req,res) {
        try{
            const result = await studentRepo.getStats();
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).send(e);
        }
    }
}