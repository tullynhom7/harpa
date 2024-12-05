harpa.pages.push({
    name: 'Favorito',
    icon: 'favorite',
    showInNavigation: true,
    main() {
        //m-header
        document.querySelector('#m-header #titulo h2').innerText = this.name
        //m-main
        const mMain = document.querySelector(`#m-main`)
        //inserir m-layout da pagina
        mMain.innerHTML = /*html*/`
            <section id="page-favorite" class="pieces-surface background-color-fg pieces-ripple-to-accent"></section>
        `

        const mAside = document.querySelector(`#m-aside`)
        //inserir m-layout da pagina
        mAside.innerHTML = /*html*/`
            <style>
                #empty {
                    display: grid;
                    gap: 16px;
                    place-self: center;
                    place-items: center;
                    .icon {
                        font-size: 48px;
                        width: 100px;
                        height: 100px;
                        aspect-ratio: 1 / 1;
                        border-radius: 100px;
                        display: grid;
                        place-content: center;
                    }
                }
            </style>
            <div id="empty">
                <span class="material-symbols-rounded icon pieces-surface background-color-fg text-color-to-fg" translate="no">fmd_bad</span>
                <span class="label">Nenhuma letra favorita selecionada!</span>
            </div>
        `

        //fragmento das letras
        const fragment = document.createDocumentFragment()
        db
        .filter(({numero})=>harpa.favoritos.get().includes(+numero))
        .forEach(({nome, numero, letra}) => {
            let card = `
                <button 
                    popovertarget="popover-modal"
                    name="hino"
                    value="${numero}"
                    class="
                        card-list
                        pieces-surface
                        background-color-bg
                        background-color-hover-to-bg
                        pieces-ripple-to-bg
                    "
                >
                    <span class="numero pieces-surface background-color-mg text-color-to-mg tertiary">${numero}</span>
                    <span class="nome">${nome}</span>
                    <span class="letra pieces-surface background-color-mg text-color-to-mg secondary">
                        <p>${letra.split("#")[0].replace(/^\d+/,"").split("@").join("</p><p>")}</p>
                    </span>
                    <span class="pieces-pieces-ripple"></span>
                </button>
            `
            fragment.appendChild(tools.create(card))
        })
        document.querySelector(`#page-favorite`).appendChild(fragment)

        //adicionar função de carregar letra ao clicar no botão
        document.querySelectorAll(`.card-list`).forEach(button=>button.addEventListener('click', ()=>{
            this.showLyric(button.value)
            mAside.classList.add('display-grid')
        }))
    },
    showLyric(numero_do_hino) {

        console.log('showLyric')

        //obter dados da musica pelo numero
        let { nome, numero, letra } = db.filter(f=>f.numero==numero_do_hino)[0]

        let favorito = harpa.favoritos.get(+numero).includes(+numero) ? 'accent' : 'toned'

        //cria o m-layout da pagina de letras
        document.querySelector("#popover-modal")
        const mAside = document.querySelector(`#m-aside`)
        mAside.innerHTML = `
            <section id="popover-letra" class="pieces-surface bg">
                <header>
                    <span class="numero pieces-surface background-color-mg text-color-to-mg tertiary">${numero}</span>
                    <span class="nome">${nome}</span>
                    <button id="close" popovertarget="popover-modal" class="pieces-button pieces-surface background-color-mg text-color-to-mg background-color-hover-to-mg secondary">
                        <span class="material-symbols-rounded icon" translate="no">close</span>
                        <span class="pieces-ripple"></span>
                    </button>
                </header>
                <main></main>
                <footer>
                    <button id="prev" class="pieces-button pieces-surface background-color-mg text-color-to-mg background-color-hover-to-mg">
                        <span class="material-symbols-rounded icon" translate="no">arrow_left_alt</span>
                        <span class="pieces-ripple"></span>
                    </button>
                    <button id="fav" class="
                        pieces-FAB
                        pieces-surface
                        background-color-fg
                        background-color-hover-to-fg
                        text-color-to-fg
                        ripple-to-fg
                        ${favorito}
                    ">
                        <span class="material-symbols-rounded icon" translate="no">favorite</span>
                        <span class="pieces-ripple"></span>
                    </button>
                    <button id="next" class="pieces-button pieces-surface background-color-mg text-color-to-mg background-color-hover-to-mg">
                        <span class="material-symbols-rounded icon" translate="no">arrow_right_alt</span>
                        <span class="pieces-ripple"></span>
                    </button>
                </footer>
            </section>
        `

        document.querySelector('#popover-letra #close').addEventListener('click', ()=>document.querySelector('#m-aside').classList.remove('display-grid'))

        //remover ultimo verso que contem informações desnecessarias
        let versos = letra.split("#").filter((verso) => !verso.includes("Autor ou Tradutor:"))

        const fragment = document.createDocumentFragment()
        for (let i = 0; i < versos.length; i++) {

            // Verificar se o verso não começa com número
            if (/^\d+/.test(versos[i])) {

                let template = `
                    <div class='pieces-surface bg card presentation'>
                        <p class='pieces-surface background-color-mg text-color-to-mg '>${versos[i].replace(/^\d+/,"").replace("@","").split("@").join("</p><p class='pieces-surface background-color-mg text-color-to-mg '>")}</p>
                    </div>
                `

                //adiciona verso que repete
                if(versos.filter(v=>!/^\d+/.test(v))[0]) {
                    template += `
                        <div>
                            <p class='pieces-surface background-color-mg text-color-to-mg tertiary'>${versos.filter(v=>!/^\d+/.test(v))[0].split("@").join("</p><p class='pieces-surface background-color-mg text-color-to-mg tertiary'>")}</p>
                        </div>
                    `
                }
                fragment.appendChild(tools.create(template))
            }
        }
        document.querySelector("#popover-letra>main").appendChild(fragment)

        //BOTÃO PARA PASSAR MUSICA
        document.querySelector('#next').addEventListener('click', (event)=> {
            let f = harpa.favoritos.get()
            let curr = parseInt(document.querySelector("#popover-letra .numero").innerText)
            this.showLyric(f[f.indexOf(curr)+1])
        })
        //BOTÃO PARA VOLTAR MUSICA
        document.querySelector('#prev').addEventListener('click', (event)=> {
            let f = harpa.favoritos.get()
            let curr = parseInt(document.querySelector("#popover-letra .numero").innerText)
            this.showLyric(f[f.indexOf(curr)-1])
        })
        document.querySelector('#fav').addEventListener('click', (event)=> {
            harpa.favoritos.set(+document.querySelector("#popover-letra .numero").innerText)
            event.target.classList.toggle('toned')
            event.target.classList.toggle('accent')
            // this.main()
        })

    }
})