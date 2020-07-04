/**
 * HSModal Class
 */
class HSModal extends HTMLDivElement {
    /**
     * Constructor
     *
     * @param openTrigger The element that will trigger opening the modal.
     * @param options Options that will override defaults.
     */
    constructor(openTrigger, options) {
        super();
        /**
     * Configuration options.
         *
     * Merge any user defined options into default config.
         */
        this.config = Object.assign({
            backgroundColor: "",
            modalTitle: "This is a modal!",
            modalText: "Default description text for modal.",
            onBefore: null,
            onAfter: null
        }, options);
        // Define new element
        customElements.define('hs-modal', HTMLHsModalElement, { extends: 'div' });
        // Bind callback functions to the HSModal.
        this.config.onBefore = this.config.onBefore.bind(this);
        this.config.onAfter = this.config.onAfter.bind(this);
        // Set open trigger.
        this.openTrigger = openTrigger;
        // Set modal events.
        this.bindEvents();
    }
    // Bind events.
    bindEvents() {
        this.openTrigger.addEventListener("click", this.open.bind(this));
    }
    // Open the modal.
    open() {
        this.render();
        // Cache DOM.
        this.modalDiv = document.getElementById("hs-modal");
        this.myModalContent = document.querySelector(".hs-modal-content");
        // Bind close event.
        this.modalDiv.addEventListener("click", this.close.bind(this));
        // Call onBefore if it is defined.
        if (this.config.onBefore) {
            this.config.onBefore();
        }
        // Add classes.
        this.modalDiv.classList.add("opened");
        this.myModalContent.classList.add("animate-in");
        // Remove animate class.
        setTimeout(() => {
            this.myModalContent.classList.remove("animate-in");
        }, 600);
    }
    // Close the modal.
    close(e) {
        // If we click the close button.
        if (e.target.id === "close" && e.type === "click") {
            this.myModalContent.classList.add("animate-out");
            // Remove classes.
            setTimeout(() => {
                // Remove classes.
                this.myModalContent.classList.remove("animate-out");
                this.modalDiv.classList.remove("opened");
                // Remove <div> from the DOM.
                this.containerDiv.parentNode.removeChild(this.containerDiv);
                // If onAfter is defined then call it.
                if (this.config.onAfter) {
                    this.config.onAfter();
                }
            }, 600);
        }
        return false;
    }
    // Render the modal.
    render() {
        // Set the template.
        const html = this.htmlTemplate();
        // Create a document fragment.
        // const docFrag = document.createDocumentFragment();
        // Create a <div> on the fly.
        this.containerDiv = document.createElement("div");
        // Set the HTML of the <div> to the HTML template.
        this.containerDiv.innerHTML = html;
        // Append the modal HTML to the body.
        document.body.appendChild(this.containerDiv);
    }
    // HSModal HTML template.
    htmlTemplate() {
        return `
			<div id="hs-modal" class="hs-modal" style="background-color:${this.config.backgroundColor}";>
				
				<div class="hs-modal-content">
					<button id="close">X</button>
					<h1>${this.config.modalTitle}!</h1>
					<p>${this.config.modalText}</p>
				</div>

			</div>
		`;
    }
}
const modalOneTrigger = document.getElementById("open-modal-1");
const modalTwoTrigger = document.getElementById("open-modal-2");
const header = document.getElementsByTagName("header");
new HSModal(modalOneTrigger, {
    modalTitle: "Overriding the Title!",
    onAfter: function () {
        // Let's remove a class to the header!
        header[0].classList.remove("is-open");
    },
    onBefore: function () {
        // Let's remove a class to the header!
        header[0].classList.add("is-open");
    }
});
new HSModal(modalTwoTrigger, {
    modalTitle: "This is modal two!",
    onAfter: function () {
        // Set the background back to the original.
        let afterContainer = document.querySelector(".container");
        afterContainer.style.background = "";
    },
    onBefore: function () {
        // Change the background color of the container!
        let beforeContainer = document.querySelector(".container");
        beforeContainer.style.background = "#88C542";
    }
});
