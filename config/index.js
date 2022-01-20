const Base_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/trendata-api/api";

const BASE_API_FE = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000/api'

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  export const API_FE ={
    LoginUrl: BASE_API_FE + '/login',
    UserUrl: BASE_API_FE + '/user',
    LogoutUrl: BASE_API_FE + '/logout'
}


export const API_URL = {
  BaseUrl: Base_API_URL,
  GetClients: Base_API_URL + "/client",
  GetAllClient: Base_API_URL + "/client/getall",
  AddClient: Base_API_URL + "/client/save",
  DeleteClient: Base_API_URL + "/client/delete",
  UpdateClient: Base_API_URL + "/client/update",
  SearchClient: Base_API_URL + "/client/search",
  GetFeeds: Base_API_URL + "/feed",
  SearchFeed: Base_API_URL + "/feed/search",
  SearchMedia: Base_API_URL + "/media/search",
  GetMedias: Base_API_URL + "/media",
  GetAllMedia: Base_API_URL + "/media/getall",
  AddMedia: Base_API_URL + "/media/save",
  SearchKeyword: Base_API_URL + "/keyword/search",
  GetKeywords: Base_API_URL + "/keyword",
  Login: Base_API_URL + "/login",
  Me: Base_API_URL + "/me",
  AddFeed: Base_API_URL + "/feed/save",
  GetConversationTypes: Base_API_URL + "/conversationtype",
  TalksAbout: Base_API_URL + "/talkabout",
  GetSubjectByClient: Base_API_URL + "/subject/getbyclient"
};
