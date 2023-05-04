import config from "../config.js";
export default class MyFormulario extends HTMLElement{
    static url = import.meta.url
    static async components(){
        return await(await fetch(config.uri(MyFormulario.url))).text();
    }
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    handleEvent(e){
        (e.type === "submit") ? this.enviarWorker(e)
        : undefined;
    }
    enviarWorker(e){
        console.log(e);
        e.preventDefault()
    }
    connectedCallback(){
        Promise.resolve(MyFormulario.components()).then(html=>{
            this.shadowRoot.innerHTML = html;
            this.Myform = this.shadowRoot.querySelector("form");
            this.Myform.addEventListener("submit", this.handleEvent.bind(this))
        })
    }
}
console.log(config.name);
customElements.define(config.name(MyFormulario.url), MyFormulario);
