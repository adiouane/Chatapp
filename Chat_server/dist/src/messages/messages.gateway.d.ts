import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, client: Socket): Promise<{
        id: number;
        name: string;
        message: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        message: string;
        createdAt: Date;
    }[]>;
}
