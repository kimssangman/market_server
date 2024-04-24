/*-------------------------------------------------
	get product
-------------------------------------------------*/
exports.getProduct = async (req, res) => {
    console.log(`
--------------------------------------------------  
  API  : getProduct
  router.get('product', productController.product) 
--------------------------------------------------`);
    const dbModels = global.DB_MODELS;

    try {
        const product = await dbModels.Product.find();

        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error,
        });
    }
};
