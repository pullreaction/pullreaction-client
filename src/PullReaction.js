var PullReaction = (function() {
    var LOGIN_URL = 'http://www.pullreaction.com/api/v1/auth/github';

    function PullReaction(args) {
        this._browser = args.browser;
        this._widget = new PullReactionWidget();
        this._service = new PullReactionService();
    };

    PullReaction.prototype.login = function() {
        this._browser.open(LOGIN_URL);
    };

    PullReaction.prototype.showWidget = function() {
        this._widget.show();
    };

    PullReaction.prototype.hideWidget = function() {
        this._widget.hide();
    };

    PullReaction.prototype.refresh = function() {
        this._widget.addReactions(
            this._service.getAll()
        );
    };

    return PullReaction;
})();
