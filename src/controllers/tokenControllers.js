import UserModel from '../models/User'
import jwt from 'jsonwebtoken'

class TokenController{
    async store(request, response){
        try{
            const {email = '', password = ''} = request.body;

            if(!email || !password){
                response.status(401).json({
                    errors: ['Credenciais inválidas'],
                })
            };

            const user = await UserModel.findOne({where: { email }});

            if(!user){
                return response.status(401).json({
                    errors: ['Usuário não existe'],
                })
            };

            if(!(await user.passwordIsValid(password))){
                return response.status(401).json({
                    errors: ['Senha inválida.'],
                });
            };

            const { id } = user;
            const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION,
            })

            response.json({ token, user: { id, nome: user.nome, email } })
        }
        catch(e){
            console.warn(e)
        }
    }
}

export default new TokenController();
