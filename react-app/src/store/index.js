import React from "react";
import {
  observable,
  isObservable,
  action,
  makeObservable,
  runInAction,
  configure,
  when,
} from "mobx";

/**
 * THIS CODE IS GENERATED
 * The root state class which contains all others
 * an instance of this class ios created upon first import
 * this instance can be imported by using the default imports
 * recommended usage is to use the hooks useStores() or useStorePath()
 */
class RootState {
  @observable notes = new NoteState(this);
  @observable users = new UserState(this);
  isLoaded = false;

  constructor() {
    makeObservable(this);
    when(
      () => this.isLoaded,
      () => console.log("store is loaded")
    );
  }

  @action async init() {
    runInAction(() => {
      this.isLoaded = true;
    });
  }
}
configure({ enforceActions: "observable" });
const store = new RootState();
store.init();
export const storesContext = React.createContext(store);

/**
 * hook to access all the stores, good for destructuring
 *
 * usage:
 * const {test,bla} = useStores();
 *
 * @return {RootState} the instance of the rootState containing all other state instances
 */
export const useStores = () => React.useContext(storesContext);

/**
 * hook to access a particular observable deeper into the object hierarchy
 *
 * usage:
 * const level1 = useStorePath("test","deep","level1");
 *
 *
 * @return {*} returns a single object down the root states object hierachy
 */
export const useStorePath = (...paths) => {
  const stores = useStores();
  let error = false;
  let current = stores;
  paths.forEach((path) => {
    if (isObservable(current[path])) {
      current = current[path];
    } else {
      error = true;
    }
  });
  if (error) console.error("useStorePath: path was invalid");
  return error ? null : current;
};
/**
 * the default export is simply the instance of the root state
 * this can easily be used also within components by directly importing it
 * however it is not ideal for component testing if the store is statically imported
 */
export default store;
