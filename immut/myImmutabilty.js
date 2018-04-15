const findChild = (obj) => {
  const keys = Object.keys(obj);
  if (keys.length === 0) { return obj; }
  const newObj = {}
  for (const key of keys) {
    const value = obj[key];
    if (typeof(value) === 'object') {
      newObj[key] = findChild(value.toJS());
    } else {
      newObj[key] = value;
    }
  }
  return newObj
}

export const Map = (value) => {
  return ({
    value,
    get(id) { return value[id]; },
    getIn([p1,p2]) {
      // hack that only works for 2
      return value[p1].value[p2];
    },
    updateIn([p1,p2], method) {
      // hack that only works for 2
      value[p1].value[p2] = method(value[p1].value[p2])
      return Map(value);
    },
    toJS() {
      return findChild(value)
    },
    equals(v) { return value == v }
  })
}

export const List = (value) => {
  return ({
    value,
    get(id) { return value[id]; },
    map(method) { return value.map(method) },
    // map(method) { return List(value.map(method)) },
    get(id) { return value[id]; },
    toJS() {
      return findChild(value)
    },
    equals(v) { return value == v }
  })
}
