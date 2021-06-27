let CreationObserver = () => {
    return {
        elementQuerySelector: null,
        observer: null,
        created: false,

        forElement(elementQuerySelector, onStatusChange) {
            this.elementQuerySelector = elementQuerySelector;

            this.created = document.contains(document.querySelector(this.elementQuerySelector));
            onStatusChange(this.created);

            this.observer = new MutationObserver(() => {
                if(document.contains(document.querySelector(this.elementQuerySelector))) {
                    if(this.created) return;

                    this.created = true;
                    onStatusChange(this.created);
                }
                else {
                    if(!this.created) return;

                    this.created = false;
                    onStatusChange(this.created);
                }
            });

            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            return this.observer;
        }
    };
};

