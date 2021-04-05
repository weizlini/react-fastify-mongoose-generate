import {
  action,
  toJS,
  reaction,
  makeAutoObservable,
  flow,
  runInAction,
} from "mobx";
import BaseState from "./BaseState";
export default class BaseCrudState extends BaseState {
  api = null;
  modelClass = null;
  saving = false;
  isLoading = true;
  list = [];
  model = null;
  get isEditing() {
    return this.model !== null;
  }
  constructor(root) {
    super(root);
    makeAutoObservable(this);
  }
  async init() {
    await this.load();
  }
  async load() {
    if (this.api) {
      const list = await api.getList();
      if (list.length) {
        runInAction(() => {
          this.list = list;
          this.isLoading = false;
        });
      }
    }
  }
  new() {
    this.model = new this.modelClass();
    this.model.init();
  }
  edit(entry) {
    this.model = new this.modelClass();
    this.model.init(entry);
  }
  cancel() {
    this.model = null;
  }
}
