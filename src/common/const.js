export const customerStatusMapping = {
  unverified: {
    key: '0',
    title: '准会员',
  },
  verified: {
    key: '1',
    title: '会员'
  },
  partner: {
    key: '2',
    title: '伙伴'
  }
}

export const getStatusMappingTitleByKey = (mapping, status) => {
  var title = '';
  Object.keys(mapping).map(function(key) {
    const item = mapping[key];
    if (item.key === status) {
      title = item.title;
      return;
    }
  });
  return title;
}

export const reservationStatusMapping = {
  reserved: {
    key: '0',
    title: '等待确认'
  },
  resolved: {
    key: '1',
    title: '等待到店'
  },
  reject: {
    key: '2',
    title: '已拒绝'
  },
  completed: {
    key: '3',
    title: '已完成'
  }
}
