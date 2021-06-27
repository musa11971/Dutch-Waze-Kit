let ClassObserver = () => {
    return {
        observer: null,
        element: null,
        className: null,
        classPresent: false,

        forElement(element, className, onStatusChange) {
            this.element = element;
            this.className = className;

            this.classPresent = element.classList.contains(this.className);
            onStatusChange(this.classPresent);

            this.observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if(mutation.target.classList.contains(this.className)) {
                            if(this.classPresent) return;

                            this.classPresent = true;
                            onStatusChange(this.classPresent);
                        }
                        else {
                            this.classPresent = false;
                            onStatusChange(this.classPresent);
                        }
                    }
                });
            });

            this.observer.observe(this.element, { attributes: true });

            return this.observer;
        }
    };
};

