import mysql from 'mysql2';

const host = process.env.DBHOST;
const port = process.env.PORT;

const dbInfo = {
    host: host,
    user: 'root',
    password: '',
    database: 'coffeeshop',
    port: port
};

const pool = mysql.createPool(dbInfo).promise();

export async function getCafe() {
    const [rows] = await pool.query("SELECT c.*, (SELECT COUNT(1) FROM employee e WHERE e.cafe_location = c.id) as employees FROM cafe c ORDER BY employees DESC;")
    return rows;
}

export async function getCafeByLocation(location) {
    const keyword = `%${location}%`;
    const [rows] = await pool.query("SELECT c.*, (SELECT COUNT(1) FROM employee e WHERE e.cafe_location = c.id) as employees FROM cafe c WHERE c.location LIKE ? ORDER BY employees DESC;", [keyword])
    return rows;
}

export async function addCafe(cafe) {
    const {id, name, description, logo, location} = cafe;
    const [rows] = await pool.query("INSERT INTO cafe(id, name, description, logo, location) VALUES (?,?,?,?,?);", 
        [id, name, description, logo, location])
    return rows;
}

export async function updateCafe(cafe) {
    const {id, name, description, logo, location} = cafe;
    const [rows] = await pool.query("UPDATE cafe SET name = ?, description = ?, logo = ?, location = ? WHERE id = ?",
        [name, description, logo, location, id])
    return rows;
}

export async function deleteCafe(cafeId) {
    const [rows] = await pool.query("DELETE FROM cafe WHERE id = ?",
        [cafeId])
    return rows;
}

export async function getEmployees() {
    const [rows] = await pool.query("SELECT e.*, (SELECT c.name FROM cafe c WHERE e.cafe_location = c.id) as cafe, (SELECT DATEDIFF(CURDATE(), STR_TO_DATE(e.start_date, '%Y-%m-%d'))) as num_of_work_days FROM employee e ORDER BY num_of_work_days DESC;")
    return rows;
}

export async function getEmployeesByCafeName(name) {
    const keyword = `%${name}%`;
    const [rows] = await pool.query("SELECT e.*, c.name as cafe, (SELECT DATEDIFF(CURDATE(), STR_TO_DATE(e.start_date, '%Y-%m-%d'))) as num_of_work_days FROM employee e LEFT JOIN cafe c ON c.id = e.cafe_location WHERE c.name LIKE ? ORDER BY num_of_work_days DESC;", [keyword])
    return rows;
}

export async function addEmployee(employee) {
    const {id, name, email_address, phone_number, gender, cafe_location, start_date} = employee;
    const [rows] = await pool.query("INSERT INTO employee(id, name, email_address, phone_number, gender, cafe_location, start_date) VALUES (?,?,?,?,?,?,DATE(STR_TO_DATE(?, '%Y-%m-%dT%T.%fZ')));", 
        [id, name, email_address, phone_number, gender, cafe_location, start_date])
    return rows;
}

export async function updateEmployee(employee) {
    const {id, email_address, phone_number, gender, cafe_location } = employee;
    const [rows] = await pool.query("UPDATE employee SET email_address = ?, phone_number = ?, gender = ?, cafe_location = ? WHERE id = ?", 
        [email_address, phone_number, gender, cafe_location,id])
    return rows;
}

export async function deleteEmployee(employeeId) {
    const [rows] = await pool.query("DELETE FROM employee WHERE id = ?", 
        [employeeId])
    return rows;
}
