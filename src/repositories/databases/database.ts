export default interface Database {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
