describe('Pull Reaction Client', function() {
    var args;

    beforeEach(function() {
        args = {
            browser: jasmine.createSpyObj('Browser', ['open']),
            service: jasmine.createSpyObj('PullReactionService', ['getAll', 'addReaction']),
            widget: jasmine.createSpyObj('PullReactionWidget', ['show', 'hide', 'addReactions'])
        };
    });

    it("logs the user in with GitHub", function() {
        var pr = new PullReaction(args);

        pr.login(GitHubAuth);

        expect(pr._browser.open).toHaveBeenCalledWith(GitHubAuth.getAuthPath());
    });

    it("shows the widget", function() {
        var pr = new PullReaction(args);

        pr.showWidget();

        expect(pr._widget.show).toHaveBeenCalled();
    });

    it("hides the widget", function() {
        var pr = new PullReaction(args);

        pr.hideWidget();

        expect(pr._widget.hide).toHaveBeenCalled();
    });

    it("refreshes reactions", function() {
        var pr = new PullReaction(args);
        var reactions = [ 1, 2, 3];
        pr._service.getAll.and.returnValue(reactions);

        pr.refresh();

        expect(pr._service.getAll).toHaveBeenCalled();
        expect(pr._widget.addReactions).toHaveBeenCalledWith(reactions);
    });

    it("adds a new reaction from image DOMNode", function() {
        var pr = new PullReaction(args);
        var img = document.createElement('img');
        img.src = 'http://example.com/reaction.gif';

        pr.addReaction(img);

        expect(pr._service.addReaction).toHaveBeenCalledWith('http://example.com/reaction.gif');
    });
});
