export interface Validation {
  validate(_input: unknown): Error | null;
}
