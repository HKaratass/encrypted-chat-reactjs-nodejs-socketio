const express = require('express');
const app = express();
require("dotenv").config();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT,
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT;

const users = [];
io.on('connection', (socket) => {
    console.log(`+ ${socket.id} CONNECTED`);
    users.push(socket.id);

    socket.on('check', ({ returnId, connectionErr, decryptionErr }) => {
        if (connectionErr) {
            io.to(returnId).emit('private message', {
                sender: returnId,
                message: "Karşı taraf bağlantıya katılmadı. Mesaj iletilemedi."
            });
        }
        if (decryptionErr) {
            io.to(returnId).emit('private message', {
                sender: returnId,
                message: "Karşı taraf mesajı çözümleyemedi. Anahtar kelime uyuşmuyor."
            });
        }
    });

    socket.on('private message', ({ targetId: recipientSocketId, message: message }) => {
        if (!users.includes(recipientSocketId)) {
            console.log("TargetID (ID Bulunamadı): ", recipientSocketId);
            console.log("SenderID: ", socket.id);
            console.log("Message (ID Bulunamadı): ", message);
            io.to(socket.id).emit('private message', {
                sender: socket.id,
                message: "ID bulunamadı."
            });
        } else {
            console.log("TargetID: ", recipientSocketId);
            console.log("Message: ", message);

            if (recipientSocketId) {
                io.to(recipientSocketId).emit('private message', {
                    sender: socket.id,
                    message
                });
            }
        }

    });

    socket.on('disconnect', () => {
        console.log(`- ${socket.id} DISCONNECTED`);
    });
});

server.listen(PORT, () => {
    console.log(`SERVER LISTEN PORT:${PORT}`);
});