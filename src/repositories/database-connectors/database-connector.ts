export default interface DatabaseConnector {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
