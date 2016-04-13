(function(){angular.module("flickrPhotoStream",["ngTouch","ui.router","ngSanitize"])}).call(this),function(){angular.module("flickrPhotoStream").service("Flickr",["$log","$http",function(t,n){var i;i="https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK",this.publicPhotos=function(t){return n.jsonp(i).then(function(n){return n.data.items.map(function(t){return t.author=t.author.slice(19,-1),t.description=t.description.replace(/<p><.+?<\/p>/g,"").trim().slice(3,-5),t.tags=""===t.tags?[]:t.tags.split(" "),t}),t(n.data.items)})["catch"](function(n){return t([])})}}])}.call(this),function(){angular.module("flickrPhotoStream").controller("MainController",["Flickr",function(t){this.photos=[],this.loadDisabled=!1,this.clearMode=!1,t.publicPhotos(function(t){return function(n){return t.photos=n}}(this)),this.loadMore=function(n){return function(){return n.loadDisabled=!0,t.publicPhotos(function(t){return n.photos=_.uniq(n.photos.concat(t),function(t){return t.link}),n.loadDisabled=!1})}}(this)}])}.call(this),function(){angular.module("flickrPhotoStream").directive("lazyBg",function(){var t,n,i,e,o;return t={tolerance:500,detectElement:!0},i=[],e=null,n=function(t){return t.css("min-width")&&"0px"!==t.css("min-width")||t.css("min-width","1px"),t.css("min-height")&&"0px"!==t.css("min-height")?void 0:t.css("min-height","1px")},o=function(){return angular.forEach(i,function(n,e){var o;return n.isVisible()&&n.inViewport(t.tolerance)?(o=new Image,o.onload=function(){return n.css({"background-image":"url("+this.src+")"}),n.parent().css({opacity:1})},o.src=n.attr("lazy-bg"),i.splice(e,1)):void 0}),0===i.length?clearInterval(e):void 0},{restrict:"A",link:function(r,a,l){return t.detectElement&&n(a),i.push(a),clearInterval(e),e=setInterval(function(){return o()},50)}}}),angular.element.prototype.isVisible=function(){var t;return t=this[0],t.offsetWidth>0&&t.offsetHeight>0},angular.element.prototype.inViewport=function(t){var n,i;return n=this[0],i=n.getBoundingClientRect(),i.top>=0-t&&i.left>=0-t&&i.bottom<=(window.innerHeight||document.documentElement.clientHeight)+t&&i.right<=(window.innerWidth||document.documentElement.clientWidth)+t}}.call(this),function(){angular.module("flickrPhotoStream").directive("infiniteScroll",["$window","$timeout",function(t,n){return{scope:{callback:"&infiniteScroll",distance:"=infiniteScrollDistance",disabled:"=infiniteScrollDisabled"},link:function(i,e,o){var r;return r=e[0],angular.element(t).bind("scroll",function(){var o;return o=e[0].offsetHeight+e[0].offsetTop-t.innerHeight-t.pageYOffset,!i.disabled&&o<=t.innerHeight?n(i.callback):void 0})}}}])}.call(this),function(){angular.module("flickrPhotoStream").run(function(){})}.call(this),function(){angular.module("flickrPhotoStream").config(["$stateProvider","$urlRouterProvider",function(t,n){return t.state("main",{url:"/",templateUrl:"app/pages/main.html",controller:"MainController",controllerAs:"main"}),n.otherwise("/")}])}.call(this),function(){angular.module("flickrPhotoStream")}.call(this),function(){angular.module("flickrPhotoStream").config(["$logProvider",function(t){return t.debugEnabled(!0)}])}.call(this),angular.module("flickrPhotoStream").run(["$templateCache",function(t){t.put("app/pages/main.html",'<div class=main><header><h1>Flickr Photo Stream</h1><nav><input type=search ng-model=search placeholder=Search... class=search> <button ng-click="main.clearMode = !main.clearMode" ng-class="main.clearMode ? \'clear\' : \'default\'" class=toggle></button></nav></header><section infinite-scroll=main.loadMore() infinite-scroll-disabled=main.loadDisabled ng-class="{clear: main.clearMode}" class=photos><article ng-repeat="photo in main.photos | filter:search track by photo.link" class=photo><div lazy-bg={{::photo.media.m}} class=image></div><div class=details><a ng-href={{::photo.link}} ng-bind-html=::photo.title class=title></a><p class=author>by <a ng-href=https://www.flickr.com/photos/{{::photo.author_id}}/ ng-bind=::photo.author></a></p><p ng-bind-html=::photo.description class=description></p><div class=tags><div ng-repeat="tag in ::photo.tags | limitTo: 3" ng-bind=::tag class=tag></div><div ng-if="::photo.tags.length &gt; 3" class=tag-more>+{{::photo.tags.length - 3}}</div></div></div></article></section></div>')}]);