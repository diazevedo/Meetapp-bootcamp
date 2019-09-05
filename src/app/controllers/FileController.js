import File from '../models/File';

class FileController {
  async store(req, res) {
    const { file = null } = req;

    if (!file) return res.status(401).json({ error: 'File was not sent.' });

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
