export default class Data {
  static dataUser = {};
  static listUser = [];
  static getDataUser = () => {
    return this.dataUser;
  };
  static setListUser = (value) => {
      this.listUser.push(value);
  }
  static getListUser = () => {
    return this.listUser;
  };
}

