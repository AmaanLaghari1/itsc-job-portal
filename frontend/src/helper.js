
// Generic function to map options
export const mapOptions = (items, idKey, nameKey) =>
    items.map(item => ({ key: item[idKey], value: item[nameKey] }));

export const truncateLongTxt = (text, maxWords = 20) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    // if (isNaN(date.getTime())) return ''; // Invalid date
    return date.toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).replace(/\//g, '-'); // Replace slashes with dashes
}

export const localToUTCDate = (dateStr) => {
    const date = new Date(dateStr)
    const offset = date.getTimezoneOffset()
    date.setMinutes(date.getMinutes() - offset)
    return date.toISOString().split('T')[0]
}


export const strToUpper = str => {
    return str.toUppercase()
}

export const roundOff = num => {
    return Math.round(num)
}

export function getDashboardPath(role) {
    return role == 1 || role == 2 || role == 3 ? '/admin/dashboard' : '/dashboard'
}

export function getFullname(firstName, lastName) {
    if (lastName == '' || lastName == null || lastName == 'null') {
        return firstName
    }
    else {
        return firstName + " " + lastName
    }
}

export const getRoleNameById = (id) => {
    const roles = {
        1: "SUPER ADMIN",
        2: "ADMIN",
        3: "OPERATOR",
        4: "PRIMARY",
    };
    return roles[id];
};

export const getNestedValue = (obj, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part], obj)
}

export const normalizeDate = (value) => {
  if (!value) return value;

  // If it's already a Date object
  if (value instanceof Date) {
    return value.toISOString().split("T")[0];
  }

  // If it's a number or something unexpected, convert to string
  const str = String(value);

  // If it contains time (T), remove it
  if (str.includes("T")) {
    return str.split("T")[0];
  }

  // Already in YYYY-MM-DD
  return str;
};
