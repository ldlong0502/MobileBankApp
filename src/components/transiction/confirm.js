import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import HelpFunction from '../../../HelpFunction';

class ConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.route.params.data.username,
      userbankaccountnumber: this.props.route.params.data.BANS,
      targetname: this.props.route.params.data.rcName,
      targetbankaccountnumber: this.props.route.params.data.BANRC,
      msg: this.props.route.params.data.message,
      tradevalue: this.props.route.params.data.money,
      banktype: this.props.route.params.data.banktype,
      transactionfee: 1000,
      bankname: {
        0:'',
        1: 'Ngân hàng Thương mại mới nổi (LTBB)',
        2: 'Vietinbank (Ngân hàng Thương mại cổ phần Công Thương Việt Nam)',
        3: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank)',
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bigContainer}>
          <View style={styles.smallContainer}>
            <Text style={styles.textt}>Tài khoản nguồn </Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.TextRight}>{this.state.username}</Text>
            <Text style={styles.TextRight}>
              {this.state.userbankaccountnumber}
            </Text>
          </View>
        </View>
        <View style={styles.bigContainer}>
          <View style={styles.smallContainer}>
            <Text style={styles.text}>Tài khoản đích</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.TextRight}>{this.state.targetname} - {this.state.bankname[this.state.banktype]}</Text>
            <Text style={styles.TextRight}>
              {this.state.targetbankaccountnumber}
            </Text>                    
          </View>
        </View>
        <View style={styles.bigContainer}>
          <View style={styles.smallContainer}>
            <Text style={styles.textt}>Giá trị giao dịch</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.TextRight}>Số tiền : {HelpFunction.formatMoney(parseFloat(this.state.tradevalue))}</Text>
            <Text style={styles.TextRight}>
              Bằng chữ: {DocTienBangChu(this.state.tradevalue)}
            </Text>
            <Text style={styles.TextRight}>Nội dung : {this.state.msg}</Text>
          </View>
        </View>
        <View style={styles.bigContainer}>
          <View style={styles.smallContainer}>
            <Text style={styles.text}>Hình thức</Text>
            <Text style={styles.text}>Phí giao dịch</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.TextRight}>Phương thức xác thực : mã pin </Text>
            <Text style={styles.TextRight}>{HelpFunction.formatMoney(this.state.transactionfee)}</Text>
          </View>
        </View>
        <View style={styles.bigContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.reset({
                routes: [
                  {
                    name: 'InBank',
                  },
                ],
              })
            }>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',

                fontSize: 15,
              }}>
              {' '}
              Giao dịch mới
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('BottomTabs')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {' '}
              Hoàn thành
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
var ChuSo = new Array(
  ' không ',
  ' một ',
  ' hai ',
  ' ba ',
  ' bốn ',
  ' năm ',
  ' sáu ',
  ' bảy ',
  ' tám ',
  ' chín ',
);
var Tien = new Array('', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ');

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso) {
  var tram;
  var chuc;
  var donvi;
  var KetQua = '';
  tram = parseInt(baso / 100);
  chuc = parseInt((baso % 100) / 10);
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return '';
  if (tram != 0) {
    KetQua += ChuSo[tram] + ' trăm ';
    if (chuc == 0 && donvi != 0) KetQua += ' linh ';
  }
  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + ' mươi';
    if (chuc == 0 && donvi != 0) KetQua = KetQua + ' linh ';
  }
  if (chuc == 1) KetQua += ' mười '
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += ' mốt ';
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += ' lăm ';
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
}

//2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)

function DocTienBangChu(SoTien) {
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = '';
  var tmp = '';
  var ViTri = new Array();
  if (SoTien < 0) return 'Số tiền âm !';
  if (SoTien == 0) return 'Không đồng !';
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 8999999999999999) {
    //SoTien = 0;
    return 'Số quá lớn!';
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = '0';
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = '0';
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = '0';
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt(so / 1000000);
  if (isNaN(ViTri[2])) ViTri[2] = '0';
  ViTri[1] = parseInt((so % 1000000) / 1000);
  if (isNaN(ViTri[1])) ViTri[1] = '0';
  ViTri[0] = parseInt(so % 1000);
  if (isNaN(ViTri[0])) ViTri[0] = '0';
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    tmp = DocSo3ChuSo(ViTri[i]);
    KetQua += tmp;
    if (ViTri[i] > 0) KetQua += Tien[i];
    if (i > 0 && tmp.length > 0) KetQua += ','; //&& (!string.IsNullOrEmpty(tmp))
  }
  if (KetQua.substring(KetQua.length - 1) == ',') {
    KetQua = KetQua.substring(0, KetQua.length - 1);
  }
  KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
  return KetQua; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    marginTop: -40,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigContainer: {
    width: '95%',
    height: '16%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
  },
  smallContainer: {
    width: '49%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  TextRight: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    textTransform: 'uppercase',
    marginBottom: 5,
  },

  button: {
    display: 'flex',
    margin: 20,
    backgroundColor: '#43CD80',
    height: 50,
    width: '40%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  bottom: {
    backgroundColor: 'red',
  },
});

export default ConfirmScreen;
