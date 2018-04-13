import { List, Map } from 'immutable';

function makeWord() {
  var text = "";
  var possible="のはでした昨夜最高あいうえおかきくけこさしすせそがぎぐげごぱぴぷぺぽ";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const uid = () => Math.random().toString(34).slice(2);

const makeInitialList = (scale) => {
  const list = [];
  for (let x = 0; x< 10*scale; x++) {
    list.push(
      Map({
        id: uid(),
        nestedData: Map({
          text: makeWord(),
          isDone: false
        })
      })
    );
  };
  return list;
}
const init = List(makeInitialList(20));

export default function reducer(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
      console.log(todos);
      const newList = todos.push(
        Map({
          id: uid(),
          nestedData: Map({
            text: action.payload,
            isDone: false
          })
        })
      );
      console.log(newList);
      return newList;
    case 'TOGGLE_TODO':
      return todos.map(t => {
        if(t.get('id') === action.payload) {
          return t.updateIn(['nestedData', 'isDone'], isDone => !isDone);
        } else {
          return t;
        }
      });
    default:
      return todos;
  }
}

