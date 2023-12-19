function numberWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function createTextData(data) {
  return `Ma don thuoc: ${data.id}
Nguoi tao: ${data.createdAccount.name}
Thoi gian: ${data.createdAt.toLocaleString()}
Ghi chu: ${data.description}
Ten nguoi mua: ${data.patient.name}       SDT: ${
    data.patient.phone
  }          Gioi tinh: ${data.patient.gender ? 'Nam' : 'Nu'}
Tong tien: ${numberWithCommas(data.total) + ' VND'}
`;
}

function createTableData(data) {
  return {
    title: 'Danh sach cac loai thuoc',
    headers: ['Ten thuoc', 'SL/ngay', 'Cach dung', 'Gia', 'So luong', 'Don vi'],
    rows: data.medicines.map((medicine) => [
      medicine.name,
      medicine.amountPerDay,
      medicine.usage,
      medicine.price,
      medicine.amount,
      medicine.unit,
    ]),
  };
}

module.exports = { createTextData, createTableData };
