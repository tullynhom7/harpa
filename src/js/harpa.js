const harpa = {}

harpa.pages = []

harpa.devMode = {
    get(){
        return JSON.parse(localStorage.harpa).devMode
    },
    set(){
        let LocalStorageHarpa = JSON.parse(localStorage.harpa)
        LocalStorageHarpa.devMode = !LocalStorageHarpa.devMode
        localStorage.harpa = JSON.stringify(LocalStorageHarpa)
    }
}

harpa.darkMode = {
    get(){
        return JSON.parse(localStorage.harpa).dark
    },
    set(){
        let LocalStorageHarpa = JSON.parse(localStorage.harpa)
        LocalStorageHarpa.dark = !LocalStorageHarpa.dark
        localStorage.harpa = JSON.stringify(LocalStorageHarpa)
    }
}
harpa.HUEMainColor = {
    get(){
        return JSON.parse(localStorage.harpa).HUEMainColor
    },
    set(value){
        let LocalStorageHarpa = JSON.parse(localStorage.harpa)
        LocalStorageHarpa.HUEMainColor = value
        localStorage.harpa = JSON.stringify(LocalStorageHarpa)
    }
}
harpa.paleta = {
    get(){
        return JSON.parse(localStorage.harpa).paleta
    },
    set(value){
        let LocalStorageHarpa = JSON.parse(localStorage.harpa)
        LocalStorageHarpa.paleta = value
        localStorage.harpa = JSON.stringify(LocalStorageHarpa)
    }
}
harpa.fontSize = {
    get(){
        return JSON.parse(localStorage.harpa).fontSize
    },
    set(value){
        let LocalStorageHarpa = JSON.parse(localStorage.harpa)
        LocalStorageHarpa.fontSize = value
        localStorage.harpa = JSON.stringify(LocalStorageHarpa)
    }
}
harpa.presentation = {
    get(){
        return JSON.parse(localStorage.harpa).presentation
    },
    set(value){
        let LocalStorageHarpa = JSON.parse(localStorage.harpa)
        LocalStorageHarpa.presentation = value
        localStorage.harpa = JSON.stringify(LocalStorageHarpa)
    }
}
harpa.favoritos = {
    get() {
        return JSON.parse(localStorage.harpa).favoritos
    },
    set(value){
        let LocalStorageHarpa = JSON.parse(localStorage.harpa)
        LocalStorageHarpa.favoritos = LocalStorageHarpa.favoritos.includes(value) ? LocalStorageHarpa.favoritos.filter(f=>f!=value) : [...LocalStorageHarpa.favoritos, value]
        localStorage.harpa = JSON.stringify(LocalStorageHarpa)
    }
}

harpa.mainApp = function(appName) {
    let LocalStorageHarpa = JSON.parse(localStorage.harpa)
    LocalStorageHarpa.mainApp = appName
    localStorage.harpa = JSON.stringify(LocalStorageHarpa)
}

function defineLocalStorage(){

    //se harpa n existe cria
    if(!!!localStorage.harpa) localStorage.harpa = JSON.stringify({})

    let LocalStorageHarpa = JSON.parse(localStorage.harpa)

    if(LocalStorageHarpa.apps == null) LocalStorageHarpa.apps = {}
    if(LocalStorageHarpa.dark == null) LocalStorageHarpa.dark = false
    if(LocalStorageHarpa.HUEMainColor == null) LocalStorageHarpa.HUEMainColor = 49
    if(LocalStorageHarpa.paleta == null) LocalStorageHarpa.paleta = "triade"
    if(LocalStorageHarpa.fontSize == null) LocalStorageHarpa.fontSize = 1
    if(LocalStorageHarpa.favoritos == null) LocalStorageHarpa.favoritos = []
    if(LocalStorageHarpa.presentation == null) LocalStorageHarpa.presentation = "null"
    if(LocalStorageHarpa.developerMode == null) LocalStorageHarpa.developerMode = false
    if(LocalStorageHarpa.mainApp == null) LocalStorageHarpa.mainApp = null

    return JSON.stringify(LocalStorageHarpa)
}

//Cria harpa no localStorage caso não exista
localStorage.harpa = defineLocalStorage()