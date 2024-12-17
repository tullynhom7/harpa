harpa.pages.push({
    name: 'Configurações',
    icon: 'settings',
    showInNavigation: true,
    main() {
        //m-header
        document.querySelector('#m-header #titulo h2').innerText = this.name
        //m-main
        const mMain = document.querySelector(`#m-main`)
        mMain.innerHTML = `
            <section id="page-config" class="piece-surface"></section>
        `

        const mAside = document.querySelector(`#m-aside`)
        //inserir m-layout da pagina
        mAside.innerHTML = /*html*/``

        this.hslslider("#page-config")
        this.tema("#page-config")
        this.paletas("#page-config")
        this.font_size("#page-config")
    },
    hslslider(id, seth){

        let templateFragment = /*html*/`
            <style>
                #page-config>#main-color {
                    border-radius: 16px;
                    padding: 16px;
                    h1 {font-size:20px;font-weight:900;}
                    #colorpicker1 {
                        width: min-content;
                        justify-self: center;
                    }

                    #sContainer {
                        width: 200px;
                        height: 200px;
                        position: relative;
                        margin: auto;
                        display: grid;
                        place-content: center;
                    }

                    #sValue {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        font-weight: 900;
                        user-select: none;
                    }
                }
            </style>
            <div id="main-color" class="piece-surface background-color-088 text-color-012">
                <h1>Cor Principal</h1>
                <div id="sContainer">
                    <canvas id="slider" width="200" height="200"></canvas>
                <div id="sValue"></div>
            </div>  
        `
        document.querySelector(id).appendChild(tools.create(templateFragment))

        const canvas = document.getElementById('slider');
        const ctx = canvas.getContext('2d');
        const val = document.getElementById('sValue');
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        const r = 80;
        // let a = -Math.PI / 2; // Inicia no topo do círculo
        setAngle(harpa.HUEMainColor.get());
        drawFn();
        valFn();

        // Adicionando event listeners para mouse
        canvas.addEventListener('mousedown', dragStharpa);
        canvas.addEventListener('mousemove', drag);
        canvas.addEventListener('mouseup', dragEnd);
        canvas.addEventListener('mouseleave', dragEnd);

        // Adicionando event listeners para toque
        canvas.addEventListener('touchstharpa', dragStharpa);
        canvas.addEventListener('touchmove', drag);
        canvas.addEventListener('touchend', dragEnd);
        canvas.addEventListener('touchcancel', dragEnd);

        // Função para definir o ângulo inicial em graus (de 0 a 360)
        function setAngle(degrees) {
            // Converter graus para radianos e ajustar para o topo do círculo
            const radians = (degrees - 90) * Math.PI / 180;
            // Ajustar o ângulo 'a' para o valor convertido
            a = radians;
            // Redesenhar o seletor e atualizar o valor exibido
            drawFn();
            valFn();
        }

        function drawFn() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Criar um gradiente cônico do vermelho ao violeta e voltando ao vermelho
            const gradient = ctx.createConicGradient(-Math.PI / 2, x, y);
            gradient.addColorStop(0, '#f00');
            gradient.addColorStop(1 / 6, '#ff0');
            gradient.addColorStop(2 / 6, '#0f0');
            gradient.addColorStop(3 / 6, '#0ff');
            gradient.addColorStop(4 / 6, '#00f');
            gradient.addColorStop(5 / 6, '#f0f');
            gradient.addColorStop(1, '#f00');
            
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 20;
            ctx.stroke();

            // Calcular posição do seletor baseado no ângulo atual 'a'
            const handleX = x + Math.cos(a) * r;
            const handleY = y + Math.sin(a) * r;

            ctx.beginPath();
            ctx.arc(handleX, handleY, 8, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        }

        function valFn() {
            let degrees = (a + Math.PI / 2) * 180 / Math.PI;
            if (degrees < 0) degrees += 360;
            degrees = Math.round(degrees);
            val.textContent = `${degrees}`;

            let h = degrees

            localStorage.quiverExtentionColor = h
            document.querySelector("html").style.setProperty('--main-color', h)
            document.querySelector("html").style.setProperty('--main-color-deg', -h+"deg")
            harpa.HUEMainColor.set(h)
        }

        let isDragging = false;

        function dragStharpa(e) {
            isDragging = true;
            drag(e);
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            a = Math.atan2(clientY - rect.top - y, clientX - rect.left - x);
            drawFn();
            valFn();
        }

        function dragEnd() {
            isDragging = false;
        }

        if(!seth) seth = 240

        // Exemplo: definir o ângulo inicial para 180 graus ao carregar a página
        setAngle(harpa.HUEMainColor.get());
    },
    tema(id) {
        let templateFragment = /*html*/`
            <style>
                #page-config>#tema {
                    display: grid;
                    border-radius: 16px;
                    padding: 16px;
                    gap: 16px;
                    grid-template-rows: auto 1fr;
                    h1 {font-size:20px;font-weight:900;}
                    #tgg-mm {
                        place-self: center;
                        height:40px;
                        border-radius: 40px;
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        padding:4px;
                        gap: 4px;
                        cursor: var(--cursor-pointer);
                        & *:active {pointer-events: none;}
                        & .label {
                            display: grid;
                            place-content: center;
                            border-radius: 40px;
                            font-weight: 700;
                            font-size: 14px;
                            z-index: 1;
                            padding: 0 16px;
                            text-wrap: nowrap;
                        }
                        & input {display: none;}
                        .active-indicator {
                            border-radius: 40px;
                            position: absolute;
                            width: calc(50% - 8px);
                            height: calc(100% - 8px);
                            top: 4px;
                            left: 4px;
                            transition: left .3s;
                            z-index: 1;
                        }
                        &:has(input:checked) {
                            .active-indicator {
                                left: calc(50% + 4px);
                            }
                        }
                    }
                }
            </style>
            <div id="tema" class="piece-surface background-color-088 text-color-012">
                <h1>Tema</h1>
                <label id="tgg-mm" class="
                    piece-surface

                    background-color-080
                    background-color-076-hover
                    
                    ripple-color-048
                ">
                    <span class="piece-ripple"></span>
                    <input type="checkbox" name="tema" class="piece-controller">
                    <!-- <span class="piece-surface surface-parent background-color-bg active-indicator"></span> -->
                    <span class="
                        piece-surface
                        surface-parent
                        label
                        background-color-096
                        background-color-080-active
                        background-color-092-hover
                        background-color-076-hover-active
                        text-color-048
                        text-color-024-active
                    ">Claro</span>
                    <span class="
                        piece-surface
                        surface-parent
                        label
                        background-color-080
                        background-color-096-active
                        background-color-076-hover
                        background-color-092-hover-active
                        text-color-024
                        text-color-048-active
                    ">Escuro</span>
                </label>
            </div>
        `
        document.querySelector(id).appendChild(tools.create(templateFragment))
        let tema = document.querySelector('#page-config #tema input')
        if(harpa.darkMode.get()) tema.setAttribute('checked', true)
            document.querySelector("#page-config #tema input").addEventListener('click', (e)=>{
            let body = document.body
            let isDark = body.classList.contains('dark')
            if (isDark) {
                body.classList.remove('dark')
                body.classList.add('light')
            } else {
                body.classList.remove('light')
                body.classList.add('dark')
            }
            harpa.darkMode.set()
        })
    },
    paletas(id){
        let templateFragment = /*html*/`
            <style>
                #page-config {
                    #paletas {
                        display: grid;
                        gap: 16px;
                        border-radius: 16px;
                        padding: 16px;
                        grid-template-rows: auto 1fr;
                        h1 {font-size:20px;font-weight:900;}
                        &>div {
                            display: grid;
                            place-content: center;
                            grid-auto-flow: column;
                            gap: 16px;
                        }
                        .option {
                            width: 5rem;
                            height: 8.75rem;
                            border-radius: 8px;
                            border-style: solid;
                            border-width: 1px;
                            
                            display: grid;
                            grid-template-rows: auto 1fr;
                            text-decoration: none;
                            user-select: none;
                            box-sizing: border-box;
                            cursor: var(--cursor-pointer);

                            input {display:none;}

                            .colors {
                                display: grid;
                                border-radius: 8px;
                                margin: 4px;
                                width: calc(80px - 10px);
                                aspect-ratio: 1/1;
                                position: relative;
                                overflow: hidden;

                                &>span:not(.piece-icon) {
                                    width: calc(80px - 10px);
                                    aspect-ratio: 1/1;
                                    display: grid;
                                    position: absolute;
                                    &:nth-child(1) {top: 0px;}
                                    &:nth-child(2) {
                                        bottom: -35px;
                                        left: -35px;
                                    }
                                    &:nth-child(3) {
                                        bottom: -35px;
                                        right: -35px;
                                    }
                                }
                            }

                            &>.label {
                                font-size: 12px;
                                font-weight: 500;
                                display: grid;
                                place-items: center;
                                overflow: hidden;
                                text-align: center;
                                pointer-events: none;
                            }

                            .piece-icon {
                                border-radius: 100%;
                                padding: 8px;
                                width: min-content;
                                height: min-content;
                                display: block;
                                opacity: 0;
                                place-self: center;
                            }
                            &:has(input:checked) .piece-icon {opacity: 1;}
                        }
                    }
                }
            </style>
            <section id="paletas" class="piece-surface background-color-088 text-color-012">
                <h1>Paleta</h1>
                <div>
                    <label class="analoga option piece-surface ripple-color-048 border-color-064">
                        <div class="colors">
                            <span class="piece-surface background-color-080 primary"></span>
                            <span class="piece-surface background-color-080 secondary"></span>
                            <span class="piece-surface background-color-080 tertiary"></span>
                            <span class="material-symbols-rounded piece-icon piece-surface background-color-080 text-color-020 inverse" translate="no">done</span>
                        </div>
                        <span class="label">analoga</span>
                        <input class="piece-controller" type="radio" name="paleta" value="analoga"/>
                        <span class="piece-ripple"></span>
                    </label>

                    <label class="triade option piece-surface ripple-color-048 border-color-064">
                        <div class="colors">
                            <span class="piece-surface background-color-080 primary"></span>
                            <span class="piece-surface background-color-080 secondary"></span>
                            <span class="piece-surface background-color-080 tertiary"></span>
                            <span class="material-symbols-rounded piece-icon piece-surface background-color-080 text-color-020 inverse" translate="no">done</span>
                        </div>
                        <span class="label">triade</span>
                        <input class="piece-controller" type="radio" name="paleta" value="triade"/>
                        <span class="piece-ripple"></span>
                    </label>

                    <label class="complementar option piece-surface ripple-color-048 border-color-064">
                        <div class="colors">
                            <span class="piece-surface background-color-080 primary"></span>
                            <span class="piece-surface background-color-080 secondary"></span>
                            <span class="piece-surface background-color-080 tertiary"></span>
                            <span class="material-symbols-rounded piece-icon piece-surface background-color-080 text-color-020 inverse" translate="no">done</span>
                        </div>
                        <span class="label">complementar</span>
                        <input class="piece-controller" type="radio" name="paleta" value="complementar"/>
                        <span class="piece-ripple"></span>
                    </label>
                </div>
            </section>
        `
        document.querySelector(id).appendChild(tools.create(templateFragment))
        document.querySelector(`#paletas input[value="${harpa.paleta.get()}"]`).setAttribute('checked', true)
        let paletas = document.querySelectorAll("#paletas input")
        paletas.forEach(paleta=>{
            paleta.addEventListener('click', ()=>{
                const body = document.body.classList
                Array.from(paletas)
                .map(value => value.value)
                .forEach(p=>{
                    if(body.contains(p)) body.remove(p)
                })
                body.add(paleta.value)
                harpa.paleta.set(paleta.value)
            })
        })
    },
    font_size(id) {
        let templateFragment = /*html*/`
            <style>
                .piece-segmented-button {
                    label {
                        cursor: var(--cursor-pointer);
                        padding: 8px 16px;
                        border-style: solid;
                        border-width: 1px;
                        &:not(:last-of-type){margin-right: -1px;}
                        &:first-of-type { border-radius: 40px 0 0 40px; padding-left: 24px;}
                        &:last-of-type { border-radius: 0 40px 40px 0; padding-right: 24px;}
                        .label {font-weight: 500; text-align: center;}
                        * {pointer-events: none;}
                    }
                    input {display: none;}
                }
            </style>
            <div id="tema" class="piece-surface background-color-088 text-color-012">
                <h1>Tamanho da fonte</h1>
                <div id="font-size" style="display:flex;" class="piece-segmented-button" class="piece-surface background-color-mg"></div>
            </div>
        `
        document.querySelector(id).appendChild(tools.create(templateFragment))

        const sizes = [16,20,24,28,32].forEach((size, i)=>{
                    
            const template = `
                <label class="
                    piece-surface
                    background-color-088
                    background-color-084-hover
                    background-color-048-active
                    text-color-100-active
                    background-color-044-hover-active
                    border-color-080
                    ripple-color-100
                ">
                    <input class="piece-controller" type="radio" name="font-size" value="${i+1}">
                    <span class="label">${size}</span>
                    <span class="piece-ripple"></span>
                </label>
            `
            document.querySelector("#font-size").appendChild(tools.create(template))
        })



        document.querySelectorAll('#font-size input')[harpa.fontSize.get()-1].click()
        document.querySelectorAll('#font-size input').forEach(input=>{
        input.addEventListener('input', ()=>{
                document.querySelector("html").style.setProperty('--font-size', input.value)
                harpa.fontSize.set(input.value)
            })
        })
    }
})