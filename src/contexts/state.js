const actions = {
    init: "INIT"
  };

  const initialState = {
    token: null,
    utente:null,
    email:null,
    error:false
  };

  const reducer = (state, action) => {
    const { type, data } = action;
    switch (type) {
      case actions.init:
        return { ...state, ...data };
      default:
        throw new Error("Undefined reducer action type");
    }
  };
  
  export { actions, initialState, reducer };