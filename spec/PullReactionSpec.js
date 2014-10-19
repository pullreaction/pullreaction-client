describe('Pull Reaction Client', function() {
    var browser, widget, prServiceservice;

    beforeEach(function() {
        browser = jasmine.createSpyObj('Browser', ['open']);
    });

    it("logs the user in", function() {
        var pr = new PullReaction({ browser: browser });

        pr.login();

        expect(browser.open).toHaveBeenCalledWith('http://www.pullreaction.com/api/v1/auth/github');
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
});
