import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password');
    }

    const passwordMathed = await compare(password, user.password);

    if (!passwordMathed) {
      throw new Error('Incorrect email/password');
    }

    delete user.password;

    return {
      user,
    };
  }
}