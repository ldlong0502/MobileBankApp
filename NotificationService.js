const sendSingleDeviceNotification = (data) =>{
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer AAAAV9zIji0:APA91bEtb46Vl0RvKp7X6VrtpyOMebwhA4MiD3PLQj-62VZn0YaBsOHKxzY4GkXx7dpslG5lkxJcABl0ur0XouffSd0XnK_jZpzfT4Awd2tqn-ilZrA8L6UCxn_Mk9nlpKQgBxvcCUtq');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      data: {},
      notification: {
        body: data.body,
        title: data.title,
      },
      to: data.token,
    });

    var requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };

    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
};

export default {
    sendSingleDeviceNotification,
};
