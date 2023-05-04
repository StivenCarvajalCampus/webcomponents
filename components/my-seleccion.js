import config from "../config.js";
export default class MySeleccion extends HTMLElement{
    static url = import.meta.url
    static async components(){
        return await(await fetch(config.uri(MySeleccion.url))).text();
    }
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    handleEvent(e){
        (e.type === "submit") ? this.enviarWorker(e)
        :undefined; 
    }
    enviarWorker(e){
        console.log(e);
        e.preventDefault()
    }
    connectedCallback(){
        Promise.resolve(MySeleccion.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.MybSeleccion = this.shadowRoot.querySelector("form");
            this.MybSeleccion.addEventListener("submit",this.handleEvent.bind(this))
        })
    }
}
console.log(config.name);
customElements.define(config.name(MySeleccion.url), MySeleccion);
