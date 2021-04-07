import { observable, action, makeObservable } from "mobx";
import { BaseModel, Field, FieldType } from "../base/";
import api from "../../api/User";
export default class UserModel extends BaseModel {
  constructor() {
    super();
    makeObservable(this);
  }

  @observable
  name = new Field(this, "name", {
    type: FieldType.string,
    required: true,
    label: "name",
    validation: (v, model) => {
      return null;
    },
  });

  @observable
  address = new Field(this, "address", {
    type: FieldType.string,
    required: false,
    label: "address",
    validation: (v, model) => {
      return null;
    },
  });

  @observable
  _id = new Field(this, "_id", {
    type: FieldType.string,
    required: false,
    label: "_id",
    validation: (v, model) => {
      if (!/^[0-9a-fA-F]{24}$/.test(v)) return "error";
    },
    primary: true,
  });

  @observable
  updatedAt = new Field(this, "updatedAt", {
    type: FieldType.string,
    required: false,
    label: "updatedAt",
    validation: (v, model) => {
      return null;
    },
    readOnly: true,
    pseudo: true,
  });

  @observable
  createdAt = new Field(this, "createdAt", {
    type: FieldType.string,
    required: false,
    label: "createdAt",
    validation: (v, model) => {
      return null;
    },
    readOnly: true,
    pseudo: true,
  });

  @observable
  __v = new Field(this, "__v", {
    type: FieldType.number,
    required: false,
    label: "__v",
    validation: (v, model) => {
      return null;
    },
    readOnly: true,
    pseudo: true,
  });

  @action async create() {
    return api.create(this.toJS(true));
  }

  @action async update() {
    return api.update(this.toJS(false));
  }
}
