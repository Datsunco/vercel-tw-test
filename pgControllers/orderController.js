const postgre = require('../db')
const orderController = {
    getAll: async(req, res) => {
        try {
            const { rows } = await postgre.query("select * from orders")
            res.json({msg: "OK", data: rows})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getByUserId: async(req, res) => {
        try {
            const {userid} = req.query

            const { rows } = await postgre.query("select * from orders where userid = $1", [userid])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(404).json({msg: "not found"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getById: async(req, res) => {
        try {
            const {id} = req.query
            

            const { rows } = await postgre.query("select * from orders where id = $1", [id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }
            
            res.status(404).json({msg: "not found"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    create: async(req, res) => {
        try {
            const {userid, lon, lat, address, radius} = req.body
            console.log(req)

            if (req.method == 'OPTIONS') { // Handle preflight
                res.writeHead(200, {
                   "Access-Control-Allow-Origin": "*",
                   "Access-Control-Allow-Headers": "X-Foo"
                });
            } /*else {                           // Handle actual requests
                res.writeHead(204, {
                  "Access-Control-Allow-Origin": "*"
                });
            }*/

            const sql = 'INSERT INTO orders(userid, lon, lat, address, radius) VALUES($1, $2, $3, $4, $5) RETURNING *'

            const { rows } = await postgre.query(sql, [userid, lon, lat, address, radius])

            //res.end()
            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    updateById: async(req, res) => {
        try {
            const { name, price } = req.body

            const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

            const { rows } = await postgre.query(sql, [name, price, req.params.id])

            res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    deleteById: async(req, res) => {
        try {
            const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }

            return res.status(404).json({msg: "not found"})
            

        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

module.exports = orderController