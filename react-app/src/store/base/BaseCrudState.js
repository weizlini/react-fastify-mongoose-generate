import {
  observable,
  override,
  action,
  toJS,
  reaction,
  makeObservable,
  flow,
  runInAction,
} from "mobx";
import BaseState from "./BaseState";
import { ptBR } from "@material-ui/core/locale";

export default class BaseCrudState extends BaseState {
  api = null;
  modelClass = null;
  @observable saving = false;
  @observable isLoading = true;
  @observable list = [];
  @observable model = null;
  get isEditing() {
    return this.model !== null;
  }
  constructor(root) {
    super(root);
    makeObservable(this);
  }
  @override async init() {
    await this.load();
  }
  @action async load() {
    if (this.api) {
      const list = await this.api.getList();
      if (list.length) {
        runInAction(() => {
          this.list = list;
          this.isLoading = false;
        });
      }
    }
  }
  @action new() {
    this.model = new this.modelClass();
    this.model.init();
  }
  @action edit(entry) {
    this.model = new this.modelClass();
    this.model.init(entry);
  }
  @action cancel() {
    this.model = null;
  }
}
