// Generic function to map options
export const mapOptions = (items, idKey, nameKey) =>
    items.map(item => ({ key: item[idKey], value: item[nameKey] }));
