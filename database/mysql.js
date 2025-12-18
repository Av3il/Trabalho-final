import { Sequelize } from 'sequelize';
// import mysql2 from "mysql2";
import pg from "pg";

const mysql = new Sequelize({
    dialect: 'postgres',
    dialectModule: 'pg',
    host: 'localhost',
    port: '5432',
    database: 'alfredo_n4l9',
    username: 'alfredo_n4l9_user', 
    password: 'KxoUDXHRRe3QNXclJ04ChDnK2RGbNWH5'
});

export default mysql;
