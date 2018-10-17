function date(day, month, year) { //Creates a date object
    obj = {};

    obj.day = day;
    obj.month = month;
    obj.year = year;

    return obj;
}

function employee(e=0, id=undefined, name=undefined, positions=undefined) {
    //An employee object is an object that holds an employee consisting of an
    //id, name, and position. E should either be 0, false, or an employee object
    var obj = {};

    if(!e) { //If no employee object is provided
        obj.id = id;
        obj.name = name;
        obj.positions = positions;
    }

    else {
        obj = e;
    }

    return obj;
}

function scheduleSlot(time, e, position=0) {
    //Time should be a time in datetime structure, e should be an employee object
    obj = {};

    obj.time = time;
    obj.employee = e;
    if(!position) {
        obj.position = e.positions;
    }
    else {
        obj.position = position;
    }

    return obj;
}


module.exports = {
    date : date,
    employee : employee,
    scheduleSlot : scheduleSlot,
}
