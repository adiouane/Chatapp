import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  clientHasJoined = {}
  async create(createMessageDto: CreateMessageDto) {
    try {
      console.log(createMessageDto);
      // Use the Prisma Client to create a new message
      const newMessage = await this.prisma.user.create({
        data: createMessageDto,
      });
      
      return newMessage;
    } catch (error) {
      // Handle any potential errors here
      console.log(error);
      throw new Error('Failed to create message.');
    }
  }
  async findAll() {
    try {
      // Use the Prisma Client to find all messages
      const allMessages = await this.prisma.user.findMany();
      return allMessages;
    } catch (error) {
      // Handle any potential errors here
      console.log(error);
      throw new Error('Failed to find messages.');
    }
  }
}