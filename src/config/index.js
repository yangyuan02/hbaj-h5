const activityType = {
  '0': {
    orgCode: 'HNTB',
    serviceType: 'DBNJ'
  }
};

export const getActivityType = type => activityType[type] || {};
