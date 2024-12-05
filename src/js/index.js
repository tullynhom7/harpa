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
            pieces-button
            pieces-surface
            background-color-bg
            background-color-hover-to-bg
            text-color-to-bg
            background-color-mg-active
            background-color-hover-to-mg-active
            text-color-to-mg-active

            surface-text-color-secondary-active
            surface-background-color-secondary-active
            
            pieces-ripple-to-mg
            icon-filled-active
        ">
            <input id="nav-btn-${i}" type="radio" name="nav" value="${page.name}" class="surface-controller">
            <span class="material-symbols-rounded icon" translate="no">${page.icon}</span>
            <span class="label">${page.name}</span>
            <span class="pieces-ripple secondary"></span>
        </label>
    `
    document.querySelector(`#m-nav`).appendChild(tools.create(template))
})
document.querySelectorAll("#m-nav input").forEach(input=>{
    input.addEventListener('click', ()=> {
        harpa.pages.filter(page=>page.name==input.value)[0].main()
    })
})
document.querySelector('#m-nav .pieces-button').click()

document.addEventListener("click", (event)=>{
    if(event.target.classList.contains("presentation")) harpa.presentation.set(event.target.innerHTML)
})