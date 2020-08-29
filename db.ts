import {MongoClient, Collection} from 'https://deno.land/x/mongo@v0.11.0/mod.ts'
import {getEnv} from './utils/env.ts'

const cluster = getEnv('DB_CLUSTER')
const user = getEnv('DB_USER')
const password = getEnv('DB_PASSWORD')

let collection: Collection<any> | null = null

export async function getCollection(name: string = 'resources') {
  if(!collection) {
    const client = new MongoClient()
    const uri = `mongodb+srv://${user}:${password}@${cluster}/?retryWrites=true&w=majority`
    await client.connectWithUri(uri)
    const db = client.database('course-resources')
    collection = db.collection(name)
  }
  return collection
}