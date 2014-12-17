
app.Models.User = Backbone.Model.extend({

    defaults: {
        uid: undefined,
        username: '',
        pic190x190: '',
        first_name: '',
        last_name: '',
        inGame: false,
        state: 'loading',
        mobState: 'Loading',
        audioIsPlaying: undefined
    },

    init: function() {

    },

    getUserData: function() {
        GameApi.requestUserProfile({
            callback: _.bind(function(data) {
                // установка данных модели необходимых для запуска
                if (data.result == 'success') {
                    // можем показать игру
                    if (!data[0].pic190x190 || data[0].pic190x190.indexOf('stub') >= 0) {
                        data[0].pic190x190 = 'i/ava90.png';
                    }
                    this.set({
                        username: data[0].name,
                        first_name: data[0].first_name,
                        last_name: data[0].last_name,
                        pic190x190: data[0].pic190x190,
                        state: 'welcome_page',
                        readyStatus: this.get('readyStatus') + 1
                    });
                }
                else {
                    app.Models.user.throwError();
                }
            }, this)
        });
    }

});
