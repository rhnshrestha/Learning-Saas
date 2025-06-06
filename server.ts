import app from "./src/app"
import { config } from "dotenv";
config()

//importing connection.ts
import "./src/database/connection"

function startServer(){
    const port = process.env.port
    app.listen(port, ()=>{
        console.log(`Server has started at port ${port} `);
    })
}
startServer()