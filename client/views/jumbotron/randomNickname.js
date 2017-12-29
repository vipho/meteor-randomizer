import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.randomNickname.onCreated(function nicknameOnCreated() {
	this.currentNickname = new ReactiveVar(false);

	var instance = this;
	Meteor.startup(function() {
		var loop;
		
		Tracker.autorun(function() {
			var cN = instance.currentNickname;

			var nickname = Nicknames.find({status: true});
			if (nickname.count() !== 1) {
				cN.set(false);
				return
			};
			nickname = nickname.fetch()[0].nickname;

			if (cN.get() === nickname || loop !== undefined) return;
			// if (cN.get() === false) {
			// 	cN.set(nickname);
			// 	return;
			// }

			var counter = 5,
					delay = 1000;
			loop  = setInterval(() => {
								if (counter === 0) {
									cN.set(nickname);
									clearInterval(loop);
									loop = undefined;
									return;
								}

								cN.set(counter);
								counter--;
							}, delay);
	  });
	});
});
Template.randomNickname.helpers({
	nickname: () => Template.instance().currentNickname.get(),
	count: () => Button.find().count(),
	all: () => Nicknames.find().count(),
});

Template.randomNickname.events({
	'click button'() {
		Meteor.call('nicknameIsSelected', function(error, result) {
      // отобразить ошибку пользователю и прерваться
      if (error)
        return alert(error.reason);
    });
	}
});