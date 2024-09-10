import alunoModel from '../models/Aluno'
import Foto from '../models/Foto'

class AlunosController{
    async index(request, response){
        try{
            const alunos = await alunoModel.findAll({
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
                include: {
                    model: Foto,
                    attributes: ['url', 'filename'],
                }
            })
            return response.json(alunos)
        }
        catch(e){
            console.warn(e)
            return response.json({})
        }
    }

    async store(request, response){
        try{
            const aluno = await alunoModel.create(request.body);
            return response.json(aluno);
        }
        catch(e){
            console.warn(e);
            return response.status(400).json({errors: ['Não foi possível criar o usuário.']});
        }
    }

    async show(request, response){
        try{
            const aluno = await alunoModel.findByPk(
                request.params.id,
                {
                    attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
                    order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
                    include: {
                        model: Foto,
                        attributes: ['url', 'filename'],
                    }
            });
            if(!aluno){
                return response.json({errors: ["Aluno não encontrado."]})
            }

            return response.json(aluno)
        }
        catch(e){
            console.warn(e)
            return response.status(400).json({errors: ["Não foi possível encontrar o aluno."]})
        }
    }

    async update(request, response){
        try{
            const aluno = await alunoModel.findByPk(request.params.id);
            if(!aluno){
                return response.json({errors: ["Aluno não encontrado."]})
            }

            const alunoUpdate = await aluno.update(request.body)

            return response.json(alunoUpdate)
        }
        catch(e){
            console.warn(e)
            return response.status(400).json({errors: ["Não foi possível atualizar as informações do aluno."]})
        }
    }

    async delete(request, response){
        try{
            const aluno = await alunoModel.findByPk(request.params.id);
            if(!aluno){
                return response.json({errors: ["Aluno não encontrado."]})
            }

            aluno.destroy()

            return response.json({done: 'Usuário deletado.'})
        }
        catch(e){
            console.warn(e)
            return response.status(400).json({errors: ["Não foi possível deletar o aluno."]})
        }
    }
}

export default new AlunosController();
