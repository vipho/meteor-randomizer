Template.list.helpers({
	nicknames: function() {
    return Nicknames.find().fetch();//.sort(() => {
    // 	return Math.random() - 0.5;
    // });
  },
});