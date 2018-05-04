import React from 'react';

const logging = (log) => (
  log
  ? (string) => { console.log(string); }
  : () => {}
)

const log = logging(1);

class ImmutComponent extends React.Component {
  shouldComponentUpdate(newProps) {
    // check through each prop for equality
    for (const key in this.props) {
      // see if the prop is an immutable data structure which responds to equals
      if(typeof this.props[key] === 'object' &&
        'equals' in this.props[key] &&
        !this.props[key].equals(newProps[key])
      ) {
        return true
      } else if (!this.props[key] === (newProps[key])) {
        // else just do a normal check against the values
        return true
      }
    }

    return false;
  }
}

export class TodoList extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUpdate() {log('------------------------')}

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

class TableRow extends ImmutComponent {
  componentWillUpdate() {log(' render row'); }

  clickHandler = (param) => () => {
    param.toggleTodo(param.id)
  }

  render() {
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

class Todo extends ImmutComponent {
  componentWillUpdate() { log('    render todo'); }

  render() {
    const { todo } = this.props;
    return (
      <div className='todo__item' onClick={this.props.clickHandler}>
        <TodoDetails todo={todo.get('nestedData')} />
      </div>
    );
  }
}

class TodoDetails extends ImmutComponent {
  componentWillUpdate() { log('        render details'); }

  render() {
    const { todo } = this.props;
    return (
      <span>
        <img src={todo.get('img')} />
        { todo.get('isDone')
            ? <strike>{todo.get('text')}</strike>
            : <span>{todo.get('text')}</span>
        }
      </span>
    )
  }
}
