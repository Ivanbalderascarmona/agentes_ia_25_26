import dotenv from "dotenv";

dotenv.config();

const ContentType="Content-Type: application/json"
const BASE_URL=`${process.env.API_BASE_URL}:${process.env.PORT}`;

/**
 * This function shows the command to create a new student with the data passed as parameter
 * @param {Object} studentData - The data of the new student (default = {})
 */
const createStudent= (studentData={}) => {
    const commandPost = `curl -i -X POST ${BASE_URL}/students -H "${ContentType}" -d '${JSON.stringify(studentData)}'`;

    console.log(`The command to create the student is : ${commandPost}\n`);
};

/**
 * This function shows the command to see all the students
 */
const readAllStudents= () => {
    console.log(`The command to see all the students is : curl -i -X GET ${BASE_URL}/students\n`);
};

/**
 * This function shows the command to see the student with the id passed as parameter
 * @param {string} id - The id of the student that you want to se (default = "1")
 */
const readStudentsById=(id="1")=>{
    console.log(`The command to see the student with id = ${id} is : curl -i -X GET ${BASE_URL}/students/${String(id)}\n`);
};

/**
 * This function shows the command to update a student with the id and the new data passed as parameter
 * @param {string} id - The id of the student that you want to updated (default = "1")
 * @param {Object} studentData - The new data of the student (default = {}) 
 */
const updatedStudent=(id=1, studentData={})=>{
    console.log(`The command to updated a student with id = ${id} and new data as parameter is : curl -i -X PUT ${BASE_URL}/students/${String(id)} -H "${ContentType}" -d '${JSON.stringify(studentData)}'\n`);
};

/**
 * This function shows the command to update partially a student with the id and the partial data passed as parameter
 * @param {string} id - The id of the student that you want to do a partial update (default = "1")
 * @param {Object} partialData - The partial data to be modified (default = {})
 */
const patchStudent=(id="1",partialData={})=>{
    console.log(`The command to updated the student with id = ${id} and the data partially as parameter is: curl -i -X PATCH ${BASE_URL}/students/${String(id)} -H "${ContentType}" -d '${JSON.stringify(partialData)}'\n`);
};

/**
 * This function shows the command to delete the student with the id passed as parameter
 * @param {string} id - The id of the student that you want to delete (default = "1")
 */
const deleteStudent=(id)=>{
    console.log(`The command to delete the student with id = ${id} is : curl -i -X DELETE ${BASE_URL}/students/${String(id)}\n`);
};


const newStudent={"id":"8", "name":"Ivan Balderas Carmona", "email": "ivanbalderas@gmail.com", "enrollmentDate": "2024-03-08", "active": false, "level": "advanced"};
console.log("Comando 1: -------------------------------------------------");

createStudent(newStudent);

console.log("Comando 2: -------------------------------------------------");
readAllStudents();

console.log("Comando 3: -------------------------------------------------");
readStudentsById("5");

const newStudentData={"id":"2", "name": "Juan Lopez Lopez", "email": "juan.lopez@gmail.com", "enrollmentDate":"2024-01-16", "active":false, "level": "intermediate"};

console.log("Comando 4: -------------------------------------------------");
updatedStudent("4",newStudentData);

const partiallyStudentData={"active": true};

console.log("Comando 5: -------------------------------------------------");
patchStudent("7",partiallyStudentData);

console.log("Comando 6: -------------------------------------------------");
deleteStudent("3");
