export const getResponseData = async (fetchResponse: Response, rejectWitValue:any) => {
    if (!fetchResponse.ok) {
        const err = await fetchResponse.json();
        return Promise.reject(rejectWitValue(err.message))
    }
    return fetchResponse.json();
}
