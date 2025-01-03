const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const { createFile } = require('./utils/createFile');
const { runcpp } = require('./functions/runCpp');
const { runjava } = require('./functions/runJava');
const { runpy } = require('./functions/runPy');
const { runc } = require('./functions/runC');
const { deleteFile } = require('./utils/deleteFile');
const mongoose = require('mongoose');
require('dotenv').config();
const { codeModel } = require('./models/codesave');
const { v4: codeid } = require('uuid');
const multer = require("multer");
const pdf = require("pdf-parse");

const fs = require("fs");


mongoose.connect(process.env.mongodb).then(() => {
    console.log("connected to MongoDB");
}).catch(err => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log(`a user connected with id :${socket.id}`);
    socket.on('getcode', (code) => {
        if (code.roomid)
            socket.broadcast.emit(`sendcode${code.roomid}`, { code: code.code, lang: code.lang });
    });
    socket.on('disconnect', () => {
        console.log(`a user disconnected with id: ${socket.id}`);
    });
});

// Route to run code
app.post('/run', async (req, res) => {
    const inDate = new Date();
    const { language, code, input } = req.body;

    // Validate the input
    if (!language) return res.json({ error: 'No language mentioned' });
    if (!code) return res.json({ error: 'Empty code' });

    // Create files for code and input
    const fileCreatedPath = await createFile(code, language);
    const inputFile = await createFile(input, 'txt');

    try {
        let out;
        if (language === 'cpp') {
            out = await runcpp(fileCreatedPath, inputFile);
        }
        if (language === 'java') {
            out = await runjava(fileCreatedPath, inputFile);
        }
        if (language === 'py') {
            out = await runpy(fileCreatedPath, inputFile);
        }
        if (language === 'c') {
            out = await runc(fileCreatedPath, inputFile);
        }

        // Send the output and execution time
        out.push(new Date() - inDate);  // Track execution time

        // Clean up the files after execution
        deleteFile(fileCreatedPath);
        deleteFile(inputFile);

        // Respond with the result
        console.log(out); // Check if the output is correct here
        res.json({ output: out });
    } catch (error) {
        res.status(500).json({ error: 'Error running the code' });
    }
});


// Save code endpoint
let savedCode = null;

app.post('/savecode', async (req, res) => {
    try {
        savedCode = {
            code: req.body.code,
            codeid: codeid(),
            createdAt: Date.now(),
            filename: req.body.filename,
            language: req.body.language
        };
        res.status(200).send({ success: true });
    } catch (err) {
        res.status(500).send({ success: false });
    }
});

// Download code file
app.post('/download', async (req, res) => {
    const { code, language } = req.body;
    const fileCreatedPath = await createFile(code, language);
    res.download(fileCreatedPath, (err) => {
        if (err) {
            res.status(500).send({ error: 'Error downloading the file' });
        }
    });
    setTimeout(() => {
        deleteFile(fileCreatedPath);
    }, 2000);
});

// Retrieve saved code
app.get('/codes', (req, res) => {
    res.send(savedCode ? [savedCode] : []);
});
// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the PDF to Text API!");
});

app.post("/upload", upload.single("resume"), async (req, res) => {
  const filePath = req.file.path; // Path to the uploaded file

  try {
    // Read the uploaded file and convert it to text
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);

    // Delete the temporary uploaded file
    fs.unlinkSync(filePath);

    // Send the extracted text back to the frontend
    res.json({ text: pdfData.text });
  } catch (error) {
    console.error("Error processing PDF:", error);
    res.status(500).json({ error: "Failed to process file" });
  }
});


server.listen(process.env.PORT || 3001, () => {
    console.log("Server listening on port 3001");
});
