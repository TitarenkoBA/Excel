export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        },
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach( listener => listener(state))
    },
    getState() {
      return state
    },
  }
}

// export class CreateStore {
//   constructor(rootReducer, initialState = {}) {
//     this.state = rootReducer({ ...initialState }, { type: '__INIT__' })
//     this.listeners = []

//     this.subscribe = (fn) => {
//       this.listeners.push(fn)
//       return {
//         unsubscribe() {
//           this.listeners = this.listeners.filter(l => l !== fn)
//         },
//       }
//     }

//     this.dispatch = (action) => {
//       this.state = rootReducer(this.state, action)
//       this.listeners.forEach(listener => listener(this.state))
//     }

//     this.setState = () => {
//       return this.state
//     }
//   }
// }
