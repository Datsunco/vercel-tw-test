module.exports = function (req, res, next) {
    try {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "https://heroic-brioche-432533.netlify.app/",
            "Access-Control-Allow-Headers": "X-Foo",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        });
        
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};