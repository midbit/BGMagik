const BASE_URL = "http://localhost:8080/"

export const BOARDGAMES_URL = () => (BASE_URL + "boardgames")

export const BOARDGAME_BY_ID_URL = (id) => (BASE_URL + "boardgames/" + id)

export const TRANSACTION_URL = () => (BASE_URL + "transaction")

