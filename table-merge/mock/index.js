import Mock, { Random } from "mockjs"

const DeptSet = ["党委", "人大", "政府", "政协"];

Random.extend({
    location: function () {
        return Random.province();
    },
    department: function () {
        return this.pick(DeptSet);
    }
});

export default [{
    url: "/api/getData",
    method: 'get',
    response: () => {
        return {
            success: true,
            message: "success",
            data: Mock.mock({
                "rows|20": [{
                    id: '@guid',
                    province: '@location',
                    dept: '@department',
                    email: '@email',
                    address: '@url'
                }]
            }).rows
        }
    }
}]