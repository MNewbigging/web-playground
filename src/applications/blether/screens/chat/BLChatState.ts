import { action, observable } from 'mobx';
import { BLContentMessage } from '../../model/BLMessages';
import { BLParticipant } from '../../model/BLParticipant';

export class BLChatState {
  public participant: BLParticipant;
  @observable public inputText = '';

  constructor(p: BLParticipant) {
    this.participant = p;
  }

  @action public setInputText(text: string) {
    this.inputText = text;
  }

  public sendMessage() {
    console.log('pressed enter!');
    if (!this.inputText.length) {
      return;
    }

    const message = new BLContentMessage(
      this.participant.id,
      this.inputText,
      this.participant.name,
      this.getCurrentTimestamp()
    );

    this.participant.chatLog.push(message);
    this.participant.sendMessage(message);
    this.inputText = '';
  }

  private getCurrentTimestamp() {
    const date = new Date();
    let hours = date.getHours().toString();
    let mins = date.getMinutes().toString();

    if (hours.length < 2) {
      hours = '0' + hours;
    }

    if (mins.length < 2) {
      mins = '0' + mins;
    }

    return `${hours}:${mins}`;
  }
}
