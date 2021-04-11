const sessionStorage = {
    get(key) {
      const value = sessionStorage.getItem(key);
      if (!value) {
        return null;
      }
      return JSON.parse(value);
    },
  
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
  
    remove(key) {
      sessionStorage.removeItem(key);
    },
  };
  
  export default sessionStorage;