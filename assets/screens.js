// Code for game screens (world, inventory, etc). Each screen handles its own rendering and input handling
// Basic structure of a screen: functions for enter, exit, render, handleInput

Game.Screen = {}; // Create Screen namespace

// Define the screens (start, play, win, loss)
Game.Screen.startScreen = {
    enter: function() { console.log("entered start screen"); },
    exit: function() { console.log("Exited start screen."); },
    render: function(display) {
        // Render prompt to screen
        display.drawText(1,1, "%c{yellow}Triple Crown RL");
        display.drawText(1,2,"Press [Enter] to start!");
    },
    handleInput: function(inputType, inputData) {
        // On press Enter, go to play screen
        if(inputType==="keydown") {
            if(inputData.keyCode === ROT.KEYS.VK_RETURN) { // NOTE: Unlike the older guide, use ROT.KEYS.VK_RETURN, not ROT.VK_RETURN (likewise for other keycodes)
                Game.switchScreen(Game.Screen.playScreen);
            }
        }
    }
}
Game.Screen.playScreen = {
    enter: function() { console.log("entered play screen"); },
    exit: function() { console.log("exited play screen"); },
    render: function(display) {
        display.drawText(3,5,"%c{red}%b{white}Play screen!");
    },
    handleInput: function(inputType, inputData) {
        if(inputType === 'keydown') {
            if(inputData.keyCode === ROT.KEYS.VK_RETURN) {
                console.log("pressed enter");
            }
        }
    }
}