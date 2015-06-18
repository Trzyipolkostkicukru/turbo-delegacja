export function getCloneOfObject(oldObject: any) {
    var tempClone = {};
    if (typeof (oldObject) == "object")
        for (var prop in oldObject)
            if ((typeof (oldObject[prop]) == "object") && (oldObject[prop]).__isArray) tempClone[prop] = this.getCloneOfArray(oldObject[prop]);
            else if (typeof (oldObject[prop]) == "object") tempClone[prop] = this.getCloneOfObject(oldObject[prop]);
            else tempClone[prop] = oldObject[prop];

    return tempClone;
}

export function getCloneOfArray(oldArray: any) {
    var tempClone = [];
    for (var arrIndex = 0; arrIndex <= oldArray.length; arrIndex++)
        if (typeof (oldArray[arrIndex]) == "object") tempClone.push(this.getCloneOfObject(oldArray[arrIndex]));
        else tempClone.push(oldArray[arrIndex]);
    return tempClone;
}