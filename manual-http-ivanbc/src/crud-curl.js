import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();

const ContentType="Content-Type: application/json"
const BASE_URL=`${process.env.API_BASE_URL}:${process.env.PORT}`;

/**
 * This function run the command who is passed as parameter.
 * @param {string} command - Command to execute
 * @returns return the error or the result od the execution of the command
 */
const runCommand = (command) => {
    console.log(`\n👉 Ejecutando: ${command}\n`);
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`❌ Error: ${error.message}`);
            reject(error);
            return;
        }
        if (stderr) {
            console.error(`⚠️ stderr: ${stderr}`);
        }
        console.log(`✅ Resultado:\n${stdout}`);
        resolve(stdout);
        });
    });
};

// Para las comillas que no se leen
const buildData = (obj) => JSON.stringify(obj).replace(/"/g, '\\"');


/**
 * This function shows the result of the command to create a new student with the data passed as parameter
 * @param {Object} studentData - The data of the new student (default = {})
 */
const createStudent = async (studentData = {}) => {
    const data = buildData(studentData);
    const command = `curl -s -X POST ${BASE_URL}/students -H "${ContentType}" -d "${data}"`;
    await runCommand(command);
};

/**
 * This function shows the result of the command to see all the students
 */
const readAllStudents = async () => {
    const command = `curl -s -X GET ${BASE_URL}/students`;
    await runCommand(command);
};

/**
 * This function shows the result of the command to see the student with the id passed as parameter
 * @param {string} id - The id of the student that you want to se (default = "1")
 */
const readStudentById = async (id = "1") => {
    const command = `curl -s -X GET ${BASE_URL}/students/${id}`;
    await runCommand(command);
};

/**
 * This function shows the result of the command to update a student with the id and the new data passed as parameter
 * @param {string} id - The id of the student that you want to updated (default = "1")
 * @param {Object} studentData - The new data of the student (default = {}) 
 */
const updateStudent = async (id = "1", studentData = {}) => {
    const data = buildData(studentData);
    const command = `curl -s -X PUT ${BASE_URL}/students/${id} -H "${ContentType}" -d "${data}"`;
    await runCommand(command);
};

/**
 * This function shows the result of the command to update partially a student with the id and the partial data passed as parameter
 * @param {string} id - The id of the student that you want to do a partial update (default = "1")
 * @param {Object} partialData - The partial data to be modified (default = {})
 */
const patchStudent = async (id = "1", stundentData = {}) => {
    const data = buildData(stundentData);
    const command = `curl -s -X PATCH ${BASE_URL}/students/${id} -H "${ContentType}" -d "${data}"`;
    await runCommand(command);
};

/**
 * This function shows the result of the command to delete the student with the id passed as parameter
 * @param {string} id - The id of the student that you want to delete (default = "1")
 */
const deleteStudent = async (id = "1") => {
    const command = `curl -s -X DELETE ${BASE_URL}/students/${id}`;
    await runCommand(command);
};

const runAll = async () => {
    try {
        await createStudent({ "id": "8",
            "name": "Maria Garcia Lopez",
            "email": "maria.garcia@email.com",
            "enrollmentDate": "2024-09-15",
            "active": true,
            "level": "intermediate" });
        await readAllStudents();
        await readStudentById("1");
        await updateStudent("5", { "id": "5",
            "name": "Rosa Garcia German",
            "email": "rosa.garcia@email.com",
            "enrollmentDate": "2024-03-05",
            "active": false,
            "level": "advanced" });
        await patchStudent("3", { active: true });
        await deleteStudent("2");
    } catch (err) {
        console.error("💥 Error ejecutando las peticiones:", err);
    }
};

// # Ejecutar todas las fuciones CRUD
runAll();

