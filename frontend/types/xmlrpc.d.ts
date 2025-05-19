declare module 'xmlrpc' {
  interface Client {
    methodCall(method: string, params: any[], callback: (error: any, value: any) => void): void;
  }

  interface ClientOptions {
    host: string;
    port: number;
    path: string;
  }

  export function createClient(options: ClientOptions): Client;
} 