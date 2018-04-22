import { List, Map } from 'immutable';
// import { List, Map } from './myImmutabilty';


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
  for (let x = 0; x< scale; x++) {
    const random_boolean = Math.random() >= 0.5;
    list.push(
      Map({
        id: uid(),
        nestedData: Map({
          text: makeWord(),
          isDone: random_boolean,
          img: !random_boolean ? '../cross.png' : '../tick.png'
        })
      })
    );
  };
  return list;
}
const init = List([
  List(makeInitialList(2)),
  List(makeInitialList(2)),
  // List(makeInitialList(150)),
  // List(makeInitialList(150)),
  // List(makeInitialList(150)),
  // List(makeInitialList(150)),
  // List(makeInitialList(150)),
  // List(makeInitialList(150)),
  // List(makeInitialList(150)),
  // List(makeInitialList(150)),
]);

// console.log(init);

// const checkList = init.map(t => t)
// console.log(init);
// console.log(checkList);
// console.log('val', checkList == init);
// console.log('ref', checkList === init);
// console.time('fast');
// console.log('immut', init.equals(checkList));
// console.timeEnd('fast');
// console.time('slow');
// console.log('string', JSON.stringify(checkList) === JSON.stringify(init));
// console.timeEnd('slow');

export default function reducer(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
      const a =  todos.map((tRow, idx) => {
        if(idx === 0) {
          return tRow.insert(0,
            Map({
              id: uid(),
              nestedData: Map({
                text: action.payload.text,
                isDone: false,
                img: '../cross.png'

              })
            })
          );
        } else {
          return tRow
        }
      });
      return a
    case 'TOGGLE_TODO':
      const s = todos.map(tRow => {
        return tRow.map(t => {
          if(t.get('id') === action.payload) {
           return t
              .updateIn(['nestedData', 'isDone'], isDone => !isDone)
              .updateIn(['nestedData', 'img'], () => t.getIn(['nestedData', 'isDone']) ? '../cross.png' : '../tick.png')
          } else {
            return t;
          }
        })
      });
      return s;
    default:
      return todos;
  }
}

