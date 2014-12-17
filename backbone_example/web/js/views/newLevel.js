/**
 * Created by artyom.grishanov on 04.08.14.
 */

app.Views.NewLevelView = Backbone.View.extend({
    // родительский элемент куда поместить вью
    el: $("#id-newlevel_cnt"),
    isShowed: undefined,
    initLevel: -1,

    templates: {
        // из какого шаблоны сделать ui этого view
        "new_level": _.template($('#id-new_level').html())
    },

    events: {
        "click #id-nl_continue": "continue"
    },

    continue: function() {
        app.hideView(this);
    },

    initialize: function () {
        app.Models.user.bind("change:levelIndex", function () {
            // сделать что-то на изменение нужного свойства модели
            this.render();
            app.showView(this);
        }, this);
    },

    render: function () {

        $(this.el).html(this.templates['new_level']({
            levelText: 'Вы перешли на уровень: ' + (this.model.get('levelIndex')+1)
        }));

        return this;
    }
});
