import {Sequelize} from 'sequelize-typescript'
import { config } from "dotenv";
config()

const sequelize = new Sequelize ({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",  //kun db use grna khojeko
    port: Number(process.env.DB_PORT), //env bata aauda sting ma aaidinxa so Number ma wrap grney
    models: [__dirname + '/models']
})

sequelize.authenticate().then(()=>{
    console.log('db connected');
}) 
.catch((e)=>{
    console.log('error' + e);
})

//migrate grnu prxa
sequelize.sync({force:false})
.then(()=>{
    console.log('migrated successfully');
})
export default sequelize