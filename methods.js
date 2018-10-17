function now() { //Returns a date object with todays date
    var d = new Date();

    return classes.date(d.getDay(), d.getMonth(), d.getFullYear())
}
