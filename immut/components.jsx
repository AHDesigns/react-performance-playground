import React from 'react';
import assert from 'assert'

export class Todo extends React.PureComponent {
  // shouldComponentUpdate(newProps) {
  //   if (this.props.todo.equals(newProps.todo)) {
  //     // console.log('NOT renderd item');
  //     return false;
  //   }
  //
  //   return true;
  // }

  render() {
    const { todo } = this.props;
    // console.log(todo);
    console.log('render itm');
    return (
      <div className='todo__item' onClick={this.props.clickHandler}>
        {
          todo.getIn(['nestedData', 'isDone']) ?
            <strike>{todo.getIn(['nestedData', 'text'])}</strike> :
            <span>{todo.getIn(['nestedData', 'text'])}</span>
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
    // console.log(this.props.todos);
    // console.log(newProps.todos);
    // console.log(JSON.stringify(this.props.todos) === JSON.stringify(newProps.todos))
    if (JSON.stringify(this.props.todos) === JSON.stringify(newProps.todos)) {
      return false;
    }

    // IMMUTABILTY
    // if (this.props.todos.equals(newProps.todos)) {
    //   // console.log('NOT renderd row');
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
        todo={t} />)
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
    console.log('-----------------------');
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

