import dotenv from "dotenv";

dotenv.config();

const ContentType="Content-Type: application/json"
const BASE_URL=`${process.env.API_BASE_URL}:${process.env.PORT}`;

/**
 * This function shows the command to create a new student with the data passed as parameter
 * @param {object} studentData - The data of the new student (default = {})
 */
const createStudent= (studentData={}) => {
    const commandPost = `curl -X POST ${BASE_URL}/students -H "${ContentType}" -d '${JSON.stringify(studentData)}'`;

    console.log(`Create new student command: ${commandPost}`);
};

/**
 * This function shows the command to see all the students
 */
const readAllStudents= () => {
    console.log(`See students command: curl -X GET ${BASE_URL}/students`);
};

/**
 * This function shows the command to see the student with the id passed as parameter
 * @param {number} id - The id of the student that you want to se (default = {})
 */
const readStudentsById=(id=1)=>{
    console.log(`The command to see the student with id = ${id} is : curl GET ${BASE_URL}/students/${id}`);
};

/**
 * This function shows the command to update a student with the id and the new data passed as parameter
 * @param {number} id - The id of the student that you want to updated (default = 1)
 * @param {object} studentData - The new data of the student (default = {}) 
 */
const updatedStudent=(id=1, studentData={})=>{
    console.log(`The command to updated a student with id = ${id} and student = ${studentData} is : curl -X PUT ${BASE_URL}/students/${id} -H "${ContentType}" -d '${JSON.stringify(studentData)}'`);
};

/**
 * This function shows the command to update partially a student with the id and the partial data passed as parameter
 * @param {number} id - The id of the student that you want to do a partial update (default = 1)
 * @param {object} partialData - The partial data to be modified (default = {})
 */
const patchStudent=(id=1,partialData={})=>{
    console.log(`The command to updated the student partially with id = ${id} and the data to remplace = ${partialData} is: curl -X PATCH ${BASE_URL}/students/${id} -H "${ContentType}" -d '${JSON.stringify(partialData)}'`);
};

/**
 * This function shows the command to delete the student with the id passed as parameter
 * @param {number} id - The id of the student that you want to delete (default = 1)
 */
const deleteStudent=(id)=>{
    console.log(`The command to delete the student with id = ${id} is : curl -X DELETE ${BASE_URL}/students/${id}`);
};