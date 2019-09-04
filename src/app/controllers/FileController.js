import File from '../models/File';

class FileController {
  async store(req, res) {
    return res.json({ OK: 2 });
  }
}

export default new FileController();
