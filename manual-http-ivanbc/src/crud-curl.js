import dotenv from "dotenv";

dotenv.config();

const BASE_URL=`${process.env.API_BASE_URL}:${process.env.PORT}`;

const createStudent= (studentData={}) => {
    const command = `curl -X POST ${BASE_URL}/students -H "Content-Type: application/json" -d '${studentData}'`;

    console.log("CREATE command:", command);
};