// Ripple
document.addEventListener("click", ({ target, offsetX, offsetY, pointerType }) => {
    Array.from(target.children).forEach((child) => {
        if (child.classList.contains("piece-ripple")) {
            const { width, height } = target.getBoundingClientRect()
            const x = pointerType ? offsetX : width / 2
            const y = pointerType ? offsetY : height / 2

            const effect = document.createElement("span")
            effect.className = "piece-ripple-effect"
            effect.style.left = `${x}px`
            effect.style.top = `${y}px`
            effect.style.setProperty("--piece-scale", target.offsetWidth)
            
            child.appendChild(effect)
            effect.onanimationend = () => effect.remove()
        }
    });
});

//CREATE PIECES CSS
// Seleciona ou cria o elemento <style>
let style = document.querySelector("#dynamic-styles");
if (!style) {
    style = document.createElement("style");
    style.id = "dynamic-styles";
    document.head.appendChild(style);
}

// Array com as peças
const piece = [
    "&.property-color-000",
    "&.property-color-000-hover:hover",
    "&.piece-actived.property-color-000-active",
    "&.piece-actived.property-color-000-hover-active:hover",
    "&.property-color-000-active:has(.piece-controller:checked)",
    "&:has(.piece-controller:checked)>.piece-parent.property-color-000-active",
    "&.property-color-000-hover-active:has(.piece-controller:checked):hover",
    "&.piece-actived>.piece-parent.property-color-000-active",
    "&.piece-actived>.piece-parent.property-color-000-hover-active:hover",
];

const properties = [
    "background",
    "text",
    "border",
    "box-shadow",
    "ripple"
]

properties.forEach(property=>{
    // Gera as regras CSS dinamicamente e adiciona ao <style>
    for (let i = 0; i <= 100; i += 4) {
        const cssRule = `.piece-surface { ${piece.join(", ").replaceAll("property", property).replaceAll("000", String(i).padStart(3, "0"))} { --piece-${property}-color: calc(var(--theme) var(--theme-operator) ${100 - i}%); }}`
        style.appendChild(document.createTextNode(cssRule + "\n"))
    }
})

const piece_h = [
    "&.property-color-000",
    "&.property-color-000-hover:hover",
    "&.piece-actived.property-color-000-active",
    "&.piece-actived.property-color-000-hover-active:hover",
    "&.property-color-000-active:has(.piece-controller:checked)",
    "&:has(.piece-controller:checked)>.piece-parent.property-color-000-active",
    "&.property-color-000-hover-active:has(.piece-controller:checked):hover"
]

properties.forEach(property=>{
    // Gera as regras CSS dinamicamente e adiciona ao <style>
    const colors = ["primary","secondary","tertiary"]
    colors.forEach(color=>{
        const cssRule = `.piece-surface { ${piece.join(", ").replaceAll("property", property).replaceAll("000", color)} { --piece-${property}-color-h: var(--${color}); }}`
        style.appendChild(document.createTextNode(cssRule + "\n"))
    })
})

//importar a fonte de icones do Google
var googleIcons = document.createElement('style');
googleIcons.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
`
document.head.appendChild(googleIcons);

//função que transforma html em element
function create(html) {
    const template = document.createElement('template')
    html = html.trim()
    template.innerHTML = html
    return template.content
}

document.addEventListener('click', (event) => {
    const pieces_SearchElements = document.querySelectorAll('.piece-search')

    pieces_SearchElements.forEach(pieces_SearchElement => {
        const menu = pieces_SearchElement

        if(event.target === pieces_SearchElement || pieces_SearchElement.contains(event.target)) {
            // Se o clique ocorreu dentro de pieces-search
            menu.classList.add('piece-actived')

            if(event.target.classList.contains('close')) {
                pieces_SearchElement.querySelector('.bar input').value = ""
                document.body.click()
            }
            if(event.target.classList.contains('clear')) {
                pieces_SearchElement.querySelector('.bar input').value = ""
                pieces_SearchElement.querySelector('.bar input').focus()
            }
        } else {
            // Se o clique ocorreu fora de pieces_search
            menu.classList.remove('piece-actived')
        }
        
    })
})