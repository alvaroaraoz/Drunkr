var settingsForm;

Template.settings.helpers({
  generateSettingsForm: function (setting) {
    Meteor.defer(function() {
      settingsForm = new DatabaseForm();
      settingsForm.generateFor(setting, '#json-form');
    })  
  },
  noSettings: function(){
    if (Settings.findOne()) {
      return false;
    }
    return true;
  },
  setting: function(){
    var setting = Settings.find().fetch()[0];
    return new Setting(setting) || new Setting();
  }
});

Template.settings.events = {
  'click input[type=submit]': function(e){
    e.preventDefault();
    if(!Meteor.user()) throw 'Tienes que estar conectado a tu cuenta de administrador.';

    settingsForm.submit(
      function(){
        throwError("Se han configurado los ajustes correctamente");
      },
      function(error) {
        if(error) console.log(error);
          throwError("Ajustes guardados correctamente");
      }
    );
  }
};
