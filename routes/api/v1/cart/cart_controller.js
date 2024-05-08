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

/*-------------------------------------------------
	Get Cart Length
-------------------------------------------------*/
exports.getCartLength = async (req, res) => {
    console.log(`
--------------------------------------------------  
  API  : Cart
  router.post('getCartLength', cartController.getCartLength) 
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

    console.log(req.query);

    const criteria = {
        user_id: req.query._id,
    };

    try {
        const existingCartItem = await dbModels.Cart.find(criteria);

        if (existingCartItem) {
            // 이미 해당 _id를 가진 항목이 있는 경우
            await dbModels.Cart.updateOne(criteria, req.body);
            return res.status(200).send({
                count: existingCartItem.length,
                message: "success",
            });
        } else {
            return res.status(200).send({
                count: 0,
                message: "success",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error,
        });
    }
};
