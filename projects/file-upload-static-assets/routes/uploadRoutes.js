const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { v2: cloudinary } = require('cloudinary');

const { storage, fileFilter, limits, sanitizeFilename } = require('../middleware/uploadConfig');

const router = express.Router();
const upload = multer({ storage, fileFilter, limits });

const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

function buildFileUrl(filename) {
  return `/static/${filename}`;
}

router.post('/single', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.status(201).json({
    message: 'Single file uploaded successfully',
    file: {
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: buildFileUrl(req.file.filename)
    }
  });
});

router.post('/multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  res.status(201).json({
    message: 'Multiple files uploaded successfully',
    files: req.files.map((file) => ({
      originalName: file.originalname,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      url: buildFileUrl(file.filename)
    }))
  });
});

router.post('/image/process', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    if (!imageTypes.has(req.file.mimetype)) {
      return res.status(400).json({ error: 'Only JPEG, PNG, and WEBP images are allowed' });
    }

    const processedName = `${path.parse(req.file.filename).name}-processed.webp`;
    const processedPath = path.join(uploadsDir, processedName);

    await sharp(req.file.path)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(processedPath);

    res.status(201).json({
      message: 'Image processed successfully',
      original: buildFileUrl(req.file.filename),
      processed: buildFileUrl(processedName)
    });
  } catch (error) {
    next(error);
  }
});

router.post('/cloudinary', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(200).json({
        message: 'Cloudinary credentials are not configured, file kept locally only',
        localFile: buildFileUrl(req.file.filename)
      });
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'backend-journey'
    });

    res.status(201).json({
      message: 'File uploaded to Cloudinary',
      localFile: buildFileUrl(req.file.filename),
      cloudinary: {
        publicId: result.public_id,
        secureUrl: result.secure_url,
        resourceType: result.resource_type
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
