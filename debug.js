import Stats from "./libs/stats.js";

// Performance monitor
function dispStats(container) {
    const stats = Stats();
    stats.showPanel(0);
    container.appendChild(stats.dom);
    return stats;
}
export default dispStats;