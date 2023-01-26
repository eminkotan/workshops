import * as borsh from "borsh"
import { Buffer } from "buffer"
import { 
    PublicKey, 
    TransactionInstruction 
} from '@solana/web3.js'


export enum MyInstruction {
    SayHello,
    SayGoodbye,
}


export class SayHello {

    instruction: MyInstruction
    hello_message: string

    constructor(props: {
        instruction: MyInstruction,
        hello_message: string,
    }) {
        this.instruction = props.instruction
        this.hello_message = props.hello_message
    }

    toBuffer() { 
        return Buffer.from(borsh.serialize(SayHelloSchema, this)) 
    }
}

export const SayHelloSchema = new Map([
    [ SayHello, { 
        kind: 'struct', 
        fields: [ 
            ['instruction', 'u8'],
            ['hello_message', 'string'],
        ],
    }]
])

export function createSayHelloInstruction(
    payer: PublicKey,
    programId: PublicKey,
    helloMessage: string,
): TransactionInstruction {

    const myInstructionObject = new SayHello({
        instruction: MyInstruction.SayHello,
        hello_message: helloMessage,
    })

    return new TransactionInstruction({
        keys: [
            {pubkey: payer, isSigner: true, isWritable: true},
        ],
        programId: programId,
        data: myInstructionObject.toBuffer(),
    })
}


// Implement the client-side serialization of `SayGoodbye` to build a transaction with an instruction 
//      that will invoke our program's `SayGoodbye` operation.

export class SayGoodbye {

    instruction: MyInstruction
    goodbye_message: string
    second_goodbye_message: string
}
