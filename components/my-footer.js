import config from "../config.js";

export default class MyFooter extends HTMLElement{
    static url = import.meta.url
    static async components(){
        return await(await fetch(config.uri(MyFooter.url))).text();
    }
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    
    }
    handleEvent(e){
        (e.type ==="submit") ? this.enviarWorker(e)
        :undefined;
    }
    enviarWorker(e){
        console.log(e)
        e.preventDefault()
    }
    connectedCallback(){
        Promise.resolve(MyFooter.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.MybFooter = this.shadowRoot.querySelector("form");
            this.MybFooter.addEventListener("submit",this.handleEvent.bind(this))
        })
    }
}
console.log(config.name);
customElements.define(config.name(MyFooter.url), MyFooter);
