const assert = require('assert');

//
// Technology contains information on servers providing services for autograding.
// Services register themselves at the technology server at startup and
// update their status (heartbeat) at regular intervals. The
// updatedAt property registers the last moment of availability of the service.
//
class Technology {

    constructor(name, description, amount, imageurl, otherinfo) {

        // Check vooraf of de argumenten van het juiste type zijn.
        assert.equal(typeof (name), 'string', "Argument 'name' must be a string.");
        assert.equal(typeof (amount), 'number', "Argument 'amount' must be a number.");
        assert.ok(!isNaN(amount) && amount > 0, "Argument 'amount' must be a positive integer");

        // Alles okee, hier maken we het nieuwe object.
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.imageurl = imageurl;
        this.lastUpdated = new Date().toUTCString();
        this.childclass = new Child();
    };

    update() {
        this.lastUpdated = new Date().toUTCString();
    };

    toJSON() {
        return this;
    };

};

//
// Demo of a subclass, used as property in the above class.
//
class Child {

    constructor() {
        this.name = 'hier een naam';
        this.age = 24;
    }
}

module.exports = Technology;