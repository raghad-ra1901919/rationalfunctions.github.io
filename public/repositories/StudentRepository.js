export async function createStudent(student){
    try{
        const response = await fetch(`/api/students`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(student)
        });
        return await response.json();
    }
    catch(error){
        console.log(error);
        return null;
    }
}

export async function updateStudentSurvey(uuid, values){
    try{
        const student = await fetch(`api/students/${uuid}/survey`, {
            headers: {"Content-Type": "application/json"},
            method: "PUT",
            body: JSON.stringify(values)
        });
        return await student.json();
    }
    catch(error){
        console.log(error);
    }
}

export async function updateStudentTest(uuid, values){
    try{
        const student = await fetch(`api/students/${uuid}/test`, {
            headers: {"Content-Type": "application/json"},
            method: "PUT",
            body: JSON.stringify(values)
        });
        return await student.json();
    }
    catch(error){
        console.log(error);
    }
}

export async function getStats(){
    try{
        const result = await fetch(`/api/survey-statistics`,{
            headers: {"Content-Type": "application/json"},
            method: "GET",
        });
        return await result.json();
    }
    catch (e) {
        console.log(e);
    }
}

export async function getStudents(){
    try{
        const result = await fetch(`/api/students`);
        return await result.json();
    }
    catch(error){
        console.log(error);
    }
}