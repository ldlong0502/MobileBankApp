import Data from './src/Data/Data';
import firestore from '@react-native-firebase/firestore';
import NotificationService from './NotificationService';

const formatMoney = value => {
  return (
    value.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')[0] +
    ' VNĐ'
  );
};
const check =
  '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$';

const formatTime = value => {
  const list = value.split(' ');
  const date = list[0].split('/');
  const time = list[1].split(':');
  return new Date(date[2], date[1] - 1, date[0], time[0], time[1], time[2]);
};
const getListTransaction = async () => {
  Data.getTransactionHistory().splice(0, Data.getTransactionHistory().length);
  firestore()
    .collection('historyTransaction')
    .where('userId', '==', Data.getDataUser.id)
    .onSnapshot(querySnapshot => {
      console.log(querySnapshot);
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New transaction555: ', change.doc.data());
          if (
            formatTime(change.doc.data().time).getFullYear() ===
            new Date().getFullYear()
          ) {
            Data.setTransactionHistory(change.doc.data());

            if (change.doc.data().isAdd === true) {
              var item = change.doc.data();
              let data = {
                title: item.title,
                body: 'Tài khoản của bạn vừa được + ' + formatMoney(item.money) + ' từ STK: ' +
                item.fromBankId.substring(0,5) + 'xxxx\n' + 'Nội dung giao dịch: ' + item.content,
                token:Data.getTokenDeviceID,
              };
              NotificationService.sendSingleDeviceNotification(data);
              return;
            }
            else {
              var item = change.doc.data();
              let body = '';
              if (item.idService === 1) {
                body = 'Tài khoản của bạn vừa bị - ' + formatMoney(item.money) + ' do chuyển tiền đến STK: ' +
                item.toBankId.substring(0,5) + 'xxxx với nội dung: '  + item.content;
              } else {
                body = 'Tài khoản của bạn vừa bị - ' + formatMoney(item.money) +  ' do sử dụng dịch vụ tại LTBB\nNội dung: '  + item.content;
              }
              let data = {
                title: item.title,
                body: body,
                token:Data.getTokenDeviceID,
              };
              NotificationService.sendSingleDeviceNotification(data);
              return;
            }
          }
        }
      });
    });
};
const padValue = x => {
  return String(x).padStart(2, '0');
};
const getCurrentDate = () => {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds();
  return (
    padValue(date) + '/' + padValue(month) + '/' + year + ' ' + padValue(hours) + ':' + padValue(min) + ':' + padValue(sec)
  );
};
export default {
  formatMoney,
  check,
  formatTime,
  getListTransaction,
  getCurrentDate,
};
