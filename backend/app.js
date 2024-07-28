import express from 'express';
import * as crypto from "node:crypto";
import cors from "cors";
import multer from "multer";
import path from 'path';
const __dirname = path.resolve();

import {
    addCafe,
    getCafe, 
    getCafeByLocation, 
    getEmployees, 
    getEmployeesByCafeName, 
    addEmployee, 
    deleteCafe, 
    deleteEmployee, 
    updateCafe, 
    updateEmployee
} from "./db.js";

const app = express();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/images")
      },
      filename: function (req, file, cb) {
        const fileType = file.mimetype.split('/');
        if(req.params.id) {
            return cb(null, `${req.params.id}.${fileType[1] ==="jpeg" ? "jpg": fileType[1].toLowerCase()}`)
        } else {
            const form = JSON.parse(req.body.form);
            return cb(null, `${form.id}.${fileType[1] ==="jpeg" ? "jpg": fileType[1].toLowerCase()}`);
        }
      }
});

const upload = multer({storage})

app.use(express.json());
app.use(cors());

app.options('*', cors());

app.use((err, req, res, next) => {
    res.status(500).send("Server Error");
});

app.listen(8080, () => {
    console.log('Server is listening to port 8080');
});

app.use('/public/images',express.static(__dirname + '/public/images'));

app.get("/cafes", async (req, res) => {
    const location = req.query.location;
    const employees = !location ? await getCafe() : await getCafeByLocation(location);
    res.send(employees);
});

app.post("/cafes", upload.single('file'), async (req, res) => {
    try {
        const _ = JSON.parse(req.body.form);
        const cafe = {
            id: _.id,
            name: _.name,
            description: _.description,
            logo: _.logo[0].name,
            location: _.location
        }
        const newCafe = await addCafe(cafe);
        res.status(204).send(newCafe);
    } catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

app.put("/cafes/:id", upload.single('file'), async (req, res) => {
    try {
        const _ = JSON.parse(req.body.form);
        const cafe = {
            id: _.id,
            name: _.name,
            description: _.description,
            logo: _.logo[0].name || _.logo,
            location: _.location
        }
        await updateCafe(cafe);
        res.status(204).send();
    } catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});


app.delete("/cafes", async (req, res) => {
    try {
        const cafeId = req.body.id;
        await deleteCafe(cafeId);
        res.status(204).send();
    } catch(ex) {
        res.status(500).send(ex);
    }
});


/** Employees ENDPOINTS */
app.get("/employees", async (req, res) => {
    const cafe = req.query.cafe;
    const employees = !cafe ? await getEmployees() : await getEmployeesByCafeName(cafe);
    res.send(employees);
});

app.post("/employee", async (req, res) => {
    try {
        const employee = req.body;
        employee.id = `UI${crypto.randomBytes(3.5).toString('hex')}`;

        const newEmployee = await addEmployee(employee);
        res.status(201).send(newEmployee);
    } catch(ex) {
        res.status(500).send(ex);
    }
});

app.put("/employee", async (req, res) => {
    try {
        const employee = req.body;
        await updateEmployee(employee);
        res.status(204).send();
    } catch(ex) {
        res.status(500).send(ex);
    }
});

app.delete("/employee", async (req, res) => {
    try {
        const employeeId = req.body.id;
        await deleteEmployee(employeeId);
        res.status(204).send();
    } catch(ex) {
        res.status(500).send(ex);
    }
})