// Add back in the extend function, which is missing in later versions of ROT.JS. See https://github.com/ondras/rot.js/blob/f8dfeb711bcef2659c491be11ee044e84bd01857/src/js/function.js
Function.prototype.extend = function(parent) {
    this.prototype = Object.create(parent.prototype);
    this.prototype.constructor = this;
    return this;
}

var Game = {
    _display: null,
    _currentScreen: null,
    init: function() {
        this._display = new ROT.Display({width:80, height:24});
        // Create helper function for binding to an event
        var game = this;
        var bindEventToScreen = function(event) {
            window.addEventListener(event, function(e) {
                // When event received, send it to the screen
                if(game._currentScreen !== null) {
                    game._currentScreen.handleInput(event, e)
                }
            });
        }
        // Bind keyboard input events
        bindEventToScreen('keydown');
        bindEventToScreen('keyup');
        bindEventToScreen('keypress');
    },
    getDisplay: function() {
        return this._display;
    },
    switchScreen: function(screen) {
        // If we had a screen before, notify it we exited
        if(this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        // Clear the display
        this.getDisplay().clear();
        // Update current screen, notify it we entered, render
        this._currentScreen = screen;
        if(!this._currentScreen !== null) {
            this._currentScreen.enter();
            this._currentScreen.render(this._display);
        }
    }
}

window.onload = function() {
    // Initialize the game
    Game.init();
    // Add the container to our HTML page
    this.document.body.appendChild(Game.getDisplay().getContainer());
    // Load the start screen
    Game.switchScreen(Game.Screen.startScreen);
}