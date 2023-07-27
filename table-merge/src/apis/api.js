import request from './index';

export function GetTestData() {
    return request({
        method: 'get',
        url: '/api/getData'
    });
}