declare module 'negotiator' {
  interface Headers {
    [key: string]: string;
  }

  class Negotiator {
    constructor(headers: Headers);
    languages(): string[];
    charsets(): string[];
    encodings(): string[];
    mediaTypes(): string[];
  }

  export = Negotiator;
} 