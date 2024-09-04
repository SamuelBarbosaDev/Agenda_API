import User from '../models/User'

class UserController{
    async index(request, response){
        try{
            const users = await User.findAll({attributes: ['id', 'nome', 'email']})
            return response.json(users);
        }
        catch(e){
            console.warn(e)
            return response.json(null)
        }
    }

    async store(request, response){
        try{
            const createUser = await User.create(request.body);
            const {id, nome, email} = createUser;
            return response.json({id, nome, email});
        }
        catch(e){
            return response.status(400).json({
               errors: e.errors.map((erro) => erro.message),
            });
        }
    }

    async show(request, response){
        try{
            const user = await User.findByPk(request.params.id)
            const { id, nome, email } = user;
            return response.json({ id, nome, email });
        }
        catch(e){
            console.warn(e)
            return response.json(null)
        }
    }

    async update(request, response){
        try{
            const user = await User.findByPk(request.userId);

            if(!user){
                return response.status(400).json({
                    errors: ['Usuário não existe.'],
                })
            }

            const userUpdate = await user.update(request.body);
            const { id, nome, email } = userUpdate;
            return response.json({ id, nome, email });
        }
        catch(e){
            console.warn(e);
            return response.status(400).json({
                errors: e.errors.map((erro) => erro.message),
            })
        }
    }

    async delete(request, response){
        try{
            const user = await User.findByPk(request.userId);

            if(!user){
                return response.status(400).json({
                    errors: ['Usuário não existe.'],
                });
            }

            await user.destroy();
            return response.json('Usuário deletado.');
        }
        catch(e){
            return response.status(400).json({
                errors: e.errors.map((erro) => erro.message),
            });
        }
    }
}

export default new UserController();
