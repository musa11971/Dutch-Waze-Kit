let VanillaToasts = {
  autoincrement: 0,
  toasts: [],
  container: null,

  // Initialize library
  init() {
    // Toast container
    this.container = document.createElement('div');
    this.container.id = 'vanillatoasts-container';
    document.body.appendChild(this.container);
  },

  // Replace create method when DOM has finished loading
  create(options) {
      let toast = document.createElement('div');
      this.autoincrement++;
      toast.id = this.autoincrement;
      toast.id = 'toast-' + toast.id;
      toast.className = 'vanillatoasts-toast';

      // title
      if (options.title) {
        let h4 = document.createElement('h4');
        h4.className = 'vanillatoasts-title';
        h4.innerHTML = options.title;
        toast.appendChild(h4);
      }

      // text
      if (options.text) {
        var p = document.createElement('p');
        p.className = 'vanillatoasts-text';
        p.innerHTML = options.text;
        toast.appendChild(p);
      }

      // icon
      if (options.icon) {
        var img = document.createElement('img');
        img.src = options.icon;
        img.className = 'vanillatoasts-icon';
        toast.appendChild(img);
      }

      // position
      var position = options.positionClass;
      switch (position) {
        case 'topLeft':
          this.container.classList.add('toasts-top-left');
          break;
        case 'bottomLeft':
          this.container.classList.add('toasts-bottom-left');
          break;
        case 'bottomRight':
          this.container.classList.add('toasts-bottom-right');
          break;
        case 'topRight':
          this.container.classList.add('toasts-top-right');
          break;
        case 'topCenter':
          this.container.classList.add('toasts-top-center');
          break;
        case 'bottomCenter':
          this.container.classList.add('toasts-bottom-center');
          break;
        default:
          this.container.classList.add('toasts-top-right');
          break;
      }

      // click callback
      if (typeof options.callback === 'function') {
        toast.addEventListener('click', options.callback);
      }

      // toast api
      toast.hide = function () {
        toast.className += ' vanillatoasts-fadeOut';
        toast.addEventListener('animationend', removeToast, false);
      };

      // autohide
      if (options.timeout) {
        setTimeout(toast.hide, options.timeout);
      }

      if (options.type) {
        toast.className += ' vanillatoasts-' + options.type;
      }

      toast.addEventListener('click', toast.hide);


      function removeToast() {
        this.container.removeChild(toast);
        delete this.toasts[toast.id];  //remove toast from object
      }

      this.container.appendChild(toast);

      //add toast to object so its easily gettable by its id
      this.toasts[toast.id] = toast;

      return toast;
    }
};

VanillaToasts.init();
