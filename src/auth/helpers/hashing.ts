import * as bcrypt from 'bcrypt';

export const hash = async (input: string) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(input, salt);
};

export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
