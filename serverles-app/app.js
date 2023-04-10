const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const fs = require('fs');

const app = express();
const upload = multer();

// Endpoint for uploading an image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    
        let body = [];
        req.on('data', chunk => {
          body.push(chunk);
        });
        req.on('end', () => {
          // Concatenate the image buffer chunks into a single buffer
          const imageBuffer = Buffer.concat(body);
    
          // Resize the image buffer
          Jimp.read(imageBuffer)
            .then(image => {
              // Resize the image to width 300 and height auto
              return image.resize(300, Jimp.AUTO);
            })
            .then(resizedImage => {
              // Convert the resized image buffer to a base64 string
              return resizedImage.getBufferAsync(Jimp.MIME_JPEG);
            })
            .then(resizedBuffer => {
              // Write the resized image to disk using fs module
              fs.writeFileSync('resized-image.jpg', resizedBuffer);

              // Send the resized image as the response
              res.send('Image uploaded and resized successfully');
              // res.writeHead(200, { 'Content-Type': 'image/jpeg' });
              // res.end(resizedBuffer);
            })
            .catch(error => {
              console.error(error);
              res.writeHead(500);
              res.end('Error resizing image');
            });
        });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Serverless endpoint listening on port 3000');
});
