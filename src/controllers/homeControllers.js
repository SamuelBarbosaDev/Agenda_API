import Aluno from '../models/Aluno'
class HomeController{
    async index(request, response){
        const novoAluno = await Aluno.create({
            nome: 'user',
            sobrenome: '1',
            idade: 23,
            altura: 1.73,
            peso: 110,
            email: 'user@email.com'
        });
        response.json({
            novoAluno
            // "Done": true
        })
    }
}

export default new HomeController();
