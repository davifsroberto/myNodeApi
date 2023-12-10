export interface LogErrorRepository {
  log(_stack: string): Promise<void>;
}
