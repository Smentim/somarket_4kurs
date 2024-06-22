const { Class } = require("../models/models")

class ClassController {

    async create(req, res) {
        try {
            let {name, typeId} = req.body
            const clas = await Class.create({name, typeId})
            return res.json(clas)
        } catch (error) {
            console.error("Error creating class:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getAll(req, res) {
        const clases = await Class.findAll()
        return res.json(clases)
    }
}

module.exports = new ClassController()