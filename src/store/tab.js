export default {
    state: {
        isCollapse: false, // 控制左侧菜单的展开/折叠
        tabsList: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home'
            }
        ]
    },
    mutations: {
        // 控制左侧菜单的展开/折叠
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu() {

        }
    }
}
