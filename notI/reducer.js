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
    list.push(
      {
        id: uid(),
        n: {
          isDone: false,
          text: makeWord(),
          img: '../cross.png'
        }
      }
    );
  };
  return list;
}
const init = [
    makeInitialList(150),
    makeInitialList(150),
    makeInitialList(150),
    makeInitialList(150),
    makeInitialList(150),
    makeInitialList(150),
    makeInitialList(150),
    makeInitialList(150),
    makeInitialList(150),
];

export default function reducer(todos=init, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return todos.push(action.payload);
    case 'TOGGLE_TODO':
      return todos.map(tRow => {
        return tRow.map(t => {
          if(t.id === action.payload) {
            return {
              n: {
                isDone: !t.n.isDone,
                text: t.n.text,
                img: t.n.isDone ? '../cross.png' : '../tick.png'

              },
              id: t.id
            };
          } else {
            return t;
          }
        });
      })
    default:
      return todos;
  }
}

