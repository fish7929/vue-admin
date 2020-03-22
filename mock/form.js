function form(method) {
    let res = null;
    switch (method) {
        case "GET":
            res = {
                message: "ok",
            };
            break;

        default:
            res = null;
            break;
    }
    return res;
}

module.exports = form;