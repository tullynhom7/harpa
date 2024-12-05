//Ripple
document.addEventListener("click", function(event) {
    let target = event.target.children
    Array.from(target).forEach((c) => {
        if(c.classList.contains("pieces-ripple")){

            let x,y

            if(event.pointerType == "") {
                const a = event.target.getBoundingClientRect()
                x = a.width/2
                y = a.height/2
            }
            else {
                x = event.offsetX
                y = event.offsetY
            }

            
            const w = event.target.offsetWidth
            
            const effect = document.createElement("span")
            c.appendChild(effect)

            effect.className = 'pieces-ripple-effect'
            effect.style.left = x + 'px'
            effect.style.top  = y + 'px'
            effect.style.setProperty('--pieces-scale', w)
            
            effect.onanimationend = () => effect.remove()
        }
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