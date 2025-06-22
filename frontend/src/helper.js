
// Generic function to map options
export const mapOptions = (items, idKey, nameKey) =>
    items.map(item => ({ key: item[idKey], value: item[nameKey] }));

export const truncateLongTxt = (text, maxWords=20) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Invalid date
    return date.toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).replace(/\//g, '-'); // Replace slashes with dashes
}