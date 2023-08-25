import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    clientHasJoined: {};
    create(createMessageDto: CreateMessageDto): Promise<{
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
