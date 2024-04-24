// user profile 가져오기
exports.getUserProfile = async (req, res) => {
    console.log(`
--------------------------------------------------
  User Profile: ${req.decoded._id}
  router.get('/getUserProfile', userController.getUserProfile);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    const criteria = {
        _id: req.decoded._id,
    };

    /*----------------------------------------------------------
    *           projection
    *  projection은 원하는 필드를 가져올 때 사용한다.
    *  1은 true로 선택한 필드를 가져온다. 
    *  0은 false로 선택한 필드를 제외한다.
    *  _id 를 제외한 다른 필드들은 0 과 1 혼용해서 사용할 수 없다.
    *  유일한 예외는 _id 이다. _id 필드는 0과 1 둘 다 혼용 가능하다.
    *  사용 시 _id를 제외 무조건 0 만 쓰거나 1 만 써야한다.
    *  https://stackoverflow.com/questions/24949544/mongodb-cant-canonicalize-query-badvalue-projection-cannot-have-a-mix-of-incl
    ----------------------------------------------------------*/
    const projection = {
        _id: 0,
        id: 1,
        name: 1,
    };

    try {
        const findUser = await dbModels.User.findOne(criteria, projection);

        if (!findUser) {
            return res.status(401).send({
                message: "An error has occurred",
            });
        }

        return res.send(findUser);
    } catch (err) {
        console.log(err);
        return res.status(500).send("db Error");
    }
};
