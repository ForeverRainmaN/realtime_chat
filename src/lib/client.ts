import { treaty } from '@elysiajs/eden'
import { app, type App } from "../app/api/[[...slugs]]/route"

export const client =
  typeof process !== 'undefined'
    ? treaty(app).api
    : treaty<App>('localhost:3000').api
    