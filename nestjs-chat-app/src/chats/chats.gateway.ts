import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { Chat } from './schemas/chat.schemas';
import { UsersService } from '../users/users.service';
import { User } from '../users/interface/user.interface'; // Adjust import path

@WebSocketGateway({ namespace: 'msg' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly connectedUsers = new Map<string, Socket>();
  
    @WebSocketServer()
    server: Server;

    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {}

    async handleConnection(socket: Socket) {
        console.log('Socket connected:', socket.id);
        const token = socket.handshake.headers.authorization;
        const user = await this.authService.getUserFromToken(token) as User; // Ensure proper type casting

        if (user) {
            console.log('User connected:', user, 'Socket ID:', socket.id);
            this.connectedUsers.set(user._id.toString(), socket); // Use _id
            await this.userService.chatOpen(user._id.toString(), true); // Use _id
        } else {
            console.log('Authentication failed for socket:', socket.id);
            socket.disconnect();
        }
    }

    async handleDisconnect(socket: Socket) {
        console.log('Socket disconnected:', socket.id);
        const userId = Array.from(this.connectedUsers.entries()).find(
            ([key, value]) => value === socket,
        )?.[0];
        console.log('Disconnect userId:', userId);
        if (userId) {
            await this.userService.chatOpen(userId, false); // Use userId
            this.connectedUsers.delete(userId);
        }
    }

    async createChat(chat: Chat) {
        console.log(this.connectedUsers);
        const recipientSocketId = this.getRecipientSocketId(chat.recipientId.toString());
        if (recipientSocketId) {
            this.server.to(recipientSocketId).emit('messageToClient', chat);
        }
    }

    getRecipientSocketId(recipientId: string): string | undefined {
        return this.connectedUsers.get(recipientId)?.id;
    }
}
