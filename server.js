const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure a directory for submissions exists
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');
if (!fs.existsSync(SUBMISSIONS_DIR)) {
    fs.mkdirSync(SUBMISSIONS_DIR);
}

// Routes
app.post('/api/submit-quote', (req, res) => {
    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const submission = {
        name,
        email,
        service,
        message,
        timestamp: new Date().toISOString()
    };

    // Simulate saving to a database by writing to a JSON file
    const filename = `submission_${Date.now()}.json`;
    const filepath = path.join(SUBMISSIONS_DIR, filename);

    fs.writeFile(filepath, JSON.stringify(submission, null, 2), (err) => {
        if (err) {
            console.error('Error saving submission:', err);
            return res.status(500).json({ error: 'Failed to save submission' });
        }

        console.log('--- New Quote Request ---');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Service: ${service}`);
        console.log(`Message: ${message}`);
        console.log('-------------------------');

        res.status(200).json({ message: 'Success! Your quote request has been received.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
