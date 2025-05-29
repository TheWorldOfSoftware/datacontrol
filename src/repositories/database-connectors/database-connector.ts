export default interface DatabaseConnector {
  connect: () => void;
  disconnect: () => Promise<void>;
}
