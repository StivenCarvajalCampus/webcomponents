import config from "../config.js";

export default class MyAside extends HTMLElement{
    static url = import.meta.url
    static async components(){
        return await(await fetch(config.uri(MyAside.url))).text();
    }
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    }
    handleEvent (e){
        (e.type === "submit") ? this.enviarWorker (e)
        :undefined;
    }
    enviarWorker(e){
        console.log(e);
        e.preventDefault()
    }
    connectedCallback(){
        Promise.resolve(MyAside.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.MybAside = this.shadowRoot.querySelector("form");
            this.MybAside.addEventListener("submit", this.handleEvent.bind(this))

        })
    }
}
console.log(config.name);
customElements.define(config.name(MyAside.url), MyAside);
