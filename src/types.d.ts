interface IUser {
    email: string
}

interface IColor {
  color: string
  user: string
  timestamp: number
}

type ContextType = {
    app: any
    database: any
    api: {
        logoutUser: () => void
        loginUser: (email: string, password: string) => Promise<firebase.default.auth.UserCredential | null>
        getCurrentUser: () => Promise<firebase.default.User | null>
        registerUser: (email: string, password: string) => Promise<firebase.default.auth.UserCredential | null>
        getColors: () => void
        setCurrentColor: (color: string) => void
    }
  }