import User from "../models/userModel";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: () => User.find(),
  },

  Mutation: {
    createUser: async (
      _: any,
      { username, firstName, lastName, email, password }: any
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password,
      });
      console.log(user);
      return user;
    },
  },
};
