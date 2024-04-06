export default {
    state: {
        isCollapse: false // 控制左侧菜单的展开/折叠
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}
