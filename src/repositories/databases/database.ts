export default interface Database {
  connect: () => void;
  disconnect: () => Promise<void>;
}
