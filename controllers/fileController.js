const File = require('../models/File');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/files');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  }
});

exports.upload = multer({ storage: storage }).single('file');

exports.handleUpload = async (req, res, next) => {
  try {
    const file = {
      url: req.file.destination,
      file_name: req.file.filename
    }
    File.create(file);
    res.status(201).json({
      message: 'Uploaded'
    })
  }catch (err) {
    res.send(err);
  }
}

exports.handleDownload = async (req, res, next) => {
  try {
    const file = await File.findOne({
      where: {
        id: req.params.id
      }
    });
    if (file) {
      res.download(`${file.url}/${file.file_name}`);
    } else {
      res.status(404);
      res.json({
        error: 'File not found'
      })
    }
  } catch (err) {
    res.send(err);
  }
}

exports.handleDelete = async (req, res, next) => {
  try {
    const file = await File.findOne({
      where: {
        id: req.params.id
      }
    });
    if (file) {
      fs.unlink(`${file.url}/${file.file_name}`, async (err) => {
        if (err) {
          res.status(500);
          res.json({
            error: 'File cannot be deleted'
          })
        } else {
          await File.destroy({
            where: {
              id: req.params.id
            }
          })
          res.json({
            message: 'Success'
          });
        }
      })
    } else {
      res.status(404);
      res.json({
        error: 'File not found'
      })
    }
  } catch (err) {
    res.send(err);
  }
}
