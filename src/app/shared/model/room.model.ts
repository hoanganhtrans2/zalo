import { MessageModel } from './message.model';

export class RoomModel {
  roomId: string;
  roomType: string;
  roomName: string;
  roomImage: string;
  roomNotify: number;
  roomConversations: any[];
  roomMember: any[];

  constructor(roomId, roomType, roomMember, roomName) {
    this.roomId = roomId;
    this.roomType = roomType;
    this.roomMember = roomMember;
    if (this.roomType === 'one') {
      this.roomName = roomMember[0].username;
      this.roomImage = roomMember[0].imgurl;
    } else {
      this.roomName = roomName;
      this.roomImage = '../../assets/group1.png';
    }
  }

  addMessage(message: MessageModel) {
    this.roomConversations.unshift(message);
  }
  getAllMessage() {
    return this.roomConversations;
  }
  getAllMember() {
    return this.roomMember;
  }
  setListConversitions(value) {
    this.roomConversations = value;
    console.log('run set list');
  }
  setListMember(list) {
    this.roomMember = list;
  }
}
