import { useSelector,useDispatch } from "react-redux";
import { useEffect} from "react";
import { getItem } from "../store/items";
import { DeleteItem } from "../store/items";

const PokemonItems = ({ pokemon, setEditItemId }) => {
  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });
  // console.log(setEditItemId, "setEditItemId");
  const dispatch=useDispatch();

  
  const handleDelete = async (e,items) => {
    e.preventDefault();
    console.log(e,'e')
    console.log('items',items);
    
    
    await dispatch(DeleteItem(items));
    
    }
  

  useEffect(()=>{
    dispatch(getItem(pokemon.id));
  },[dispatch]);

  if (!items) {
    return null;
  }

  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button onClick={(e)=>handleDelete(e,item.id)}>
            Delete
          </button>
        </td>
        
      )}
    </tr>
  ));
};

export default PokemonItems;