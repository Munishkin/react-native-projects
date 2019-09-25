let state = {
  contacts: [],
  isFetchingContacts: true,
  user: {},
  isFetchingUser: true,
  error: false
};

const listeners = [];

export default {
  getState: () => state,
  setState: newState => {
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  },
  onChange: newListener => {
    listeners.push(newListener);
    return () => listeners.filter(listener => listener !== newListener);
  }
};
