export default class Database {
  public accessor host: string;

  public accessor username: string;

  public accessor password: string;

  public constructor(
    host: string,
    credentials: Readonly<{ username: string; password: string }>
  ) {
    this.host = host;
    this.username = credentials.username;
    this.password = credentials.password;
  }

  public updatePassword(password: string): void {
    this.password = password;
  }
}
