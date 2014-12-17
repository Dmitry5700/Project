
var app = app || {
    Models: {},
    Views: {},
    /**
     * Упорядоченный массив вьюх по порядку снизу-вверх как они находятся в dom
     */
    viewsArr: null,
    viewsRoot: null,
    /**
     * Массив показа вью, при showView вьха кладется в конец массива
     * При back() удаляется в конца и показывается
     */
    history: [],

    start: function() {

        this.viewsRoot = $(document.body)[0];

        // создание моделей
        app.Models.user = new app.Models.User({
            uid: '123',
            inGame: true
        });

        // создание вью-контроллеров
        app.Views.newLevel = new app.Views.NewLevelView({
            model: app.Models.user
        });

        app.hideAllViews();

        // инициализация апи
//        GameApi.init({
//            session: session,
//            FAPIinitRequired: !(app.Config.properties.isMob || (window.location.origin && window.location.origin.indexOf('localhost') >= 0)),
//            isMob: app.Config.properties.isMob,
//            callback: _.bind(function(result) {
//                app.Models.user.init();
//            },this)
//        });
    },

    /**
     * Отобразить вью.
     * Важно, вызов этого метода еще не гарантирует, что пользователь увидит вью. Он может быть закрыт другим вью сверху
     *
     * @param v
     */
    showView: function(v) {
        $(v.el).show();
        v.isShowed = true;
        if (v.onShow) {
            v.onShow();
        }
        this.updateViewsZOrder();
    },

    back: function() {
        if (this.history.length >= 2) {
            this.history.pop()
            this.showView(this.history[this.history.length-1]);
        }
    },

    hideView: function(v) {
        $(v.el).hide();
        v.isShowed = false;
        if (v.onHide) {
            v.onHide();
        }
        this.updateViewsZOrder();
    },

    hideAllViews: function() {
        _.each(this.Views, _.bind(function(v) {
            if (v.isShowed !== false) {
                app.hideView(v);
            }
        }), this);
    },

    /**
     * Получить z индекс вьюхи. Относительно других ВИДИМЫХ вью, которые есть в app.Views
     * 0 - самый топ, то есть именно его сейчас видит пользователь. Дальше по убыванию.
     * Например, подписавшись на это событие и проверяя на самый врехний индекс, вью может начать анимацию тогда и только тогда
     * когда пользователь гарантированно его увидит
     *
     */
    updateViewsZOrder: function() {
        if (!this.viewsArr) {
            this.regulateViews(this.viewsRoot);
        }
        var zIndex = 0, v;
        // this.Views - находятся в порядке "снизу-вверх" в dom дереве
        for (var i = this.viewsArr.length-1; i >= 0; i--) {
            v = this.viewsArr[i];
            if (v.isShowed == true) {
                if (v['__zIndex'] !== zIndex) {
                    v['__zIndex'] = zIndex;

                    // если у текущего вью меняется zOrder и становится 0, то это считается пока
                    // не обязательно show, а может быть hide предыдущего
                    if (zIndex == 0) {
                        this.history.push(v);
                    }

                    if (v.onZIndexChange) {
                        v.onZIndexChange(zIndex);
                    }
                }
                zIndex++;
            }
            else {
                v['__zIndex'] = undefined;
            }
        }
    },

    /**
     * Упорядочить вьхи в едином массив, в таком порядке как они находятся в DOM
     *
     * @param domElem
     */
    regulateViews: function(domElem) {
        this.viewsArr = [];
        for (var i = 0; i < domElem.children.length; i++) {
            _.each(app.Views, function(v) {
                if (app.isElement(v.el) && domElem.children[i] == v.el) {
                    v['__domIndex'] = i;
                    app.viewsArr.push(v);
                }
            });
        }
    },

    isElement: function(obj) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrom)
            return obj instanceof HTMLElement;
        }
        catch(e){
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have. (works on IE7)
            return (typeof obj==="object") &&
                (obj.nodeType===1) && (typeof obj.style === "object") &&
                (typeof obj.ownerDocument ==="object");
        }
    }
};
