export default class Data {
  static dataUser = {};
  static listUser = [];
  static tokenDeviceID = '';
  static notification = {
    body: '',
    title: '',
    token: '' };
  static listTransactionHistory = [];
  static getDataUser = () => {
    return this.dataUser;
  };
  static getTokenDeviceID = () => {
    return this.tokenDeviceID;
  };
  static setListUser = (value) => {
      this.listUser.push(value);
  }
  static getListUser = () => {
    return this.listUser;
  };
  static setTransactionHistory = (value) => {
      this.listTransactionHistory.push(value);
  }
  static getTransactionHistory = () => {
    return this.listTransactionHistory;
  };
}

