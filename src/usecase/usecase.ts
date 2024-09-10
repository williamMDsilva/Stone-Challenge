export interface Usecase<Input, Output> {
    call(input: Input): Promise<Output>;
}