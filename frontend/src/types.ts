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
    isVerified: boolean;
    bio: string;
    website: string;
    following: [
      {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
      }
    ];
    followers: [
      {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
      }
    ];
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
    isVerified: boolean;
    retweets: string[];
    bio: string;
    website: string;
    following: [
      {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
      }
    ];
    followers: [
      {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
      }
    ];
    createdAt: string;
    updatedAt: string;
  };
  loading?: boolean;
  error?: any;
  showModal?: boolean;
  setShowModal?: any;
}

export interface IUsers {
  users?: [
    {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      isVerified: boolean;
      retweets: string[];
      bio: string;
      website: string;
      following: [
        {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePic: string;
          coverPic: string;
          likes: string[];
          retweets: string[];
          isVerified: boolean;
          following: string[];
          followers: string[];
        }
      ];
      followers: [
        {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePic: string;
          coverPic: string;
          likes: string[];
          retweets: string[];
          isVerified: boolean;
          following: string[];
          followers: string[];
        }
      ];
      createdAt: string;
      updatedAt: string;
    }
  ];
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
  loading?: boolean;
}

export interface IFollow {
  follow?: any;
  user?: any;
  followButton?: string;
  setFollowButton?: any;
  following?: boolean[];
  onClick(event: any): void;
}

export interface IProfileUpdate {
  success?: boolean;
}

export interface IPinPost {
  success?: boolean;
}

export interface IUserMessage {
  user?: any;
  followButton?: string;
  setFollowButton?: any;
  following?: boolean[];
  onClick(event: any): void;
}

export interface ISelectedUser {
  selectedUser?: [
    {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      isVerified: boolean;
      retweets: string[];
      bio: string;
      website: string;
      following: [
        {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePic: string;
          coverPic: string;
          likes: string[];
          retweets: string[];
          isVerified: boolean;
          following: string[];
          followers: string[];
        }
      ];
      followers: [
        {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePic: string;
          coverPic: string;
          likes: string[];
          retweets: string[];
          isVerified: boolean;
          following: string[];
          followers: string[];
        }
      ];
      createdAt: string;
      updatedAt: string;
    }
  ];
}

export interface IChat {
  chat?: {
    _id: string;
    chatName: string;
    username: string;
    isGroupChat: boolean;
    users: [
      {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
        createdAt: string;
        updatedAt: string;
      }
    ];
    latestMessage: {
      _id: string;
      chat: string;
      content: string;
      readBy: string[];
      sender: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
        createdAt: string;
        updatedAt: string;
      };
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  success?: boolean;
  error?: string;
  name?: string;
  showModal?: boolean;
  setShowModal?: any;
  loading?: boolean;
}

export interface IChats {
  chats?: [
    {
      _id: string;
      chatName: string;
      username: string;
      isGroupChat: boolean;
      users: [
        {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePic: string;
          coverPic: string;
          likes: string[];
          retweets: string[];
          isVerified: boolean;
          bio: string;
          website: string;
          following: string[];
          followers: string[];
          createdAt: string;
          updatedAt: string;
        }
      ];
      latestMessage: {
        _id: string;
        chat: string;
        content: string;
        readBy: string[];
        sender: {
          _id: string;
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          profilePic: string;
          coverPic: string;
          likes: string[];
          retweets: string[];
          isVerified: boolean;
          bio: string;
          website: string;
          following: string[];
          followers: string[];
          createdAt: string;
          updatedAt: string;
        };
        createdAt: string;
        updatedAt: string;
      };
      createdAt: string;
      updatedAt: string;
    }
  ];
  success?: boolean;
  loading: boolean;
}

export interface IChatGroupName {
  success?: boolean;
}

export interface IMessages {
  messages?: [
    {
      _id: string;
      chat: string;
      content: string;
      readBy: string[];
      sender: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
        createdAt: string;
        updatedAt: string;
      };
      createdAt: string;
      updatedAt: string;
    }
  ];
  loading: boolean;
}

export interface IMessage {
  message: {
    _id: string;
    chat: string;
    content: string;
    readBy: string[];
    sender: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      retweets: string[];
      isVerified: boolean;
      bio: string;
      website: string;
      following: string[];
      followers: string[];
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  isGroupChat: boolean;
  index: number;
}

export interface IMessageCreate {
  message?: {
    _id: string;
    chat: string;
    content: string;
    readBy: string[];
    sender: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      retweets: string[];
      isVerified: boolean;
      bio: string;
      website: string;
      following: string[];
      followers: string[];
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  success?: boolean;
}

export interface INotifications {
  notifications: [
    {
      _id: string;
      opened: boolean;
      notificationType: string;
      entityId: string;
      userTo: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
        createdAt: string;
        updatedAt: string;
      };
      userFrom: {
        _id: string;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        profilePic: string;
        coverPic: string;
        likes: string[];
        retweets: string[];
        isVerified: boolean;
        bio: string;
        website: string;
        following: string[];
        followers: string[];
        createdAt: string;
        updatedAt: string;
      };
      createdAt: string;
      updatedAt: string;
    }
  ];
  loading?: boolean;
  success?: boolean;
}

export interface INotification {
  notification: {
    _id: string;
    opened: boolean;
    notificationType: string;
    entityId: string;
    userTo: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      retweets: string[];
      isVerified: boolean;
      bio: string;
      website: string;
      following: string[];
      followers: string[];
      createdAt: string;
      updatedAt: string;
    };
    userFrom: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      retweets: string[];
      isVerified: boolean;
      bio: string;
      website: string;
      following: string[];
      followers: string[];
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  onClick(event: any): void;
}
export interface ILatestNotification {
  notification?: {
    _id: string;
    opened: boolean;
    notificationType: string;
    entityId: string;
    userTo: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      retweets: string[];
      isVerified: boolean;
      bio: string;
      website: string;
      following: string[];
      followers: string[];
      createdAt: string;
      updatedAt: string;
    };
    userFrom: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePic: string;
      coverPic: string;
      likes: string[];
      retweets: string[];
      isVerified: boolean;
      bio: string;
      website: string;
      following: string[];
      followers: string[];
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  success?: boolean;
}

export interface IReadNotification {
  success?: boolean;
  loading?: boolean;
  error?: any;
}
