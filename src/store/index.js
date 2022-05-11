import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

class ToDoItem {
  constructor({ text, status }) {
    this.text = text;
    this.status = status !== undefined ? status : false;
  }
  get() {
    return !this.delete ? { text: this.text, status: this.status } : undefined
  }
  changeStatus(value) {
    this.status = value ? value : false;
  }
  changeText(text) {
    this.text = text;
  }
}

class ToDoList {
  #length = 0
  view = "all"
  constructor(list) {
    this.set(list);
  }
  get() {
    return Object.entries(this.list).map(el => ({ ...el[1], key: el[0] }))
  }
  getView() {
    let result = this.get();
    if (this.view !== 'all') {
      result = (this.view === 'active') ? result.filter(el => el.status === true) : result.filter(el => el.status === false)
    }
    return result
  }
  get length() {
    return this.#length
  }
  set(list) {
    this.#length = 0
    this.view = 'all'
    this.list = {}
    if (!Array.isArray(list)) {
      list = [];
    }

    list.forEach(el => {
      this.list[this.#length] = new ToDoItem(el);
      this.#length++;
    })
  }
  dragnDropSort(newList) {
    let oldList = {...this.getView()}
    newList.forEach( (el, index) => {
      if (oldList[index].key !== el.key) {
        this.list[oldList[index].key] = new ToDoItem(el);
      }
    })
    this.list = {...this.list}
  }

  add(text) {
    this.list[this.#length] = new ToDoItem({ text });
    this.#length++;
    this.list = { ...this.list }
  }
  delete(key) {
    delete this.list[key]
    this.list = { ...this.list }
  }
  changeItemStatus(key, value) {
    this.list[key].changeStatus(value);
    this.list = { ...this.list }
    this.checkViewChange();
  }
  changeItemText(key, text) {
    this.list[key].changeText(text);
    this.list = { ...this.list }
  }
  changeAllStatus( value ) {
    Object.values(this.list).forEach(el => el.status = value)
    this.list = { ...this.list }
    this.checkViewChange();
  }
  clearAll() {
    this.changeAllStatus(false)
  }
  checkAll() {
    this.changeAllStatus(true)
  }
  checkViewChange() {
    if (this.view != 'all') {
      let todo = this.get();
      let todoFilterStatus = todo.filter(el => el.status == true)
      if (todoFilterStatus.length == todo.length || todoFilterStatus.length == 0) {
        this.view = 'all'
      }
    }
  }
}

export default new Vuex.Store({
  state: {
    newToDo: '',
    listToDo: new ToDoList()
  },
  getters: {
    TODO_NEW(state) {
      return state.newToDo
    },
    TODO_LIST(state) {
      return state.listToDo.get();
    },
    TODO_LIST_VIEW(state) {
      return state.listToDo.getView();
    },
    TODO_VIEW_STATE(state) {
      return state.listToDo.view;
    }
  },
  mutations: {
    CHANGE_TODO_NEW(state, value) {
      state.newToDo = value;
    },
    ADD_TODO_LIST(state, value) {
      state.listToDo.add(value);
    },
    DELETE_ITEM_TODO_LIST(state, key) {
      state.listToDo.delete(key);
    },
    CHANGE_STATUS_ITEM_TODO_LIST(state, { key, value }) {
      state.listToDo.changeItemStatus(key, value)
    },
    CHANGE_TEXT_ITEM_TODO_LIST(state, {key, text}) {
      state.listToDo.changeItemText(key, text)
    },
    SET_TODO_LIST(state, newToDo) {
      state.listToDo.set(newToDo)
    },
    CLEAR_ALL_TODO_LIST(state) {
      state.listToDo.clearAll()
    },
    CHECK_ALL_TODO_LIST(state) {
      state.listToDo.checkAll()
    },
    CHANGE_VIEW(state, value) {
      state.listToDo.view = value
    },
    DRANG_DROP_SORT(state, value) {
      state.listToDo.dragnDropSort(value);
    }
  },
  actions: {
    DELETE_ITEM_TODO_LIST({ commit, dispatch }, key) {
      commit('DELETE_ITEM_TODO_LIST', key);
      dispatch('SAVE_TODO_LIST');
    },
    CHANGE_STATUS_ITEM_TODO_LIST({ commit, dispatch }, key) {
      commit('CHANGE_STATUS_ITEM_TODO_LIST', key);
      dispatch('SAVE_TODO_LIST');
    },
    CHANGE_TEXT_ITEM_TODO_LIST({ commit, dispatch }, {key, text}) {
      commit('CHANGE_TEXT_ITEM_TODO_LIST', {key, text});
      dispatch('SAVE_TODO_LIST');
    },
    ADD_TODO_LIST({ state, commit, dispatch }) {
      commit('ADD_TODO_LIST', state.newToDo);
      commit('CHANGE_TODO_NEW', '');
      dispatch('SAVE_TODO_LIST');
    },
    CLEAR_ALL_TODO_LIST({commit, dispatch}) {
      commit('CLEAR_ALL_TODO_LIST');
      dispatch('SAVE_TODO_LIST');
    }, 
    CHECK_ALL_TODO_LIST({commit, dispatch}) {
      commit('CHECK_ALL_TODO_LIST');
      dispatch('SAVE_TODO_LIST');
    },
    DRANG_DROP_SORT({commit, dispatch},value) {
      commit('DRANG_DROP_SORT', value);
      dispatch('SAVE_TODO_LIST');
    },
    SAVE_TODO_LIST({ state }) {
      localStorage.setItem('todo-list', JSON.stringify(state.listToDo.get()));
    },
    GET_TODO_LIST_LOCAL_STORAGE({ commit }) {
      let todo = localStorage.getItem('todo-list');
      if (todo) {
        commit('SET_TODO_LIST', JSON.parse(todo));
      }
    }
  },
  modules: {
  },
});
