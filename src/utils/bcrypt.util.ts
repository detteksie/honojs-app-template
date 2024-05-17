// import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  // const salt = await genSalt(12);
  // const hash = await hash(password, salt);

  const hash = await Bun.password.hash(password, {
    algorithm: 'bcrypt',
    cost: 12, // number between 4-31
  });

  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  // const isMatch = await compare(password, hash);
  const isMatch = Bun.password.verify(password, hash);
  return isMatch;
};
