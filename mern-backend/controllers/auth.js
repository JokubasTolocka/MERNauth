exports.signup = (req, res) => {
    console.log(req.body);
    res.json({
        data: 'you hit signup endpoint'
    });
};