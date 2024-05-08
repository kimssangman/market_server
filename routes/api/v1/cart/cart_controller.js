/*-------------------------------------------------
	Add Cart
-------------------------------------------------*/
exports.addCart = async (req, res) => {
    console.log(`
--------------------------------------------------  
  API  : Cart
  router.post('addCart', cartController.addCart) 
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

    console.log(req.body);

    const criteria = {
        _id: req.body._id,
    };

    try {
        const existingCartItem = await dbModels.Cart.findOne(criteria);

        if (existingCartItem) {
            // 이미 해당 _id를 가진 항목이 있는 경우
            await dbModels.Cart.updateOne(criteria, req.body);
            return res.status(200).send({
                message: "updated",
            });
        } else {
            // 해당 _id를 가진 항목이 없는 경우
            const newCartItem = new dbModels.Cart(req.body);
            await newCartItem.save();
            return res.status(201).send({
                message: "created",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error,
        });
    }
};
