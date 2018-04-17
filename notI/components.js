import React from 'react';

class TodoRow extends React.PureComponent {
  // shouldComponentUpdate(newProps) {
  //   // using no immutability with have to use a string comparison
  //   // have been mutated
  //   const { todos } = this.props;
  //   const { todos: newTodos } = newProps;
  //   // console.log('value: ', todos == newTodos); // false
  //   // console.log('ref: ', todos === newTodos); // false
  //   // console.log('string: ', JSON.stringify(todos) === JSON.stringify(newTodos));
  //   if ( JSON.stringify(todos) === JSON.stringify(newTodos) ) {
  //     console.log('hit');
  //     return false;
  //   }
  //   return true;
  // }

  clickHandler = (param) => () => {
    param.toggleTodo(param.id)
  }

  render() {
    console.log('render row');
    const { todos, toggleTodo } = this.props;
    return ( <div>
      { todos.map(t => <Todo
        key={t.id}
        clickHandler={this.clickHandler({ toggleTodo, id: t.id})}
        todo={t} />)
      }
    </div>
    )
  }
}
class Todo extends React.PureComponent {
  // shouldComponentUpdate(newProps) {
  //   // using no immutability with have to use a string comparison
  //   // have been mutated
  //   const { todo } = this.props;
  //   const { todo: newTodos } = newProps;
  //   if ( JSON.stringify(todo) === JSON.stringify(newTodos) ) {
  //     return false;
  //   }
  //   return true;
  // }
  render() {
    console.log('    render todo');
    const { todo, clickHandler } = this.props;

    return (
      <div className="todo__item" onClick={clickHandler} id={todo.id}>
        <TodoDetails todo={todo.n} />
      </div>
    )
  }
}

class TodoDetails extends React.PureComponent {
  render() {
    console.log('       render details');
    const { todo } = this.props;
    return (
      <span>
        <img src={todo.img} />
        { todo.isDone
            ? <strike>{todo.text}</strike>
            : <span>{todo.text}</span>
        }
      </span>
    )
  }
}

export function TodoList(props) {
  const { todos, toggleTodo, addTodo } = props;

  const onSubmit = (event) => {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which == 13);
    const isLongEnough = text.length > 0;

    if(isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
  };


  return (
    <div className='wrapper'>
      <input type='text'
        className='todo__entry'
        placeholder='Add todo'
        onKeyDown={onSubmit} />
      <div className='todo'>
        {todos.map((tRow, idx) => (
          <TodoRow key={idx} todos={tRow} toggleTodo={toggleTodo} />
          ))}
      </div>
    </div>
  );
}
