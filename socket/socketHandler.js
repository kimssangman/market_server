module.exports = function (socketNameSpace, socket, app) {
    /*----------------------------------
    *  join room
    ----------------------------------*/
    socket.on("join:room", async (data) => {
        console.log(
            `
+-------------------------------------------+
|
|       [join:room]
|        
|       room: ${data._id}
|       
+-------------------------------------------+
        `
        );

        // join room
        socket.join(data._id);
    });

    /*----------------------------------
    *  자신 포함 자신이 속한 room에 메세지 전송
    ----------------------------------*/
    socket.on("message:send", async (data) => {
        console.log(
            `
+-------------------------------------------+
|
|       [message:send]
|        
|       message data: ${data}
|       
+-------------------------------------------+
        `
        );

        const dbModels = global.DB_MODELS;

        console.log("data", data);

        // 관리자일 경우 룸, 받는사람 다 상대방
        if (data.isAdmin) {
            let criteria = {
                roomId: data.receiver,
                sender: data._id,
                receiver: data.receiver,
                content: data.content,
            };

            const newMessage = dbModels.Message(criteria);
            await newMessage.save();
        }
        // 관리자가 아닐 경우 룸 본인, 받는사람 관리자
        else {
            let criteria = {
                roomId: data._id,
                sender: data._id,
                receiver: "6632021a82a857b0139e0026",
                content: data.content,
            };

            const newMessage = dbModels.Message(criteria);
            await newMessage.save();
        }

        socketNameSpace.to(socket.roomName).emit("message:receive", data);
    });

    /*----------------------------------
    *  자신 포함 모든 room에 메세지 전송
    ----------------------------------*/
    socket.on("message:sendAll", (data) => {
        console.log(
            `
+-------------------------------------------+
|
|       [message:sendAll]
|        
|       message data: ${data}
|       
+-------------------------------------------+
        `
        );
        socketNameSpace.emit("message:receive", data);
    });

    /*----------------------------------
    *  disconnect
    ----------------------------------*/
    socket.on("disconnect", async () => {
        console.log(
            `
+-------------------------------------------+
|
|       [disconnect]
|       
+-------------------------------------------+
        `
        );
        const roomData = {
            roomName: socket.roomName,
            message: "[ " + socket.userName + " ]" + "님이 퇴장하셨습니다.",
        };

        socketNameSpace
            .to(socket.roomName)
            .emit("disconnect:message", roomData);
    });

    // socket.on('set:room', (roomInfo)=> {
    //     socket.leave(socket.roomName);
    //     socket.join(roomInfo.roomName);
    //     socket.roomName = roomInfo.roomName
    //     console.log('소켓 아이디 (사용자 ID와 비슷)-------------------')
    //     console.log(socket.id)
    //     console.log('소켓 룸 목록------------------------')
    //     console.log(socketNameSpace.adapter.rooms)
    //     console.log('소켓 룸 목록 중 름 안에 참가한 아이디 검색----------')
    //     console.log(socketNameSpace.adapter.rooms.get(roomInfo.roomName))
    //     console.log('-------------------------')
    // })
};
