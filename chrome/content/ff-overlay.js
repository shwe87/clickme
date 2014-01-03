var browsing_synch = {
  onLoad: function() {
    // initialization code
    this.initialized = true;
    this.strings = document.getElementById("browsing_synch-strings");
  },

  onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
  },

  onToolbarButtonCommand: function(e) {
    // just reuse the function above.  you can change this, obviously!
    browsing_synch.onMenuItemCommand(e);
  }
};

window.addEventListener("load", function () { browsing_synch.onLoad(); }, false);


browsing_synch.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e) {
    browsing_synch.showFirefoxContextMenu(e);
  }, false);
};

browsing_synch.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-browsing_synch").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { browsing_synch.onFirefoxLoad(); }, false);