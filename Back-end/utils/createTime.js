const currentTime = () => {
    let now = new Date();

    let result = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
    }

    for (key in result){
        result[key] = addZero(result[key])
    }

    return result;
}

const addZero = (num) => {
    return num.toString().padStart(2, "0")
}

module.exports = currentTime