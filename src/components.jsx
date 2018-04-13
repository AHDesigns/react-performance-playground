import React from 'react';

export class Todo extends React.PureComponent {
  shouldComponentUpdate(newProps) {
    // const { todos } = this.props;
    // const { todos: newTodos } = newProps;
    // console.log('value: ', todos.get(1) === newTodos.get(1));
    // console.log('reference: ', todos.get(1) === newTodos.get(1));
    // console.log(todos.get(1));
    // console.log(newTodos.get(1));
    // console.log('---------------');
    return true;
  }

  render() {
    const { todo, toggleTodo } = this.props;
    return (
      <div className='todo__item' onClick={this.props.clickHandler}>
        {
          todo.nestedData.isDone ?
            <strike>{todo.nestedData.text}</strike> :
            <span>{todo.nestedData.text}</span>
        }
      </div>
    );
  }
}

export class TodoList extends React.PureComponent {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  shouldComponentUpdate(newProps) {
    const { todos } = this.props;
    const { todos: newTodos } = newProps;
    console.log('value: ', todos.get(1) === newTodos.get(1));
    console.log('reference: ', todos.get(1) === newTodos.get(1));
    console.log(todos.get(1));
    console.log(newTodos.get(1));
    console.log('---------------');
    return true;
  }

  onSubmit(event) {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which == 13);
    const isLongEnough = text.length > 0;

    if(isEnterKey && isLongEnough) {
      const { addTodo } = this.props;
      input.value = '';
      addTodo(text);
    }
  };

  clickHandler = (param) => () => {
    param.toggleTodo(param.id)
  }

  render() {
    const { todos, toggleTodo } = this.props;

    return (
      <div className='wrapper'>
        <input type='text'
          className='todo__entry'
          placeholder='Add todo'
          onKeyDown={this.onSubmit} />
        <div className='todo'>
          { todos.map(t => <Todo
            key={t.get('id')}
            clickHandler={this.clickHandler({ toggleTodo, id: t.get('id')})}
            todo={t.toJS()} />)
          }
        </div>
      </div>
    );
  }
}

