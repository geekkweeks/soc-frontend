const Base_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/trendata-api'

export const API_URL = {
    BaseUrl: Base_API_URL,
    GetClients: Base_API_URL + "/client",
    AddClient: Base_API_URL + "/client/save",
    DeleteClient: Base_API_URL + "/client/delete",
    UpdateClient: Base_API_URL + "/client/update",
    SearchClient: Base_API_URL + "/client/search",
    GetFeeds: Base_API_URL + "/feed",
    SearchFeed: Base_API_URL + "/feed/search",
    SearchMedia: Base_API_URL + "/media/search",
    GetMedias: Base_API_URL + "/media",
    AddMedia: Base_API_URL + "/media/save",
    SearchKeyword: Base_API_URL + "/keyword/search",
    GetKeywords: Base_API_URL + "/keyword",
    Login: Base_API_URL + "/api/login",
}