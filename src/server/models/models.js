const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', { // id, email, password, role
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    ru1: {type: DataTypes.STRING, defaultValue: 'unnamed'},
    ru2: {type: DataTypes.STRING, defaultValue: 'unnamed'},
    ru3: {type: DataTypes.STRING, defaultValue: 'unnamed'},
    eu1: {type: DataTypes.STRING, defaultValue: 'unnamed'},
    us1: {type: DataTypes.STRING, defaultValue: 'unnamed'},
})

const Storage = sequelize.define('storage', { // id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const StorageItem = sequelize.define('storage_item', { // id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: { type: DataTypes.FLOAT, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    server: {type: DataTypes.STRING, allowNull: true}
})

const Item = sequelize.define('item', { // id, name, img, weight, level
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    weight: {type: DataTypes.DOUBLE, allowNull: false},
    level: {type: DataTypes.INTEGER, allowNull: false}
})

const Type = sequelize.define('type', { // id, name, img
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Class = sequelize.define('class', { // id, name, img
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Equipment = sequelize.define('equipment', { // id, lifting_capacity, melee, explosion, electric, infrared, radiation, biological, frostbite, state
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lifting_capacity: {type: DataTypes.INTEGER, allowNull: false},
    melee: {type: DataTypes.INTEGER, allowNull: false},
    explosion: {type: DataTypes.INTEGER, allowNull: false},
    electric: {type: DataTypes.INTEGER, allowNull: false},
    infrared: {type: DataTypes.INTEGER, allowNull: false},
    radiation: {type: DataTypes.INTEGER, allowNull: false},
    biological: {type: DataTypes.INTEGER, allowNull: false},
    frostbite: {type: DataTypes.INTEGER, allowNull: false},
    state: {type: DataTypes.INTEGER, allowNull: false}
})

const AmmoInfo = sequelize.define('ammo_infos', { // id, type_ammo, breaking_throught, damage
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type_ammo: {type: DataTypes.STRING, allowNull: false},
    breaking_throught: {type: DataTypes.INTEGER, allowNull: false},
    damage: {type: DataTypes.STRING, allowNull: false}
})

const Weapon = sequelize.define('weapon', { // id, moa, rate_of_fire, breaking_throught, strength, recoil, handing, state_waivers, type_ammo
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    moa: {type: DataTypes.DOUBLE, allowNull: false},
    rate_of_fire: {type: DataTypes.INTEGER, allowNull: false},
    breaking_throught: {type: DataTypes.INTEGER, allowNull: false},
    strength: {type: DataTypes.INTEGER, allowNull: false},
    recoil: {type: DataTypes.INTEGER, allowNull: false},
    handing: {type: DataTypes.INTEGER, allowNull: false},
    state_waivers: {type: DataTypes.INTEGER, allowNull: false},
    nopollution: {type: DataTypes.INTEGER, allowNull: false}
})

const Containers = sequelize.define('containers', { // id, capacity
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    capacity: {type: DataTypes.INTEGER, allowNull: false}
})

const Artefacts = sequelize.define('artefacts', { // id, capacity
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Grenades = sequelize.define('grenades', { // id, number_of_fragments, shock_wave_radius
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number_of_fragments: {type: DataTypes.INTEGER, allowNull: false},
    shock_wave_radius: {type: DataTypes.INTEGER, allowNull: false}
})

const TypeClass = sequelize.define('type_class', { // id
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

User.hasOne(Storage)
Storage.belongsTo(User)

Storage.hasMany(StorageItem)
StorageItem.belongsTo(Storage)

User.hasMany(StorageItem)
StorageItem.belongsTo(User)

StorageItem.hasOne(Item)
Item.belongsTo(StorageItem)

Type.hasMany(Item)
Item.belongsTo(Type)

Type.hasMany(StorageItem)
StorageItem.belongsTo(Type)

Item.hasMany(StorageItem)
StorageItem.belongsTo(Item)

Class.hasMany(Item)
Item.belongsTo(Class)

Class.hasMany(StorageItem)
StorageItem.belongsTo(Class)

Type.hasMany(Class)
Class.belongsTo(Type)

Item.hasMany(AmmoInfo, {as: 'ammo_infos'})
AmmoInfo.belongsTo(Item)

Item.hasMany(Equipment, {as: 'equipment'})
Equipment.belongsTo(Item)

Item.hasMany(Weapon, {as: 'weapon'})
Weapon.belongsTo(Item)

Item.hasMany(Containers, {as: 'containers'})
Containers.belongsTo(Item)

Item.hasMany(Artefacts, {as: 'artefacts'})
Artefacts.belongsTo(Item)

Item.hasMany(Grenades, {as: 'grenade'})
Grenades.belongsTo(Item)

Containers.hasMany(Artefacts)
Artefacts.belongsTo(Containers)

Type.belongsToMany(Class, {through: TypeClass })
Class.belongsToMany(Type, {through: TypeClass })

module.exports = {
    User,
    Storage,
    StorageItem,
    Item,
    Type,
    Class,
    AmmoInfo,
    Equipment,
    Weapon,
    Containers,
    Artefacts,
    Grenades
}