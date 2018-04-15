console.log('js loaded');

/*----------------
 * UTILS
-----------------*/

const uid = () => Math.random().toString(34).slice(2);

const getId = id => document.getElementById(id);
const getCn = cn => document.getElementsByClassName(cn);
const cE = e => document.createElement(e);

const UtillArr = (array) => {
  return {
    includes(str) {
      for (const st of array) {
        if (st == str) { return true; }
      }

      return false;
    }
  }
}

const keyPress = (key, callback) => {
  return function keyPressCallback({ code }) {
    if(code == key) {
      callback(...arguments);
    }
  }
}

function makeWord() {
  let text = "";
  const possible="のはでした昨夜最高あいうえおかきくけこさしすせそがぎぐげごぱぴぷぺぽ";
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/*----------------
 * Data controllers
-----------------*/

const makeInitialList = (scale) => {
  const list = [];
  for (let x = 0; x< scale; x++) {
    const random_boolean = Math.random() >= 0.5;
    list.push(
      {
        id: uid(),
        nestedData: {
          text: makeWord(),
          isDone: random_boolean,
          img: random_boolean ? '../cross.png' : '../tick.png'
        }
      }
    );
  };
  return list;
}

const toggleTodo = ({ currentTarget }) => {
   store = store.map(item => {
    if (item.id === currentTarget.id) {
      return ({
        id: item.id,
        nestedData: {
          text: item.nestedData.text,
          isDone: !item.nestedData.isDone,
          img: item.nestedData.isDone ? '../cross.png' : '../tick.png'
        }
      })
    }
    return item;
  })

  render(store)
}

const addTodo = ({ srcElement }) => {
  if (srcElement.value !== '') {
    store.push(
      {
        id: uid(),
        nestedData: {
          text: srcElement.value,
          isDone: false,
          img: '../cross.png'
        }
      }
    );

    srcElement.value = '';

    render(store)
  }
}

/*----------------
 * DOM Methods
-----------------*/
const render = (todos) => {
  const todosDOM = getId('todos')
  // do a dumb wipe (no fancy shadow dump checks)
  todosDOM.innerHTML = '<div></div>';
  for(const todo of store) {
    const todoNode = makeTodo({ id: todo.id, nestedData: todo.nestedData })
    todosDOM.insertBefore(todoNode, todosDOM.firstChild);
  }
};

const makeTodo = ({ id = uid(), nestedData }) => {
  const todo = cE('div');
  todo.id = id;
  todo.classList.add('todo__item');
  nestedData.isDone ? todo.classList.add('todo__item--done') : todo.classList.add('todo__item--undone');
  todo.addEventListener('click', toggleTodo);
  todo.innerHTML = `
  <div>
    <img src=${nestedData.img} />
    <p>${nestedData.text}</p>
  </div>
  `;

  return todo;
}

/*----------------
 * MAIN
-----------------*/
getCn('todo__entry')[0].addEventListener('keydown', keyPress('Enter', addTodo));

let store = makeInitialList(1500);

render(store);
