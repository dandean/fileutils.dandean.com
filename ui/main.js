/**
 *  $(id) -> Element
 *  Fault-tolerant alias of document.getElementById
**/
function $(id) {
  if (id instanceof Document || id instanceof HTMLElement) {
    return id;
  }
  return document.getElementById(id);
}

/**
 *  $$(selector) -> NodeList
 *  Alias document.querySelectorAll
**/
function $$(selector) {
  return document.querySelectorAll(selector);
}

/**
 *  Custom event module
**/
var Event = {
  on: function(element, event, handler) {
    element.addEventListener(event, handler, false);
  },

  /**
   *  Event.stop(event) -> undefined
   *  Stops the specified event from bubbling and propogating
  **/
  stop: function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();      
    }
  }
};

/**
 *  Array#random() -> Object
 *  Returns a random item from the array instance;
**/
Array.prototype.random = function() {
  if (!this.length) return;
  return this[Math.floor(Math.random() * this.length)];
};

/**
 *  Math.random() -> Number
 *  Math.random(max) -> Number
 *  Math.random(min, max) -> Number
 *
 *  Overloads Math.random so it can return a number up to `max` or a number
 *  between `min` and `max`.
**/
Math.random = (function() {
  var random = Math.random;
  
  return function(low, high) {
    var value = random();
    
    if (arguments.length == 0) {
      return value;
    }
    
    low = (typeof low == "undefined") ? 0 : low ;
    high = (typeof high == "undefined") ? 0 : high ;
    
    var lower = Math.min(low, high);
    var higher = Math.max(low, high);
    
    return ((higher - lower) * value) + lower;
  };
})();

/**
 * The Application Class
**/
function Application() {
  var types = ["document", "folder"];
  var imgPath = "ui/img/";

  for (var i=0; i<30; i++) {
    var name = (i == 25) ? "trash" : types.random();
    document.body.appendChild(createIcon(name, true));
  }
  
  var main = createIcon("fileutils");
  main.removeAttribute("style");
  main.className = "main";
  $("page").appendChild(main);
  
  setTimeout(function() {
    var imgs = $$("img.icon");
    for (var i=0; i<imgs.length; i++) {
      imgs[i].style.webkitTransform = "scale(" + Math.random(0.25, 0.75) + ")";
    }
  }, 1);
  
  function createIcon(name, position) {
    var img = document.createElement("img");
    img.width = 512;
    img.height = 512;
    img.src = imgPath + "/" + img.width + "/" + name + ".png";
    img.className = "icon";
    if (position) {
      img.style.left = Math.random(-256, window.innerWidth) + "px";
      img.style.top = Math.random(-256, window.innerHeight) + "px";
    }
    return img;
  }
  
  function scaleIcon(icon, scale) {
    icon.style.webkitTransform = "scale(" + scale + ")";
  }
}

/**
 * Application.run -> undefined
 * Runs the application;
**/
Application.run = function() {
  new Application();
};

Event.on(document, "DOMContentLoaded", Application.run);