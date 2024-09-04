import jwt from 'jsonwebtoken';
import UserModel from '../models/User'

export default async (request, response, next) => {
    const { authorization } = request.headers;

    if(!authorization){
        return response.status(401).json({
            errors: ['Login required.'],
        })
    }

    const [, token] = authorization.split(' ');

    try{
        const dados = jwt.verify(token, process.env.TOKEN_SECRET);
        const {id, email}  = dados;

        const user = await UserModel.findOne({
            where: {
                id,
                email,
            },
        });

        if (!user){
            return response.status(401).json({
                errors: ['Usuário inválido']
            });
        }

        request.userId = id;
        request.userEmail = email;
        return next();
    }
    catch(e){
        return response.status(401).json({
            errors: ['Token expirado ou inválido'],
        })
    }
}
