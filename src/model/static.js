import request from '../widget/request';

export const getLizardCode = data => request('/activity/activity-static/lizard/index.js', data);
