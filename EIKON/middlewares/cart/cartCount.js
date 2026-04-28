module.exports = function (req, res, next) {
 const cart = req.session.cart || [];

 const cartCount = cart.reduce((acc, p) => acc + p.quantity, 0);

 res.locals.cartCount = cartCount;

 next();
};
