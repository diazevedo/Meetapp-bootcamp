import File from '../models/File';

class FileController {
  async store(req, res) {
    const { file = null } = req;
    console.log(req.file);
    if (!file) return res.status(401).json({ error: 'File was not sent.' });

    file.name = req.file.originalname;
    file.path = req.file.filename;

    const fileSaved = await File.create(file);
    return res.json(fileSaved);
    // return res.json({
    //   id: fileSaved.id,
    //   name: fileSaved.name,
    //   path: fileSaved.path,
    // });
  }
}

export default new FileController();
