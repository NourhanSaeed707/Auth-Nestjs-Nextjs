import * as bcrypt from 'bcrypt';
import { raw } from 'express';
import { truncate } from 'fs';

export async function encodePassword (rawPassword: string){
    console.log("salt");
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(rawPassword, salt);
   // console.log(hash);
    //return hash;
}

export async function comparedPasswords (rawPassword: string, hash: string) {
      return await bcrypt.compare(rawPassword, hash);    
}