declare module 'express-session' {
  interface SessionData {
    user?: { [key: string]: any }; // you can define a more detailed user type if necessary
  }
}
