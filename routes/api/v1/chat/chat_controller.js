// 메시지 가져오기
exports.getMessage = async (req, res) => {
    console.log(`
--------------------------------------------------
  API  : getMessage
  router.get('/getMessage", chatController.getMessage);
--------------------------------------------------`);

    const dbModels = global.DB_MODELS;

    console.log(req.query);

    const criteria = {
        roomId: req.query._id,
    };

    try {
        const message = await dbModels.Message.find(criteria);

        console.log(message);

        // if (!findUser) {
        //     return res.status(401).send({
        //         message: "An error has occurred",
        //     });
        // }

        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(500).send("db Error");
    }
};
