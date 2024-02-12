export const storageURL = 'https://pfsc-image-store.fly.dev';

export const sendToStorage = async (form: FormData): Promise<string | void> => {
    return await fetch(storageURL + '/store', {
        method: 'POST',
        body: form
    })
        .then(res => res.json())
        .then(res => { return res.url; })
        .catch(e => { throw e; });
};
