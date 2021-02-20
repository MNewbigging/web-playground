// tslint:disable: max-classes-per-file

export enum BLMessageType {
  POLL = 'poll',
  PARTICIPANT_NAMES = 'participant-names',
  CONTENT = 'content',
}

export abstract class BLBaseMessage {
  constructor(public type: BLMessageType) {}
}

export class BLPollMessage extends BLBaseMessage {
  constructor() {
    super(BLMessageType.POLL);
  }
}

export class BLParticipantNamesMessage extends BLBaseMessage {
  constructor(public names: string[]) {
    super(BLMessageType.PARTICIPANT_NAMES);
  }
}

export class BLContentMessage extends BLBaseMessage {
  constructor(public content: string) {
    super(BLMessageType.CONTENT);
  }
}
