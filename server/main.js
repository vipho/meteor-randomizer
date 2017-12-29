Meteor.startup(function clearItems() {
    Button.remove({});

    Nicknames.update({status: true}, {
        $set: {status: false}
    }, {multi: true});
});
Meteor.methods({
	'nicknameInsert'() {
		var user = {
    	nickname: arguments[0]
    };

    var sameNickname = Nicknames.findOne(user);
    if (sameNickname || user.nickname.trim().length <= 1) {
      return false;
    }

    Nicknames.insert(user);
	},

	'nicknameIsSelected'() {
    let ip = {
    	ip: this.connection.clientAddress
    };
    var sameIp = Button.findOne(ip);
    if (sameIp || Nicknames.find().count() === 0) return;
    Button.insert(ip);

    if (Button.find().count() === Nicknames.find().count()) {
    	Nicknames.update({status: true}, {
	    	$set: {status: false}
	    }, {multi: true});

    	var amount = Nicknames.find().count();
    	var randomID = Math.floor(Math.random() * amount);

    	var ids = Nicknames.find().map(e => e._id);

    	// console.log(randomID + ' ' + ids[randomID]);

    	Nicknames.update({_id: ids[randomID]}, {
    		$set: {status: true}
    	});

    	Button.remove({});

        Meteor.setTimeout(() => {
            console.log('timeout!');
            Nicknames.update({status: true}, {
                $set: {status: false}
            }, {multi: true});
        }, 10 * 1000);
    }
  },
});