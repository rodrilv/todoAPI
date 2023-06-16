import { config } from "dotenv";config();

process.env.PORT = process.env.PORT || 3000;
//PORT 
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//ENVIRONMENT
process.env.DEV_DB = process.env.DEV_DB || '';
//DATABASE
