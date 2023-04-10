const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.processImage = async (event) => {
    // Retrieve image file from S3 bucket
    const { bucket, key } = event.Records[0].s3;
    const image = await S3.getObject({ Bucket: bucket, Key: key }).promise();
    
    // Process image
    const resizedImage = resizeImage(image.Body, 800, 600); // Replace with actual image processing function
    
    // Save processed image to S3 bucket
    const processedKey = `processed/${key}`;
    await S3.putObject({ Bucket: bucket, Key: processedKey, Body: resizedImage }).promise();
    
    // Return URL for processed image
    const url = `https://${bucket}.s3.amazonaws.com/${processedKey}`;
    return url;
};

exports.uploadImage = async (event) => {
    const { name, type, body } = event.body;
    const key = `uploads/${name}`;
    
    // Upload image to S3 bucket
    await S3.putObject({ Bucket: process.env.BUCKET_NAME, Key: key, Body: body, ContentType: type }).promise();
    
    // Return URL for uploaded image
    const url = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`;
    return url;
};

function resizeImage(imageData, width, height) {
    // Replace with actual image processing function
    // This example simply resizes the image using a library such as sharp or gm
    const resizedImage = sharp(imageData).resize(width, height).toBuffer();
    return resizedImage;
}
