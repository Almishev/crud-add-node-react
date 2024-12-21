
import pkg from 'pg';
const { Pool } = pkg;

export const db = new Pool({
  user: 'user1',
  host: 'localhost',
  database: 'users-test1234',
  password: 'asroma',
  port: 5432, 
});