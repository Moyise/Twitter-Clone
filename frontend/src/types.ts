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
    coverPic: string;
    likes: string[];
    retweets: string[];
    createdAt: string;
    updatedAt: string;
  };
  loading?: boolean;
  error?: any;
}

export interface IUser {
  user?: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePic: string;
    coverPic: string;
    likes: string[];
    retweets: string[];
    createdAt: string;
    updatedAt: string;
  };
  loading?: boolean;
  error?: any;
}

export interface IPosts {
  posts?: [
    {
      _id: string;
      content: string;
      pinned: boolean;
      likes: string[];
      retweetUsers: string[];
      createdAt: string;
      user: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        profilePic: string;
        coverPic: string;
      };
      retweetData: {
        _id: string;
        content: string;
        pinned: boolean;
        likes: string[];
        retweetUsers: string[];
        createdAt: string;
        user: {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          profilePic: string;
          coverPic: string;
        };
      };
      replyTo: {
        _id: string;
        content: string;
        pinned: boolean;
        likes: string[];
        retweetUsers: string[];
        createdAt: string;
        user: {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          profilePic: string;
          coverPic: string;
        };
      };
    }
  ];
  loading?: boolean;
  error?: any;
}

export interface IPost {
  post: {
    _id: string;
    content: string;
    pinned: boolean;
    likes: string[];
    retweetUsers: string[];
    createdAt: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      profilePic: string;
      coverPic: string;
    };
    retweetData: {
      _id: string;
      content: string;
      pinned: boolean;
      likes: string[];
      retweetUsers: string[];
      createdAt: string;
      user: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        profilePic: string;
        coverPic: string;
      };
    };
    replyTo: {
      _id: string;
      content: string;
      pinned: boolean;
      likes: string[];
      retweetUsers: string[];
      createdAt: string;
      user: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        profilePic: string;
        coverPic: string;
      };
    };
  };
  liked?: boolean;
  retweeted?: boolean;
  showModal?: boolean;
  setShowModal?: any;
}

export interface ICreatePost {
  success?: boolean;
  loading?: boolean;
  error?: any;
}

export interface IDelete {
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

export interface IPostReply {
  success?: boolean;
  loading?: boolean;
  error?: any;
}

export interface IPostDetails {
  post?: {
    _id: string;
    content: string;
    pinned: boolean;
    likes: string[];
    retweetUsers: string[];
    createdAt: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      profilePic: string;
      coverPic: string;
    };
    retweetData: {
      _id: string;
      content: string;
      pinned: boolean;
      likes: string[];
      retweetUsers: string[];
      createdAt: string;
      user: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        profilePic: string;
        coverPic: string;
      };
    };
    replyTo: {
      _id: string;
      content: string;
      pinned: boolean;
      likes: string[];
      retweetUsers: string[];
      createdAt: string;
      user: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        profilePic: string;
        coverPic: string;
      };
    };
  };
}
