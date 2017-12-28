var script = document.createElement('script');

script.text = localStorage.getItem('scriptHooks');
script.onload = function() {
  this.parentNode.removeChild(this);
};

(document.head || document.documentElement).appendChild(script);
