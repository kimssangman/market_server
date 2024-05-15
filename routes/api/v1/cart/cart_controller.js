const { ObjectId } = require("mongodb");

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
exports.getCarts = async (req, res) => {
    console.log(`
--------------------------------------------------  
  API  : Cart
  router.post('getCarts', cartController.getCarts) 
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

    const criteria = {
        userId: req.query._id,
    };

    // console.log(criteria);

    try {
        const carts = await dbModels.Cart.aggregate([
            {
                $match: {
                    userId: ObjectId(criteria.userId),
                },
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    name: 1,
                    price: 1,
                    count: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    total: { $multiply: ["$price", "$count"] }, // 각 상품의 총 가격 계산
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: {
                    path: "$product",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $addFields: {
                    image: "$product.image",
                },
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    name: 1,
                    price: 1,
                    count: 1,
                    image: 1,
                    total: 1, // 총 가격 추가
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        if (carts) {
            // 제품의 총 가격도 보낸다.
            const total = await dbModels.Cart.aggregate([
                {
                    $match: {
                        userId: ObjectId(criteria.userId),
                    },
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: { $multiply: ["$price", "$count"] } }, // 모든 상품의 총 가격 계산
                    },
                },
            ]);

            return res.status(200).send({
                carts,
                total,
                message: "success",
            });
        } else {
            return res.status(200).send({
                carts: 0,
                total: 0,
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
