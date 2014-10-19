describe('Pull Reaction Client', function() {
    var browser, widget, prServiceservice;

    beforeEach(function() {
        browser = jasmine.createSpyObj('Browser', ['open']);
    });

    it("logs the user in with GitHub", function() {
        var pr = new PullReaction({ browser: browser });

        pr.login(GitHubAuth);

        expect(browser.open).toHaveBeenCalledWith(GitHubAuth.getAuthPath());
    });

    it("shows the widget", function() {
        var pr = new PullReaction({ browser: browser });
        spyOn(pr._widget, 'show');

        pr.showWidget();

        expect(pr._widget.show).toHaveBeenCalled();
    });

    it("hides the widget", function() {
        var pr = new PullReaction({ browser: browser });
        spyOn(pr._widget, 'hide');

        pr.hideWidget();

        expect(pr._widget.hide).toHaveBeenCalled();
    });

    it("refreshes reactions", function() {
        var reactions = [ 1, 2, 3];

        var pr = new PullReaction({ browser: browser });
        spyOn(pr._service, 'getAll').and.returnValue(reactions);
        spyOn(pr._widget, 'addReactions');

        pr.refresh();

        expect(pr._service.getAll).toHaveBeenCalled();
        expect(pr._widget.addReactions).toHaveBeenCalledWith(reactions);
    });

    it("adds a new reaction from image DOMNode", function() {
        var img = document.createElement('img');
        img.src = 'http://example.com/reaction.gif';

        var pr = new PullReaction({ browser: browser });
        spyOn(pr._service, 'addReaction')

        pr.addReaction(img);

        expect(pr._service.addReaction).toHaveBeenCalledWith('http://example.com/reaction.gif');
    });
});
