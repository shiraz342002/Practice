export const constTexts = {
  authRoute: {
    name: "auth",
    login: "signin",
    adminLogin: "adminSignin",
    supportLogin: "supportLogin",
    moderatorLogin: "moderatorLogin",
    signUp: "signup",
    forgetPassword: "forget-password",
    resetPassword: "reset-password",
    verifyOtp: "verify-otp",
    me: "me",
    phoneAuth: "phoneAuth",
    verifyPhoneOTP: "verifyPhoneOTP",
    phoneAuthUpdate: "phoneAuthUpdate",
    socialAuth: "socialAuth",
    verifyAccount: "verifyEmail",
    otpResend: "otpResend",
    logOut: "logOut",
    blockUserAccount: "blockUserAccount/:id",
  },
  postRoute: {
    name: "post",
    getAllPosts: "getAllPosts",
    my: "myPost",
    specific: "specific",
    reply: "reply/:id",
    completedByOther: "completedByOther",
    update: ":id",
    delete: ":id",
    details: "details/:id",
    deleteImage: "deleteImage/:id",
    search: "search",
    viewOtherPosts:"ViewOthersPost/:id",
    viewMyAds:"ViewMyPosts"
  },
  commentRoute: {
    name: "comment",
    my: "myreply",
    specific: "specific",
    Add: "AddComent/:postId",
    Reply:"AddReply/:comentId",
    update: ":commentId",
    delete: ":commentId",
    details: "details",
    search: "search",
    getCommentWithReplies:"getCommentWithReplies/:commentId",
    getPostCommentsWithReplies:"getPostCommentsWithReplies/:postId",
    getPostComments:"getPostComments/:postId"
  },
  mailRoute: {
    name: "mail",
    report: "report",
    contactUs: "contactUs",
  },

  policiesRoute: {
    name: "policy",
    privacy: "privacy",
    teramAndCond: "teramAndCond",
    refund: "refund",
    update: ":id",
    delete: ":id",
    getOne: ":id",
  },

  reviewsRoute: {
    name: "reviews",
    PostReview:"ReviewUserService/:revieweeId",
    update: ":id",
    delete: ":id",
    getOne: ":id",
  },

  searcRoute: {
    name: "search",
    filter: "filter",
  },

  userRoute: {
    name: "users",
    otherUserProfile: "ViewOtherUserProfile/:id",
    allUsers: "allUsers",
    dashUsers: "dashUsersCount",
    delete: ":id",
    schema: "/schema",
    handleBlock: "handleBlock",
    deleteAccount: "deleteAccount",
    myprofile:"viewMyProfile",
    
  },

  messageRoute:{
    create:"createMessage/:chatId"
  },
  chatRoute: {
    name: "chat",
    inbox: "inbox",
    detail: ":id",
    create:"CreateChatRoom/:id"
  },

  notifyRoute: {
    name: "notification",
    count: "count",
    chatCount: "chatCount",
    updateChat: "updateChat",
    detail: ":id",
    update: ":id",
  },
};
