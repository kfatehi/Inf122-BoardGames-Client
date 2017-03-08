const initialState = {
  server: null,
};


export default function(state=initialState, action) {
  console.log('action', action);
  switch (action.type) {
    case 'SET_SERVER': {
      return { server: action.url };
    }
    case 'LOGIN': {
      return {};
    }
  }
  return {};
}

