module.exports = function (req, res, next) {
    console.log('Request Type:', req.method);
    console.log('path:', req.path)
    console.log('timestamp:', new Date())
    console.log('body:', req.body)
    if (req.params.id) {
        console.log('path params:', req.params.id)
    }
    next();
};
