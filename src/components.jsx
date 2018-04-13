import React from 'react';

export function Todo(props) {
  const { todo } = props;

  if(todo.isDone) {
    return <strike>{todo.text}</strike>;
  } else {
    return <span>{todo.text}</span>;
  }
}

export class TodoList extends React.PureComponent {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
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

  toggleClick(id) {
    const { toggleTodo  } = this.props;
    toggleTodo(id)
  }

  // clickHandler = (param) => (e) => {
  //   e.preventDefault();
  //   param.toggleTodo(param.id)
  // }

  render() {
    const { todos, toggleTodo } = this.props;
    return (
      <div className='wrapper'>
        <input type='text'
          className='todo__entry'
          placeholder='Add todo'
          onKeyDown={this.onSubmit} />
        <div className='todo'>
          {todos.map(t => (
            <div key={t.get('id')}
              className='todo__item'
              onClick={() => { this.toggleClick( t.get('id') ); }}
            >
              <Todo todo={t.toJS()} />

            </div>
          ))}
        </div>
      </div>
    );
  }
}

