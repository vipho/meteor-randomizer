Template.form.helpers({
	
});
Template.form.events({
  'submit form': function(e) {
    e.preventDefault();

    let nickname = $(e.target).find('[name=nickname]').val();
    Meteor.call('nicknameInsert', nickname, function(error, result) {
      // отобразить ошибку пользователю и прерваться
      if (error)
        return alert(error.reason);
    });
  }
});