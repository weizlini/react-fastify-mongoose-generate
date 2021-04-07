import { observable, override, action, makeObservable, flow } from "mobx";
import { BaseState } from "../base/";
import UserApi from "../../api/User";
import UserModel from "../models/UserModel";

export default class UserState extends BaseState {
  api = UserApi;
  modelClass = UserModel;
  name = "user";

  @observable saving = false;
  @observable isLoading = true;
  @observable list = [];
  @observable model = null;
  @observable isEditing = false;
  constructor(root) {
    super(root);
    this.model = new this.modelClass();
    this.model.init();
    makeObservable(this);
  }
  @override async init() {
    await this.load();
  }
  @flow *load() {
    if (this.api) {
      const list = yield this.api.getList();
      if (list !== false) {
        this.list = list;
        this.isLoading = false;
      }
    }
  }
  @action new() {
    this.model = new this.modelClass();
    this.model.init();
    this.isEditing = true;
  }
  @action edit(entry) {
    this.model = new this.modelClass();
    this.model.init(entry);
    this.isEditing = true;
  }
  @action cancel() {
    this.model = new this.modelClass();
    this.model.init();
    this.isEditing = false;
  }

  @flow *submit() {
    this.saving = true;
    const isValid = yield this.model.validate();
    if (isValid) {
      const response = yield this.model.save();
      if (response !== false) {
        this.saving = false;
        this.load();
        this.cancel();
      }
      return response;
    } else {
      return false;
    }
  }
}
