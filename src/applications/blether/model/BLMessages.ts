// tslint:disable: max-classes-per-file

export enum BLMessageType {
  POLL = 'poll',
  PARTICIPANT_NAMES = 'participant-names',
  CONTENT = 'content',
  NOTE = 'note',
}

export abstract class BLBaseMessage {
  constructor(public type: BLMessageType, public senderId: string) {}
}

export class BLPollMessage extends BLBaseMessage {
  constructor(id: string) {
    super(BLMessageType.POLL, id);
  }
}

export class BLParticipantNamesMessage extends BLBaseMessage {
  constructor(id: string, public names: string[]) {
    super(BLMessageType.PARTICIPANT_NAMES, id);
  }
}

export class BLContentMessage extends BLBaseMessage {
  public content: string;
  public senderName: string;
  public timestamp: string;
  constructor(id: string, content: string, senderName: string, timestamp: string) {
    super(BLMessageType.CONTENT, id);
    this.content = content;
    this.senderName = senderName;
    this.timestamp = timestamp;
  }
}

export class BLNoteMessage extends BLBaseMessage {
  constructor(id: string, public content: string) {
    super(BLMessageType.NOTE, id);
  }
}
