import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) return res.status(401).json({ error: 'File was not sent.' });

    const { file } = req;
    file.name = req.file.originalname;
    file.path = req.file.filename;

    const fileSaved = await File.create(file);

    return res.json({
      id: fileSaved.id,
      url: fileSaved.url,
      name: fileSaved.name,
    });
  }
}

export default new FileController();
