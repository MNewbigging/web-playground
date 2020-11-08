import {action, observable} from 'mobx';

export class TestState {
  @observable test: number = 0;

  @action setTest(val: number) {
    this.test = val;
  }

  @action incTest() {
    this.test++;
  }
}