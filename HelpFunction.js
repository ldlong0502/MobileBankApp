const formatMoney = value => {
    return (value.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')).split('.')[0] + ' VNĐ';
};
const check = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$';
export default {
    formatMoney,
    check,
};
