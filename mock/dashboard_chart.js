function chart(method) {
    let res = null;
    switch (method) {
        case "GET":
            res = [10, 30, 56, 78, 20, 94];
            break;

        default:
            res = null;
            break;
    }
    return res;
}

module.exports = chart;