import React from 'react';
import assert from 'assert'

export class Todo extends React.PureComponent {
  render() {
    const { todo } = this.props;
    // console.log(todo);
    console.log('render itm');
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

export class TableRow extends React.PureComponent {
  shouldComponentUpdate(newProps) {
    // using no immutability this breaks because the arrays hv
    // have been mutated
    // const { todos } = this.props;
    // const { todos: newTodos } = newProps;
    // console.log('value: ', todos.values === newTodos.values);
    // if (todos.values === newTodos.values) {
    //   console.log('hit');
    //   return false;
    // }

    // HACK
    // if (JSON.stringify(this.props.todos) === JSON.stringify(newProps.todos)) {
    //   return false;
    // }

    // IMMUTABILTY
    // if (this.props.todos.equals(newProps.todos)) {
    //   console.log('hit');
    //   return false;
    // }

    return true;
  }

  clickHandler = (param) => () => {
    param.toggleTodo(param.id)
  }
  render() {
    console.log('render row');
    const { todos, toggleTodo } = this.props;
    return ( <div>
      { todos.map(t => <Todo
        key={t.get('id')}
        clickHandler={this.clickHandler({ toggleTodo, id: t.get('id')})}
        todo={t.toJS()} />)
      }
    </div>
    )
  }
}

export class TodoList extends React.PureComponent {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  shouldComponentUpdate(newProps) {
    console.log(this.props.todos.equals(newProps.todos));
    return true
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


  render() {
    const { todos, toggleTodo } = this.props;
    return (
      <div className='wrapper'>
        <input type='text'
          className='todo__entry'
          placeholder='Add todo'
          onKeyDown={this.onSubmit} />
        <div className='todo'>
          { todos.map((tRow, idx) => {
            return <TableRow id={idx} key={idx} todos={tRow} toggleTodo={toggleTodo} />
            } ) }
        </div>
      </div>
    );
  }
}

