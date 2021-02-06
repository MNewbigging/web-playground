export class RandomId {
  private static readonly letters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  public static newId(length: number): string {
    let wk = '';
    const sl = this.letters.length;
    for (let ic = 0; ic < length; ic++) {
      wk += this.letters.charAt(Math.floor(Math.random() * sl));
    }
    return wk;
  }
}
