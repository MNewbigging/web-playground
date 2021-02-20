// tslint:disable: max-classes-per-file

export enum BLMessageType {
  PARTICIPANT_NAMES = 'participant-names',
}

export abstract class BLBaseMessage {
  constructor(public type: BLMessageType) {}
}

export class BLParticipantNamesMessage extends BLBaseMessage {
  public names: string[];
  constructor(names: string[]) {
    super(BLMessageType.PARTICIPANT_NAMES);
    this.names = names;
  }
}
