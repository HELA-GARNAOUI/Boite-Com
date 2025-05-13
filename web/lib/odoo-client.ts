type OdooClientConfig = {
  baseUrl: string
  db: string
  sessionId?: string
  username?: string
  password?: string
}

export class OdooClient {
  private baseUrl: string
  private db: string
  private sessionId: string | null
  private username: string | null
  private password: string | null
  private uid: number | null

  constructor(config: OdooClientConfig) {
    this.baseUrl = config.baseUrl
    this.db = config.db
    this.sessionId = config.sessionId || null
    this.username = config.username || null
    this.password = config.password || null
    this.uid = null
  }

  async connect(): Promise<boolean> {
    if (this.sessionId) {
      // Verify session is valid
      try {
        const response = await this.callRPC("/web/session/check", {})
        return response.result
      } catch (error) {
        console.error("Session check failed:", error)
        this.sessionId = null
        return false
      }
    } else if (this.username && this.password) {
      // Login with credentials
      try {
        const response = await this.callRPC("/web/session/authenticate", {
          db: this.db,
          login: this.username,
          password: this.password,
        })

        if (response.result && response.result.uid) {
          this.uid = response.result.uid
          this.sessionId = response.result.session_id
          return true
        }
        return false
      } catch (error) {
        console.error("Authentication failed:", error)
        return false
      }
    }

    return false
  }

  async callRPC(endpoint: string, params: any): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (this.sessionId) {
      headers["X-Openerp-Session-Id"] = this.sessionId
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params,
          id: Math.floor(Math.random() * 1000000000),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("RPC call failed:", error)
      throw error
    }
  }

  async searchRead(model: string, domain: any[], fields: string[], options: any = {}): Promise<any[]> {
    try {
      const response = await this.callRPC("/web/dataset/search_read", {
        model,
        domain,
        fields,
        ...options,
      })

      return response.result.records || []
    } catch (error) {
      console.error(`searchRead failed for ${model}:`, error)
      throw error
    }
  }

  async create(model: string, data: any): Promise<number> {
    try {
      const response = await this.callRPC("/web/dataset/call_kw", {
        model,
        method: "create",
        args: [data],
        kwargs: {},
      })

      return response.result
    } catch (error) {
      console.error(`create failed for ${model}:`, error)
      throw error
    }
  }

  async write(model: string, id: number, data: any): Promise<boolean> {
    try {
      const response = await this.callRPC("/web/dataset/call_kw", {
        model,
        method: "write",
        args: [[id], data],
        kwargs: {},
      })

      return response.result
    } catch (error) {
      console.error(`write failed for ${model}:`, error)
      throw error
    }
  }

  async unlink(model: string, ids: number[]): Promise<boolean> {
    try {
      const response = await this.callRPC("/web/dataset/call_kw", {
        model,
        method: "unlink",
        args: [ids],
        kwargs: {},
      })

      return response.result
    } catch (error) {
      console.error(`unlink failed for ${model}:`, error)
      throw error
    }
  }

  async callMethod(model: string, method: string, args: any[] = [], kwargs: any = {}): Promise<any> {
    try {
      const response = await this.callRPC("/web/dataset/call_kw", {
        model,
        method,
        args,
        kwargs,
      })

      return response.result
    } catch (error) {
      console.error(`callMethod ${method} failed for ${model}:`, error)
      throw error
    }
  }
}
