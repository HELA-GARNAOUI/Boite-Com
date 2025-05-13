export interface Endpoint {
  path: string;
  method: string;
  description: string;
  headers?: Record<string, string>;
  queryParams?: Parameter[];
  requestBody?: RequestBody;
  response?: Response;
  authentication?: boolean;
}

export interface Parameter {
  name: string;
  type: string;
  description?: string;
  required?: boolean;
}

export interface RequestBody {
  contentType: string;
  schema?: Record<string, any>;
  example?: string;
}

export interface Response {
  status: number;
  contentType: string;
  schema?: Record<string, any>;
  example?: string;
}

export interface ApiCategory {
  name: string;
  description: string;
  endpoints: Endpoint[];
}

export interface ApiDoc {
  title: string;
  version: string;
  description: string;
  categories: ApiCategory[];
}