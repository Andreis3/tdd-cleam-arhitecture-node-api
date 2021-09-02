import jwt from 'jsonwebtoken';
import { IDecrypter } from '@/data/protocols/cryptography/IDecrypter';
import { IEncrypter } from '@/data/protocols/cryptography/IEncrypter';

export class JwtAdapter implements IEncrypter, IDecrypter {
    constructor(private readonly secret: string) {
        this.secret = secret;
    }

    async encrypt(value: string): Promise<string> {
        const accessToken = await jwt.sign({ id: value }, this.secret);
        return accessToken;
    }

    async decrypt(token: string): Promise<string> {
        const value: any = await jwt.verify(token, this.secret);
        return value;
    }
}
