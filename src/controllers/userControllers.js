import User from '../models/User'

class UserController{
    index(request, response){
        response.json({'Hello World.!.': true})
    }

    async store(request, response){
        try{
            const createUser = await User.create(request.body);
            const {id, nome, email} = createUser;
            response.json({id, nome, email});
        }
        catch(e){
            response.json({
                errors: e.errors.map((erro) => erro.message),
            });
        }
    }
}

export default new UserController();
