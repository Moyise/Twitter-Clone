export interface IAction {
  type: string;
  payload: any;
}

export interface IUserAuth {
  userInfo?: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic: string;
    likes: string[];
    retweets: string[];
    createdAt: string;
    updatedAt: string;
  };
  loading?: boolean;
  error?: any;
}

export interface IPosts {
  posts: [
    {
      _id: string;
      content: string;
      likes: string[];
      retweetUsers: string[];
      retweetData: string;
      createdAt: string;
      user: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        profilePic: string;
      };
    }
  ];
  loading: boolean;
  error: any;
}

export interface IPost {
  post: {
    _id: string;
    content: string;
    likes: string[];
    retweetUsers: string[];
    retweetData: string;
    createdAt: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      profilePic: string;
    };
  };
  liked: boolean;
  retweeted: boolean;
}

export interface ICreatePost {
  success?: boolean;
  loading?: boolean;
  error?: any;
}

export interface ILike {
  success?: boolean;
  likes?: {
    _id: string;
    likes: string[];
  };
  error?: any;
}
