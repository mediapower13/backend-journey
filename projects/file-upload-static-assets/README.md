# File Upload & Static Assets

Backend Development using JavaScript

## Features

- Basic single and multiple file upload endpoints using Multer
- File validation by type and size
- Custom filename sanitization
- Image resizing and format conversion with Sharp
- Optional Cloudinary upload integration
- Static file hosting for uploaded assets

## Endpoints

- `POST /api/uploads/single` - upload one file with field name `file`
- `POST /api/uploads/multiple` - upload up to 5 files with field name `files`
- `POST /api/uploads/image/process` - upload an image and get a processed WebP version
- `POST /api/uploads/cloudinary` - upload a file to Cloudinary when credentials are configured
- `GET /static/<filename>` - serve uploaded files

## Setup

```bash
npm install
cp .env.example .env
npm start
```

## Notes

- Allowed file types: JPEG, PNG, WEBP, PDF, and TXT
- Max file size: 5 MB
- Cloudinary upload is optional and uses environment variables when available
