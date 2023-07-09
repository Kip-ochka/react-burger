export const getResponseData = async (fetchResponse: Response, rejectWithValue: any) => {
    if (!fetchResponse.ok) {
        const err = await fetchResponse.json();
        return Promise.reject(rejectWithValue(err));
    }
    return fetchResponse.json();
}

export const BASE_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: any) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint: string, options?: RequestInit) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

