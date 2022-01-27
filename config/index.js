const Base_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/trendata-api/api";

const BASE_API_FE =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/api";

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const API_FE = {
  LoginUrl: BASE_API_FE + "/login",
  UserUrl: BASE_API_FE + "/user",
  LogoutUrl: BASE_API_FE + "/logout",
};

export const API_URL = {
  BaseUrl: Base_API_URL,
  GetClients: Base_API_URL + "/client",
  GetAllClient: Base_API_URL + "/client/getall",
  AddClient: Base_API_URL + "/client/save",
  DeleteClient: Base_API_URL + "/client/delete",
  UpdateClient: Base_API_URL + "/client/update",
  SearchClient: Base_API_URL + "/client/search",
  ClientCheckDBExist: Base_API_URL + "/client/checkdbexist",  
  SearchMedia: Base_API_URL + "/media/search",
  GetMedias: Base_API_URL + "/media",
  GetAllMedia: Base_API_URL + "/media/getall",
  AddMedia: Base_API_URL + "/media/save",
  DeleteMedia: Base_API_URL + "/media/delete",
  UpdateMedia: Base_API_URL + "/media/update",
  Login: Base_API_URL + "/login",
  Me: Base_API_URL + "/me",
  AddFeed: Base_API_URL + "/feed/save",
  GetConversationTypes: Base_API_URL + "/conversationtype",
  TalksAbout: Base_API_URL + "/talkabout",
  GetSubjectByClient: Base_API_URL + "/subject/getbyclient",
};

export const API_FEED = {
  GetFeeds: Base_API_URL + "/feed",
  SearchFeed: Base_API_URL + "/feed/search",
  AddFeed: Base_API_URL + "/feed/save"
}

export const API_SUBJECT ={
  AddSubject: Base_API_URL + "/subject/save",
  SearchSubject: Base_API_URL + "/subject/search",
  UpdateSubject: Base_API_URL + "/subject/update",
  GetSubject: Base_API_URL + "/subject",
  DeleteSubject: Base_API_URL + "/subject/delete",
}

export const API_KEYWORD = {
  AddKeyword: Base_API_URL + "/keyword/save",
  SearchKeyword: Base_API_URL + "/keyword/search",
  GetKeywords: Base_API_URL + "/keyword",
  DeleteKeyword: Base_API_URL + "/keyword/delete",
  UpdateKeyword: Base_API_URL + "/keyword/update",
};
