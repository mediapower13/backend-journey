const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadsDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

function sanitizeFilename(filename) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname).toLowerCase();
    const baseName = sanitizeFilename(path.basename(file.originalname, extension)) || 'file';
    cb(null, `${baseName}-${timestamp}${extension}`);
  }
});

function fileFilter(req, file, cb) {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'text/plain'
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Allowed types: JPEG, PNG, WEBP, PDF, TXT'));
  }

  cb(null, true);
}

const limits = {
  fileSize: 5 * 1024 * 1024,
  files: 5
};

module.exports = {
  storage,
  fileFilter,
  limits,
  sanitizeFilename
};
