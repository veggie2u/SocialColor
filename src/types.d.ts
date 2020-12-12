interface IUser {
    email: string
  }
  
type ContextType = {
    app: any
    database: any
    api: {
        logoutUser: () => void
        loginUser: (email: string, password: string) => Promise<firebase.default.auth.UserCredential | null>
        getCurrentUser: () => Promise<firebase.default.User | null>
        registerUser: (email: string, password: string) => Promise<firebase.default.auth.UserCredential | null>
    }
  }