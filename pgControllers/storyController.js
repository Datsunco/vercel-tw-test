const postgre = require('../db')
const uuid = require('uuid')
const path = require('path')
const storyController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from stories")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    create: async(req, res) => {
        try {
            const {link, status} = req.body;
            const {img} = req.files;
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))

            const sql = 'INSERT INTO stories(link, status, filename) VALUES($1, $2, $3) RETURNING *'

            const { rows } = await postgre.query(sql, [link, status, filename])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = storyController