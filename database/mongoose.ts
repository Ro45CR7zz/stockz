/*
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/stocks_app";

declare global{
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if(!cached){
    cached= global.mongooseCache= {conn: null, promise: null};
}

export const connectToDatabase = async () => {
    if(!MONGODB_URI) throw new Error("MONGODB_URI must be set within .env");

    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false});
    }

    try{
        cached.conn = await cached.promise;
    } catch(err){
        cached.promise = null;
        throw err;
    }

    console.log(`connected to database ${process.env} - ${MONGODB_URI}`);
}

either above code or this, both work
*/

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI must be set in .env.local");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected:", mongoose.connection.name);
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
};



