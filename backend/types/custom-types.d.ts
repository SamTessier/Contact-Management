declare module "express-session" {
    export interface SessionData {
      userId: any;
    }
  }

declare module 'express-serve-static-core' {
    interface Request {
      session: Session; 
    }
  }