const cartController = {
 /*===============
ADD METHODE*/

 add: (req, res) => {
  if (!req.session.cart) {
   req.session.cart = [];
  }

  const { id, title, price, quantity, image } = req.body;

  const existing = req.session.cart.find((p) => p.id == id);

  if (existing) {
   existing.quantity += quantity;
  } else {
   req.session.cart.push({ id, title, price, quantity, image });
  }

  return res.json({ success: true });
 },

 /*===============
GETCART METHODE*/

 getCart: (req, res) => {
  const cart = req.session.cart || [];

  return res.render("products/productCart", { cart });
 },

 /*===============
UPDATE METHODE - Upadte items inside cart*/
 update: (req, res) => {
  const { id, action } = req.body;

  if (!req.session.cart) return res.json({ success: false });

  const product = req.session.cart.find((p) => p.id == id);

  if (!product) return res.json({ success: false });

  if (action === "inc") {
   product.quantity++;
  }

  if (action === "dec") {
   if (product.quantity > 1) {
    product.quantity--;
   }
  }

  return res.json({ success: true });
 },

 /*===============
REMOVE METHODE - Delete items in cart*/
 remove: (req, res) => {
  const { id } = req.body;

  if (!req.session.cart) return res.json({ success: false });

  req.session.cart = req.session.cart.filter((p) => p.id != id);

  return res.json({ success: true });
 },
};

module.exports = cartController;
