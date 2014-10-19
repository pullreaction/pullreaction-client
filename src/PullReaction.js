var PullReaction = (function() {
    var LOGIN_URL = 'http://www.pullreaction.com/api/v1/auth/github';

    function PullReaction(args) {
        this._browser = args.browser;
        this._service = args.service;
        this._widget = args.widget;
    };

    PullReaction.prototype.login = function(authProvider) {
        this._browser.open(authProvider.getAuthPath());
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

    PullReaction.prototype.addReaction = function(node) {
        this._service.addReaction(node.src);
    };

    PullReaction.prototype.getThumbnailContent = function(reaction) {
        this._service.getThumbnailContent(reaction);
    }

    return PullReaction;
})();
