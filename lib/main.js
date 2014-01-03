var data = require("sdk/self").data;
const {Ci,Cc} = require("chrome");
var tabs = require("sdk/tabs");

//chrome://browser/content/bookmarks/bookmarksPanel.xul
var windows = require("sdk/windows").browserWindows;


/*
tabs.open({
  url: data.url('twitter.html')
});
tabs.on('ready', function(tab) {
  tab.attach({
      contentScriptFile: data.url('menu.js')
  });
});
/*
var cm = require("sdk/context-menu").Item({
  label: "This Page Has Images",
  contentScriptFile: data.url('menu.js')
});


var utils = require('sdk/window/utils');
var window= utils.getMostRecentBrowserWindow()


var ww = Cc["@mozilla.org/embedcomp/window-watcher;1"]
                   .getService(Ci.nsIWindowWatcher);
                   
/*windows.open({
  url: "http://www.example.com",
  onOpen: function(window) {*/
    // do stuff like listen for content
    // loading.
    /*var window = window.QueryInterface(Ci.nsIInterfaceRequestor)
                   .getInterface(Ci.nsIWebNavigation)
                   .QueryInterface(Ci.nsIDocShellTreeItem)
                   .rootTreeItem
                   .QueryInterface(Ci.nsIInterfaceRequestor)
                   .getInterface(Ci.nsIDOMWindow);*/
                   
    //mainWindow.gBrowser.addTab('www.urjc.es');
//  }
//});  
/*

var newTabBrowser = window.gBrowser.getBrowserForTab(window.gBrowser.addTab("http://www.google.com/"));
newTabBrowser.addEventListener("load", function (event) {
  //newTabBrowser.contentDocument.body.innerHTML = "<div>hello world</div>";
  var menu = event.target.contentcontextmenu;
  console.log(menu.toString());
  menu.moveTo(20,20);
}, true);                 
*/
//var data = require("self").data;
//var {Cc, Ci} = require("chrome");




exports.main = function(options, callbacks) {
    //addTabMenu();
    //addMenuItem();
    //addSideBar();
    //bookmarkWindow();
    // other stuff
    addATabMenu();
};

var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
var window = mediator.getMostRecentWindow("navigator:browser");
/*var tabbrowser = window.gBrowser;
/*var currentTab = tabbrowser.tabContainer;
console.log(currentTab.id);*/
var document = mediator.getMostRecentWindow("navigator:browser").document; 

function addATabMenu() {
	var aDocument = mediator.getMostRecentWindow("navigator:gBrowser").document;
	
	//var aTab = window.gBrowser;
	//var documentTab = aTab.contentDocument;
	  
	
	var tabContextMenu = aDocument.getElementById("tabContextMenu");
	if (tabContextMenu){
			console.log("Tab context menu1!!!");
	}
	else{
			console.log("NULL!");
	}
	/*if (!tabContextMenu) {
		var message = {'msg':'Internal browser error!','type':'error'};
		emit(exports,'showMessage',message);
	}
	else{
		var sep*arator = createMenuSeparator(SS_TAB_SEPARTOR);
		tabContextMenu.appendChild(separator);
		
		var currentTab = tabs.activeTab;
		var menuItem = createMenuItem(TAB_MENU,'Save this tab');
		//menuItem.setAttribute('disabled','true');
		menuItem.addEventListener('command', function(event) {
					currentTab = tabs.activeTab;
					console.log('XUL:  '+currentTab.id);
					console.log('XUL:  '+currentTab.title);
					console.log('XUL:  '+currentTab.url);
					if (currentTab.title == 'Connecting…' && currentTab.url == 'about:blank'){
						currentTab.on('ready',function(thisTab){
							console.log('XUL:  '+"READY!");
							emit(exports,'tabContextClicked',[thisTab]);
						});
					
					}
					else{
						console.log('XUL:  '+"Already ready!!!");
						emit(exports,'tabContextClicked',[currentTab]);
					}
					
						
		}, false);
		tabContextMenu.appendChild(menuItem);
		/*tabContextMenu.addEventListener('popupshowing',function(event){
			currentTab = tabs.activeTab;
			if (event.target.id == 'tabContextMenu'){ 
				var tabMenu = document.getElementById(TAB_MENU);
				currentTab.on('ready',function(thisTab){
					var tabMenu = document.getElementById(TAB_MENU);
					if (tabMenu){	
						tabMenu.setAttribute('disabled','false');
						
					}
				});
				 
			}	
		});*/
	//}
	 	  
}
function addTabMenu() {    
    var navBar = document.getElementById("tabContextMenu");
    if (!navBar) {
    	console.log("NO!!!!");
        return;
    }
    var menuItem = document.createElement("menuitem");  

    menuItem.setAttribute('id', 'myitem');
    menuItem.setAttribute('label', 'My App');

    menuItem.addEventListener('command', function(event) {
        // use tabs.activeTab.attach() to execute scripts in the context of the browser tab
       //console.log('clicked ' + event.originalTarget.contextTab);
       console.log(window.gBrowser.currentURI.spec);
       console.log(window.gBrowser.label);
       console.log(tabs.activeTab.title);
    }, false);
    navBar.appendChild(menuItem);    
}


function addMenuItem(){

	var toolBar = document.getElementById('menu_ToolsPopup');
	
	var menuitem = document.createElement('menuitem');
	menuitem.setAttribute('id', 'saveTabs');
	menuitem.setAttribute('label', 'Save all Tabs');
	menuitem.addEventListener('command', function(event){
		console.log("OK!");
	});
	toolBar.appendChild(menuitem);
	



}

/**
 * Opens or closes the sidebar identified by commandID.
 *
 * @param commandID a string identifying the sidebar to toggle; see the
 *                  note below. (Optional if a sidebar is already open.)
 * @param forceOpen boolean indicating whether the sidebar should be
 *                  opened regardless of it's current state (optional).
 * @note
 * We expect to find a xul:broadcaster element with the specified ID.
 * The following attributes on that element may be used and/or modified:
 *  - id           (required) the string to match commandID. The convention
 *                 is to use this naming scheme: 'view<sidebar-name>Sidebar'.
 *  - sidebarurl   (required) specifies the URL to load in this sidebar.
 *  - sidebartitle or label (in that order) specify the title to 
 *                 display on the sidebar.
 *  - checked      indicates whether the sidebar is currently displayed.
 *                 Note that toggleSidebar updates this attribute when
 *                 it changes the sidebar's visibility.
 *  - group        this attribute must be set to "sidebar".
 */
 function xmlToString(xmlData) {
    var xmlString;

        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    
    return xmlString;
}   



function bookmarkWindow(){
	var bookmarkMenu = document.getElementById('menu_bookmarksSidebar');
	var observer = document.createElement('observes'); //Observe when the bookmark panel shows
	observer.setAttribute('element','viewBookmarksSidebar');
	observer.setAttribute('attribute','checked');
	observer.addEventListener('broadcast',function(event){
		console.log("Bookmark panel showing " + event.target);

		
		var sidebarWindow = document.getElementById("sidebar").contentWindow;//Try to get the sidebar window
		if(sidebarWindow == null){
			console.log("NULL");
		}
		else{
			console.log("Sidebarwindow not null." +sidebarWindow.document.title);
		}
		
		//var bar = sidebarWindow.documentElement;
		//console.log("nodoHtml es un nodo " + bar.firstChild + " !");
		
		//var bar = sidebarWindow.getElementById("bookmarksPanel");
		


	});
	bookmarkMenu.appendChild(observer);

}
 
function hello(){
		console.log("Hello!");
	
}

function addSideBar(){
	//try{
		var sidebar = document.getElementById('viewSidebarMenu');
		
		if (sidebar != null){
		//	console.log("not null");
			
			
		
			/*
			<menuitem id="menu_bookmarksSidebar"
                              key="viewBookmarksSidebarKb"
                              observes="viewBookmarksSidebar"/>*/
                              
                              
			
			
			//menuitem.setAttribute('key','viewMyOwnSidebarKb');
			//menuitem.setAttribute('observes','viewMyOwnSidebar');
			
			
			
			/*<broadcaster id="viewBookmarksSidebar" autoCheck="false" label="&bookmarksButton.label;"
                 type="checkbox" group="sidebar" sidebarurl="chrome://browser/content/bookmarks/bookmarksPanel.xul"
                 oncommand="toggleSidebar('viewBookmarksSidebar');"/>*/
			/*var broadcaster = document.createElement('broadcaster');
			broadcaster.setAttribute('id','viewMyOwnSidebar');
			broadcaster.setAttribute('label', 'Sidebar ');
			broadcaster.setAttribute('sidebarurl', data.url('my.xul'));
			broadcaster.setAttribute('checked', 'false');
			broadcaster.setAttribute('type', 'checkbox');
			broadcaster.setAttribute('group', 'sidebar');
			broadcaster.setAttribute('autoCheck', 'false');
			//broadcaster.setAttribute('oncommand',toggleSidebar());
			
			menuitem.setAttribute('observes', 'broadcaster');
			<<keyset id="mainKeyset">>
			<key id="viewBookmarksSidebarKb" key="&bookmarksCmd.commandkey;" command="viewBookmarksSidebar" modifiers="accel"/>
			*/
			var prefix = "my";
			var bcset = document.getElementById('mainBroadcasterSet');
			let bc = document.createElement('broadcaster');
			bc.setAttribute('id', prefix + 'broadcaster');
			bc.setAttribute('label', 'myBookmarks');
			bc.setAttribute('autoCheck', 'false');
			bc.setAttribute('type', 'checkbox');
			bc.setAttribute('checked','false');
			bc.setAttribute('group', 'sidebar');
			bc.setAttribute('sidebarurl', data.url('twitter.html'));
			bc.setAttribute('sidebartitle', 'Sync & Share');
			//bc.setAttribute('accesskey', str['menu-accesskey']);
			bc.setAttribute('oncommand', 'toggleSidebar("' + prefix + 'broadcaster")');
			/*bc.addEventListener('command',function(event){
				toggleSidebar(prefix + 'broadcaster');
				console.log("Hola!!");
			});*/
			
			bcset.appendChild(bc);
			
			var mainKeySet = document.getElementById('mainKeyset');
			var keyBookmarks = document.createElement('key');
			keyBookmarks.setAttribute('id','viewMyBookmarksSidebarKb');
			keyBookmarks.setAttribute('modifiers','control alt');
			keyBookmarks.setAttribute('key','B');
			keyBookmarks.setAttribute('command',hello);
			mainKeySet.appendChild(keyBookmarks);
			    
			    
			var menuitem = document.createElement('menu');
			menuitem.setAttribute('id', 'myOwnSidebar');
			menuitem.setAttribute('label', 'Sidebar ');
			//menuitem.setAttribute('observes', prefix + 'broadcaster');
			
			/*
			<menupopup id="new-popup">
            <menuitem label="Window"/>
            <menuitem label="Message"/>
          </menupopup>
			*/
			var menuPopUp = document.createElement('menupopup');
			menuPopUp.setAttribute('id','new-popup');
			var newMenuItem = document.createElement('menuitem');
			//newMenuItem.setAttribute('label','myBookmarks');
			newMenuItem.setAttribute('key','viewMyBookmarksSidebarKb');
			newMenuItem.setAttribute('observes',prefix+'broadcaster');
			//<observes element="colorChanger" attribute="style" onbroadcast="alert('Color changed');"/>
			
			/*var bookmarkMenu = document.getElementById('menu_bookmarksSidebar');*/
			var observer = document.createElement('observes');
			observer.setAttribute('element',prefix+'broadcaster');
			observer.setAttribute('attribute','checked');
			observer.addEventListener('broadcast',function(event){
				//var sXML = new XMLSerializer().serializeToString(document.getElementById('sidebox'));
				console.log("OK!!!! " + event.target.hasAttribute('title'));
				/*console.log("autoCheck = " + bookmarkBroadcaster.getAttribute('autoCheck')+" type = " + bookmarkBroadcaster.getAttribute('type')+" group " + bookmarkBroadcaster.getAttribute('group'));*/
				//console.log(xmlToString(event.target));
				//var brod = document.getElementById(prefix+'broadcaster');
				//var chck = brod.getAttribute('checked');
				var sidebarWindow = document.getElementById("sidebar");
				
				//console.log(sidebarWindow.getAttribute('src'));
				if(sidebarWindow == null){
					console.log("NULL");
				}
				else{
					var bar = sidebarWindow.document.getElementById("placesContext");
					
					//console.log("Not null!! " + sidebarWindow.location.href);
					//var bar = sidebarWindow.getElementById("bookmarksPanel");
					if (bar == null){
						console.log("NO");
					}
					else{
						console.log("YES HERE!!!");
					}
				}
				
				
				
			});
			//bookmarkMenu.appendChild(observer);
			newMenuItem.appendChild(observer);
			
			
			
			menuPopUp.appendChild(newMenuItem);
			var anotherMenuItem = document.createElement('menuitem');
			anotherMenuItem.setAttribute('label','History');
			anotherMenuItem.addEventListener('command',function(event){
				console.log("History clicked!!");
			
			});
			menuPopUp.appendChild(anotherMenuItem);
			menuitem.appendChild(menuPopUp);
			
			sidebar.appendChild(menuitem);
				
			
			    
			     
			  
			//bc.addEventListener('command', function(event) {
				//console.log('HEllo');
				/*let sidebarEle = document.getElementById('sidebar');
				let sidebarTitle = document.getElementById('sidebar-title');
				let sidebarSplitter = document.getElementById('sidebar-splitter');
		
				//let commandID = sidebarBox.getAttribute('sidebarcommand');
				//let sidebarBroadcaster = document.getElementById('viewMyOwnSidebar');

				let sidebarBox = document.getElementById('sidebar-box');
				sidebarBox.hidden = false;
				sidebarSplitter.hidden = false;

				//sidebarEle.setAttribute('src', data.url('twitter.html'));
				//sidebarEle.docShell.createAboutBlankContentViewer(null);

				//sidebarBroadcaster.setAttribute('checked','true');
				//sidebarBox.setAttribute('sidebarcommand', '');
				sidebarTitle.value = 'Sync & Share';
				//sidebarBox.hidden = false;
				//sidebarSplitter.hidden = false;
				
				/*<tabbox>
				  <tabs>
				    <tab label="Mail"/>
				    <tab label="News"/>
				  </tabs>
				  <tabpanels>
				    <tabpanel id="mailtab">
				      <checkbox label="Automatically check for mail"/>
				    </tabpanel>
				    <tabpanel id="newstab">
				      <button label="Clear News Buffer"/>
				    </tabpanel>
				  </tabpanels>
				</tabbox>*/
				//window.gBrowser.addTab('http://www.urjc.es');
				
				/*
			<tabbrowser id="content" disablehistory="true"
                  flex="1" contenttooltip="aHTMLTooltip"
                  tabcontainer="tabbrowser-tabs"
                  contentcontextmenu="contentAreaContextMenu"
                  autocompletepopup="PopupAutoComplete"/>
			
			*/
				/*let sidebarTabbrowser = document.createElement('page');
				sidebarTabbrowser.setAttribute('id','sidebar-tabbrowser');
				/*sidebarTabbrowser.setAttribute('flex','1');
				sidebarTabbrowser.setAttribute('contenttooltip','aHTMLTooltip');
				sidebarTabbrowser.setAttribute('diablehistory','true');
				sidebarTabbrowser.setAttribute('tabcontainer','tabbrowser-tabs');
				sidebarTabbrowser.setAttribute('autocompletepopup','PopupAutoComplete');
				
				
				
				let sidebarTab = document.getElementById('sidebar-tabbrowser');
				sidebarTab.loadOneTab('http://urjc.es');*/
				/*let sidebarBox = document.getElementById('sidebar-box');
				sidebarBox.appendChild(sidebarTabbrowser);
				
				sidebarTabbrowser.gBrowser.addTab('about:blank');*/
				
				/*let sidebarWindow = document.getElementById('sidebar').tabContainer;
				console.log(sidebarWindow.itemCount);*/
				
				/*
				 <vbox id="social-sidebar-box"
          class="chromeclass-extrachrome"
          observes="socialSidebarBroadcaster"
          persist="width">
      <browser id="social-sidebar-browser"
               type="content"
               context="contentAreaContextMenu"
               disableglobalhistory="true"
               tooltip="aHTMLTooltip"
               popupnotificationanchor="social-notification-icon"
               flex="1"
               style="min-width: 14em; width: 18em; max-width: 36em;"/>
    </vbox>
				*/
				
				/*var vox = document.createElement('vbox');
				vox.setAttribute('id','my-sidebar-box');
				vox.setAttribute('class','chromeclass-extrachrome');
				vox.setAttribute();*/
				
				
				
				
				/*
				var vBox = document.createElement('vbox');
				
				var tabbox = document.createElement('tabbox');
				var tabs = document.createElement('tabs');
				tabbox.appendChild(tabs);
				var tab = document.createElement('tab');
				tab.setAttribute('label','Bookmarks');
				tabs.appendChild(tab);
				var tabPanels = document.createElement('tabpanels');
				var tabPanel = document.createElement('tabpanel');
				tabPanel.setAttribute('id','BookmarkPanel');
				tabPanel.setAttribute('orient','vertical');
				tabPanel.innerHTML = "<html><body>Bookmark</body></html>";
				tabPanels.appendChild(tabPanel);
				
				var another = document.createElement('tab');
				another.setAttribute('label','History');
				//var tabPanels = document.createElement('tabpanels');
				var tabPanel = document.createElement('tabpanel');
				tabPanel.setAttribute('id','HistoryPanel');
				//tabPanel.setAttribute('orient','vertical');
				tabPanel.innerHTML = "History";
				tabPanels.appendChild(tabPanel);
				tabbox.appendChild(tabPanels);
				tabs.appendChild(another);
				
				vBox.appendChild(tabbox);
				sidebarBox.appendChild(vBox);*/
				
			/*	var appContent = document.getElementById('content');
				var tabContainer = appContent.getAttribute('tabcontainer');
				console.log(tabContainer);*/
				
    			//}, false);
		
			
			//var mainBroadcast = document.getElementById('mainBroadcasterSet');
			//mainBroadcast.appendChild(broadcaster);
		
			
			
		
			/*<key id="viewBookmarksSidebarKb" key="&bookmarksCmd.commandkey;" command="viewBookmarksSidebar" modifiers="accel"/>*/
			/*var key = document.createElement('key');
			key.setAttribute('id','viewMyOwnSidebarKb');
			key.setAttribute('key','&mysidebarCmd.commandkey;');
			key.setAttribute('command','viewMyOwnSidebar');
			key.setAttribute('modifiers','accel');
			
			var mainKey = document.getElementById('mainKeyset');
			mainKey.appendChild(key);
		
			/*sidebar.oncommand = function(){
				console.log("Sidebar");
			}*/
			
		}
	//}catch (e){console.log(e.toString());}

}

/*
function toggleSidebar(){

	    	 
		let sidebarEle = document.getElementById('sidebar');
		let sidebarTitle = document.getElementById('sidebar-title');
		let sidebarSplitter = document.getElementById('sidebar-splitter');
		
		//let commandID = sidebarBox.getAttribute('sidebarcommand');
		let sidebarBroadcaster = document.getElementById('viewMyOwnSidebar');

		let sidebarBox = document.getElementById('sidebar-box');
		sidebarBox.hidden = true;
		sidebarSplitter.hidden = true;

		sidebarEle.setAttribute('src', 'about:blank');
		//sidebarEle.docShell.createAboutBlankContentViewer(null);

		//sidebarBroadcaster.setAttribute('checked','true');
		//sidebarBox.setAttribute('sidebarcommand', '');
		sidebarTitle.value = 'Hello';
		sidebarBox.hidden = true;
		sidebarSplitter.hidden = true;

}


*/




