//Define o tema claro ou escuro
if(localStorage.harpa) {
    if(harpa.darkMode.get()) document.body.classList.add("dark")
    else document.body.classList.add("light")
}

//Define o Hue
document.querySelector("html").style.setProperty('--main-color', harpa.HUEMainColor.get())
//Define o paleta
document.body.classList.add(harpa.paleta.get())
//define font size
document.querySelector("html").style.setProperty('--font-size', harpa.fontSize.get())

// Fill m-nav
harpa.pages
.filter(page=>page.showInNavigation)
.forEach((page, i)=>{
    const template = /*html*/`
        <label class="
            card-list
            piece-nav-button
            piece-surface
            background-color-096
            background-color-092-hover
            text-color-004
            background-color-088-active
            background-color-084-hover-active
            text-color-012-active

            background-color-secondary-active
            text-color-secondary-active
            
            ripple-color-048
            piece-icon-active
        ">
            <input id="nav-btn-${i}" type="radio" name="nav" value="${page.name}" class="piece-controller">
            <span class="material-symbols-rounded piece-icon" translate="no">${page.icon}</span>
            <span class="piece-label">${page.name}</span>
            <span class="piece-ripple secondary"></span>
        </label>
    `
    document.querySelector(`#m-nav`).appendChild(tools.create(template))
})
document.querySelectorAll("#m-nav input").forEach(input=>{
    input.addEventListener('click', ()=> {
        harpa.pages.filter(page=>page.name==input.value)[0].main()
    })
})
document.querySelector('#m-nav .piece-nav-button').click()

document.addEventListener("click", (event)=>{
    if(event.target.classList.contains("presentation")) harpa.presentation.set(event.target.innerHTML)
})