//
// Module om een lijst van items bij te houden.
// Vooral bedoeld om te kunnen werken met functions en callbacks.
//

let theList = [];

module.exports = {

    addItem(item, callback) {
        theList.push(item);
        callback(item);
    },

    getItems(callback) {
        callback(theList);
    },

    getItemById(id, callback) {

        if (id > theList.length) {
            callback(new Error('Error: id ' + id + ' does not exitst.'), null);
        } else {
            callback(null, theList[id]);
        }
    }


}