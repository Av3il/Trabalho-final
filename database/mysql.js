import { Sequelize } from 'sequelize';
import mysql2 from "mysql2";

const mysql = new Sequelize({
    dialect: 'mysql',
    dialectModule: mysql2,
    host: 'localhost',
    port: '3306',
    database: 'proj_Sportzone',
    username: 'root', 
    password: 'root'
});

export default mysql;