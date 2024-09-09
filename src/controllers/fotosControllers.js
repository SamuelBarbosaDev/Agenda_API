import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto'

const upload = multer(multerConfig).single('foto');

class FotoController{
    store(request, response){
        return upload(request, response, async(error) => {
            if(error){
                return response.status(400).json({
                    errors: [error.code],
                });
            }

            try{
                const { originalname, filename } = request.file;
                const { aluno_id } = request.body;
                const foto = await Foto.create({ originalname, filename, aluno_id });

                return response.json(foto);
            }
            catch(e){
                return response.status(400).json({
                    errors: ['Aluno não existe'],
                })
            }
        })
    }
}

export default new FotoController();
