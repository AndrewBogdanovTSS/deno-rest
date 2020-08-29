import {ObjectId} from 'https://deno.land/x/mongo@v0.11.0/mod.ts'
import {getCollection} from '../db.ts'

export interface IResource {
  title: string
  description: string
  imageUrl: string
  url: string
}

interface IResourceDoc extends IResource {
  _id: ObjectId
}

const collection = await getCollection()
const map = (data:IResourceDoc) => {
  let result = {id: data._id.$oid, ...data}
  delete result._id
  return result
}

export default {
  async getAll():Promise<any[]> {
    const result = await collection!.find()
    return result.map(map)
  },
  async get(id:string) {
    try {
      return map(await collection!.findOne({_id: {$oid: id}}))
    } catch (err) {
      console.log('db error:', err)
      throw new Error('Failed to find a resource')
    }
  },
  async update(id:string, data:IResource) {
    try {
      return await collection!.updateOne({_id: ObjectId(id)}, {$set: data})
    } catch (err) {
      console.log('db error:', err)
      throw new Error('Failed to update a resource')
    }
  },
  async add(resource:IResource) {
    try {
      const {$oid} = await collection!.insertOne(resource)
      return $oid
    } catch (err) {
      console.log('db error:', err)
      throw new Error('Failed to add a resource')
    }
  },
  async delete(id:string) {
    try {
      return await collection!.deleteOne({_id: {$oid: id}})
    } catch (err) {
      console.log('db error:', err)
      throw new Error('Failed to delete a resource')
    }
  }
}