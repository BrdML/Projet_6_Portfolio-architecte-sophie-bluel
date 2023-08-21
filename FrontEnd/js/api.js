const apiUrl = 'http://localhost:5678/api/';

export const getFilters = async () => {
    const respons = await fetch(apiUrl + "categories");
    const data = await respons.json();

    return data;
};

export const getWorks = async () => {
    const respons = await fetch(apiUrl + "works");
    const data = await respons.json();

    return data;
};

