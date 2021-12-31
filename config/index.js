const Base_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api-lumen-social'

export const API_URL = {
    BaseUrl: Base_API_URL,
    GetClients: Base_API_URL + "/client",
    AddClient: Base_API_URL + "/client/save",
    DeleteClient: Base_API_URL + "/client/delete",
    UpdateClient: Base_API_URL + "/client/update",
    SearchClient: Base_API_URL + "/client/search",
    GetFeeds: Base_API_URL + "/feed",
    SearchFeed: Base_API_URL + "/feed/search",
}