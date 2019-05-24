export default [
    {
        title: "首页",
        key: "/admin/dashboard",
        icon: "home"
    },
    {
        title: "任务中心",
        key: "/admin/taskCenter",
        icon: "appstore",
        children: [
            {
                title: "任务中心",
                key: "/admin/taskCenter/phonelist"
            },
            {
                title: "通话记录",
                key: "/admin/taskCenter/callHistory"
            },
            {
                title: "导出记录",
                key: "/admin/taskCenter/exportList",
                children: [
                    {
                        title: "导出记录Children2",
                        key: "/admin/taskCenter/exportList2"
                    },
                    {
                        title: "导出记录Children3",
                        key: "/admin/taskCenter/exportList3"
                    }
                ]
            },
        ]
    },
    {
        title: "系统管理",
        key: "/admin/system",
        icon: "setting",
        children: [
            {
                title: "菜单管理",
                key: "/admin/system/menuManage"
            },
            {
                title: "权限管理",
                key: "/admin/system/authManage"
            },
            {
                title: "用户管理",
                key: "/admin/system/userManage"
            },
        ]
    },
]