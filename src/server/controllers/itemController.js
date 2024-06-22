const uuid = require('uuid')
const path = require('path')
const {Item, AmmoInfo, Equipment, Weapon, Containers, Artefacts, Grenades, StorageItem, User, Type, Class} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

class ItemController {

    async create(req, res, next) {
        try {
            let {name, description, weight, level, typeId, classId, ammo_infos, artefacts, equipment, weapons, containers, grenade} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".png"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const item = await Item.create({name, description, weight, level, typeId, classId, img: fileName})

            if (ammo_infos) {
                ammo_infos = JSON.parse(ammo_infos);
                ammo_infos.forEach(async i => {
                    await AmmoInfo.create({
                        type_ammo: i.type_ammo,
                        breaking_throught: i.breaking_throught,
                        damage: i.damage,
                        itemId: item.id
                    });
                });
            }

            if (weapons) {
                weapons = JSON.parse(weapons);
                weapons.forEach(async i => {
                    await Weapon.create({
                        moa: i.moa, 
                        rate_of_fire: i.rate_of_fire, 
                        breaking_throught: i.breaking_throught, 
                        strength: i.strength, 
                        recoil: i.recoil,
                        handing: i.handing,
                        state_waivers: i.state_waivers,
                        nopollution: i.nopollution,
                        itemId: item.id
                    })
                })
            }

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {classId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 15
        let offset = page * limit - limit
        let items;
        if (!classId && !typeId) {
            items = await Item.findAndCountAll({limit, offset})
        }
        if (classId && !typeId) {
            items = await Item.findAndCountAll({where:{classId}, limit, offset})
        }
        if(!classId && typeId) {
            items = await Item.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (classId && typeId) {
            items = await Item.findAndCountAll({where:{classId, typeId}, limit, offset})
        }
        return res.json(items)
    }

    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id},
                include: [{model: AmmoInfo, as: 'ammo_infos'}]
            }
        )
        return res.json(item)
    }

    async search(req, res) {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ message: 'Название предмета не может быть пустым' });
        }

        try {
            const items = await Item.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            });
            return res.json(items);
        } catch (error) {
            console.error('Ошибка при поиске предмета:', error);
            return res.status(500).json({ message: 'Ошибка при поиске предмета' });
        }
    }

    async getStorageItems(req, res, next) {
        const { server } = req.params
        let { page, limit, classId, typeId } = req.query;
        page = page || 1
        limit = limit || 15
        let offset = page * limit - limit
    
        const where = {};
        if (classId) where.classId = classId;
        if (typeId) where.typeId = typeId;
    
        try {
            const items = await StorageItem.findAndCountAll({
                where: { server },
                include: [
                    {
                        model: Item,
                        attributes: ['id', 'name', 'img']
                    },
                    {
                        model: User,
                        attributes: ['id', 'email', 'ru1', 'ru2', 'ru3', 'eu1', 'us1']
                    }
                ],
                limit,
                offset,
                order: [
                    ['itemId', 'ASC'],
                    ['userId', 'ASC']
                ]
            });
    
            return res.json(items);
        } catch (error) {
            console.error("Ошибка при получении предметов из хранилища:", error); // Логируем ошибку
            next(ApiError.internal(error.message));
        }
    }

    async getUserItems(req, res, next) {
        const { userId } = req.query;
    
        try {
            const items = await StorageItem.findAll({
                where: { userId },
                include: [
                    {
                        model: Item,
                        attributes: ['id', 'name', 'img']
                    },
                    {
                        model: User,
                        attributes: ['id', 'email']
                    }
                ],
                order: [['id', 'ASC']]
            });
    
            return res.json(items);
        } catch (error) {
            console.error("Ошибка при получении предметов пользователя:", error);
            next(ApiError.internal(error.message));
        }
    }

    async addItemToStorage(req, res, next) {
        const { userId, itemId, price, quantity, classId, typeId, server } = req.body;
        try {
            // Создаем запись в StorageItem
            const storageItem = await StorageItem.create({
                userId,
                itemId,
                price,
                quantity,
                classId,
                typeId,
                server
            });
    
            return res.json(storageItem);
        } catch (error) {
            return next(error);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const { id } = req.params;
            const item = await StorageItem.findOne({ where: { id } });
    
            if (!item) {
                return next(ApiError.badRequest('Предмет не найден'));
            }
    
            // Удаление предмета из базы данных
            await item.destroy();
    
            return res.json({ message: 'Предмет успешно удален' });
        } catch (error) {
            console.error('Ошибка при удалении предмета:', error);
            next(ApiError.internal('Ошибка при удалении предмета'));
        }
    }

    async getAmmoInfosByItemId(req, res, next) {
        const { itemId } = req.params;
        try {
            const ammoInfos = await AmmoInfo.findAll({ where: { itemId } });
            return res.json(ammoInfos);
        } catch (error) {
            console.error('Error fetching ammo_infos:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new ItemController()