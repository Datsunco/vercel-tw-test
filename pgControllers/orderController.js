const axios = require('axios')

const postgre = require('../db')
const orderController = {
    getAll: async (req, res) => {
        try {
            const { rows } = await postgre.query("select * from orders")
            res.json({ msg: "OK", data: rows })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    getByUserId: async (req, res) => {
        try {
            const { userid } = req.query

            const { rows } = await postgre.query("select * from orders where userid = $1", [userid])

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows })
            }

            res.status(404).json({ msg: "not found" })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.query


            const { rows } = await postgre.query("select * from orders where id = $1", [id])

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows })
            }

            res.status(404).json({ msg: "not found" })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    create: async (req, res) => {
        try {
            const { userid, lon, lat, address, radius } = req.body


            var tmpRadius = radius / 1000; // 1 километр
            var centerLat = lat;
            var centerLng = lon;
            var kml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
                '<kml xmlns="http://www.opengis.net/kml/2.2">\n' +
                '  <Placemark>\n' +
                '    <name>Не заполненный круг</name>\n' +
                '    <Style>\n' +
                '      <LineStyle>\n' +
                '        <color>ff0000ff</color>\n' + // Задайте цвет границы (RGBA) - прозрачный синий
                '        <width>2</width>\n' + // Задайте ширину линии
                '      </LineStyle>\n' +
                '      <PolyStyle>\n' +
                '        <fill>0</fill>\n' + // Задайте заполнение полигона (0 - прозрачное)
                '      </PolyStyle>\n' +
                '    </Style>\n' +
                '    <Polygon>\n' +
                '      <outerBoundaryIs>\n' +
                '        <LinearRing>\n' +
                '          <coordinates>';

            // Вычисление координат круга
            for (var i = 0; i <= 360; i += 10) {
                var angle = (i * Math.PI) / 180;
                var latt = centerLat + (tmpRadius / 111.32) * Math.cos(angle);
                var lngg = centerLng + (tmpRadius / (111.32 * Math.cos(centerLat * (Math.PI / 180)))) * Math.sin(angle);
                kml += lngg + ',' + latt + ',0\n'; // Здесь 0 - это высота (может быть другое значение)
            }

            kml += '          </coordinates>\n' +
                '        </LinearRing>\n' +
                '      </outerBoundaryIs>\n' +
                '    </Polygon>\n' +
                '  </Placemark>\n' +
                '</kml>';

            const formData = new FormData();

            const filename = address + ' ' + lat + ' ' + lon + '.kml'

            formData.append("chat_id", -1001919128416);
            formData.append("document", new Blob([kml], { type: 'application/vnd.google-earth.kml+xml' }), filename);
            formData.append("caption", `Адрес: ${address} \nКоординаты: ${lat}, ${lon}`);

            console.log(formData)

            var params = {
                method: "POST",
                body: formData,
            }

            const { data } = await axios.post('https://api.telegram.org/bot6569140117:AAEpsZrhnE-1LjXRn04bkVqVUzSs_SSEAPs/sendDocument', {params: params})
            console.log(data)


            if (req.method == 'OPTIONS') { // Handle preflight
                res.writeHead(200, {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "X-Foo"
                });
            }

            const sql = 'INSERT INTO orders(userid, lon, lat, address, radius) VALUES($1, $2, $3, $4, $5) RETURNING *'

            const { rows } = await postgre.query(sql, [userid, lon, lat, address, radius])

            //res.end()
            res.json({ msg: "OK", data: rows[0] })

        } catch (error) {
            console.log(error)
            res.json({ msg: error.msg })
        }
    },
    updateById: async (req, res) => {
        try {
            const { name, price } = req.body

            const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

            const { rows } = await postgre.query(sql, [name, price, req.params.id])

            res.json({ msg: "OK", data: rows[0] })

        } catch (error) {
            res.json({ msg: error.msg })
        }
    },
    deleteById: async (req, res) => {
        try {
            const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({ msg: "OK", data: rows[0] })
            }

            return res.status(404).json({ msg: "not found" })


        } catch (error) {
            res.json({ msg: error.msg })
        }
    }
}

module.exports = orderController