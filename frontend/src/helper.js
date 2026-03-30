
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

export const normalizeDateOld = (value) => {
  if (!value) return value;

  // If it's already a Date object, ensure it's in the local date format
  if (value instanceof Date) {
    // Use local date
    const localDate = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
    return localDate.toISOString().split("T")[0];
  }

  // If it's a string with date and time (e.g., ISO format), split and return only the date
  const str = String(value);
  if (str.includes("T")) {
    return str.split("T")[0];
  }

  // If it's already in YYYY-MM-DD format, return it as is
  return str;
};

export const normalizeDate = (date) => {
  if (!date) return '';

  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`; // API format
};
