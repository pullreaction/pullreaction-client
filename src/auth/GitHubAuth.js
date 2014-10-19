var GitHubAuth = (function() {
    function GitHubAuth() {

    };

    GitHubAuth.getAuthPath = function() {
        return '/auth/github';
    };

    return GitHubAuth;
})();
