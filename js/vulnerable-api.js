const express = require('express');
const { execSync } = require('child_process');
const bodyParser = require('body-parser');
const axios = require('axios');
const { URL } = require('url');
const _ = require('lodash');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// In-memory data store
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
});

// Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);

  res.status(201).json(newUser);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updateUser = req.body;
  const existingUser = users.find(u => u.id === userId);

  if (existingUser) {
    // Use _.merge to update the existing user
    _.merge({}, existingUser, updateUser);

    res.json(existingUser);

    console.log({}.__proto__)
  } else {
    res.status(404).json({ error: 'User not found.' });
  }
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);

  res.json({ message: 'User deleted successfully.' });
});

app.post('/resize', async (req, res) => {
  const { imageUrl, width, height } = req.body;

  if (!imageUrl || !width || !height) {
    return res.status(400).json({ error: 'imageUrl, width, and height are required in the request body.' });
  }

  try {
    // Validate the imageUrl to ensure it is a valid URL
    const parsedUrl = new URL(imageUrl);

    // Ensure that the hostname is allowed (replace this with your whitelist)
    const allowedHosts = ['i.pinimg.com'];
    if (!allowedHosts.includes(parsedUrl.hostname)) {
      throw new Error('Invalid hostname in the imageUrl.');
    }

    // Download the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);

    // Save the image to a local file
    const localImagePath = './downloaded_image.jpg'; // Adjust the path and filename as needed
    fs.writeFileSync(localImagePath, imageBuffer);

    // Use execSync to execute the gm command
    const command = `gm convert ${localImagePath} -resize ${width}x${height} -`;
    const resizedImage = execSync(command);

    // Set appropriate headers for the response
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    // Send the resized image as the response
    res.send(resizedImage);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error resizing image.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});