import {getStudents} from "../repositories/StudentRepository.js";

document.addEventListener("DOMContentLoaded", start);

async function start(){
    const submit = document.querySelector("#submit");
    submit.addEventListener("click", async () => {
        await generateReport();
    })
}

async function generateReport(){
    const students = await getStudents();
    console.log(students);

    const data = [];
    const flat = (obj) => Object.values(obj).flat();
    students.forEach((element) => {
        data.push(flat(element));
    });
    console.log(data);
    data.unshift(["role",
        "survey-question-1", "survey-question-2","survey-question-3","survey-question-4","survey-question-5",
        "survey-question-6","survey-question-7","survey-question-8","survey-question-9","survey-question-10",
        "test-question-1","test-question-2","test-question-3","test-question-4","test-question-5",
        "test-question-6","test-question-7","date"]);
    const csvFile = await dataToCSV(data);
    console.log(csvFile);
   await downloadFile(csvFile, 'studentSurvey.csv', 'text/csv;charset=utf-8;')
 }

async function dataToCSV(data){
    return data.map(row =>
            row
            .map(String).map(v => v.replaceAll('"', '""'))
            .map(v => `"${v}"`).join(','))
            .join('\r\n');

}

async function downloadFile(content, filename, contentHeader) {
    const binaryFile = new Blob([content], { type: contentHeader });
    let url = URL.createObjectURL(binaryFile);
    let downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', filename);
    downloadLink.click();
}