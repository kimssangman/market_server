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
    const page = parseInt(req.query.page); // 페이지 번호 가져오기

    try {
        const productsPerPage = 5; // 페이지당 상품 수
        const skipCount = (page - 1) * productsPerPage; // 건너뛸 상품 수

        const products = await dbModels.Product.find()
            .skip(skipCount) // 건널뛸 문서 수
            .limit(productsPerPage); // 반환할 문서의 최대 수

        res.status(201).send(products);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error,
        });
    }
};
