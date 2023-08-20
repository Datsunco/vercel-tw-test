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
            const {link, status, imglink} = req.body;

            const sql = 'INSERT INTO stories(link, img, status) VALUES($1, $2, $3) RETURNING *'
            

            const { rows } = await postgre.query(sql, [link, imglink, status])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = storyController