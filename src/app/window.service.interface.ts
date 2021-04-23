export interface IWindowService {
    isSSR(): boolean;
    getReference(): Window | null;
    setTimeout(callback: Function, timeout: number): number | undefined;
}