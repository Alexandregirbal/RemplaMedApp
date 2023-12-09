export const parseQueryString = (url: string): Record<string, string> => {
    const urlParams = new URLSearchParams(url);
    const params = Object.fromEntries(urlParams.entries());
    return params;
};
