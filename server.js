import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    maxHttpBufferSize: 10 * 1024 * 1024, // 10MB para arquivos
});

// In-memory storage — tudo desaparece ao parar o servidor
const messages = [];
const MAX_MESSAGES = 200;
let onlineUsers = new Map(); // socketId -> userName

io.on('connection', (socket) => {
    console.log(`[+] Conectado: ${socket.id}`);

    // Usuário entra no chat
    socket.on('join', (userName) => {
        onlineUsers.set(socket.id, userName);
        console.log(`[✓] ${userName} entrou na sala`);

        // Enviar histórico de mensagens
        socket.emit('history', messages);

        // Notificar todos sobre a contagem de online
        io.emit('onlineCount', onlineUsers.size);

        // Notificar entrada
        const systemMsg = {
            id: Date.now().toString() + '-sys',
            type: 'system',
            content: `${userName} entrou na sala`,
            timestamp: new Date().toISOString(),
        };
        messages.push(systemMsg);
        io.emit('message', systemMsg);
    });

    // Receber mensagem
    socket.on('message', (msg) => {
        const fullMsg = {
            ...msg,
            id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 5),
            timestamp: new Date().toISOString(),
        };

        messages.push(fullMsg);

        // Limitar histórico
        if (messages.length > MAX_MESSAGES) {
            messages.splice(0, messages.length - MAX_MESSAGES);
        }

        // Broadcast para todos
        io.emit('message', fullMsg);
    });

    // Desconexão
    socket.on('disconnect', () => {
        const userName = onlineUsers.get(socket.id);
        onlineUsers.delete(socket.id);

        if (userName) {
            console.log(`[-] ${userName} saiu da sala`);
            io.emit('onlineCount', onlineUsers.size);

            const systemMsg = {
                id: Date.now().toString() + '-sys',
                type: 'system',
                content: `${userName} saiu da sala`,
                timestamp: new Date().toISOString(),
            };
            messages.push(systemMsg);
            io.emit('message', systemMsg);
        }
    });
});

const PORT = 3001;
const HOST = '0.0.0.0';
server.listen(PORT, HOST, () => {
    console.log(`\n🎓 Servidor Sala de Aula rodando na porta ${PORT}`);
    console.log(`   Acessível em toda a rede local (${HOST}:${PORT})`);
    console.log(`   Mensagens em memória (sem banco de dados)\n`);
});
