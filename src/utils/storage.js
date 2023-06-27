export function loadData(key) {
  try {
    const data = localStorage.getItem(key);

    if (!data) {
      return undefined;
    }

    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
}

export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    // do nothing
  }
}
