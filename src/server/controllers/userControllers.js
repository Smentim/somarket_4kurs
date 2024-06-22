const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Storage, StorageItem, Item} = require('../models/models')

const generateJwt = (id, email, role, ru1, ru2, ru3, eu1, us1) => {
    return jwt.sign(
        {id: id, email, role, ru1, ru2, ru3, eu1, us1}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Storage.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role, user.ru1, user.ru2, user.ru3, user.eu1, user.us1)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.ru1, user.ru2, user.ru3, user.eu1, user.us1)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.ru1, req.user.ru2, req.user.ru3, req.user.eu1, req.user.us1)
        return res.json({token})
    }

    async changePassword(req, res, next) {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'));
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return next(ApiError.badRequest('Неверный текущий пароль'));
        }

        const hashPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashPassword;
        await user.save();

        return res.json({ message: 'Пароль успешно изменен' });
    }

    async createStorage(req, res, next) {
        const { userId } = req.body;
        const storage = await Storage.create({ userId });
        return res.json(storage);
    }

    async addItemToStorage(req, res, next) {
        const { storageId, itemId, price, quantity } = req.body;
        const storageItem = await StorageItem.create({ storageId, itemId, price, quantity });
        return res.json(storageItem);
    }

    async getItemsFromStorage(req, res, next) {
        const { storageId, classId, typeId, limit, page } = req.query;
        const items = await StorageItem.findAll({
            where: { storageId },
            include: [
                {
                    model: Item,
                    where: {
                        ...(classId && { classId }),
                        ...(typeId && { typeId })
                    }
                }
            ],
            limit,
            offset: (page - 1) * limit
        });
        return res.json(items);
    }

    async updateNicknames(req, res, next) {
        const { userId, nicknames } = req.body;
    
        // Логирование входящих данных
        console.log("updateNicknames - userId:", userId);
        console.log("updateNicknames - nicknames:", nicknames);
    
        if (!userId) {
            return next(ApiError.badRequest('User ID is required'));
        }
    
        try {
            const user = await User.findByPk(userId);
    
            if (!user) {
                return next(ApiError.notFound('User not found'));
            }
    
            user.ru3 = nicknames.ru3 || user.ru3;
            user.ru2 = nicknames.ru2 || user.ru2;
            user.ru1 = nicknames.ru1 || user.ru1;
            user.eu1 = nicknames.eu1 || user.eu1;
            user.us1 = nicknames.us1 || user.us1;
    
            await user.save();
    
            return res.json({ message: 'Nicknames updated successfully' });
        } catch (error) {
            console.error('Error updating nicknames:', error);
            return next(ApiError.internal(error.message));
        }
    }
}

module.exports = new UserController()