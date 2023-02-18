export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});
export const DeleteItem = (data) => async (dispatch) => {

  const response = await fetch(`/api/items/${data.pokemonId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const item = await response.json();
    // console.log(item,'item');
    // console.log(data,'data');
    dispatch(remove(item.id, data.pokemonId));
    return item;
  }else{throw response};
};

export const getItem = (id) => async (dispatch) => {
  const response = await fetch(`/api/pokemon/${id}/items`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list,id));
  }
};

export const EditItem = (data) => async (dispatch) => {
  const response = await fetch(`/api/items/${data.pokemonId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const item = await response.json();
    dispatch(update(item));
    return item;
  }else{throw response};
};


const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: 
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM: 
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;