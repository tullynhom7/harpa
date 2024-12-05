const tools = {}

//função que transforma string em html element
tools.create = function(html) {
    const template = document.createElement('template')
    html = html.trim()
    template.innerHTML = html
    return template.content
}

//Exportar dados em Excel
tools.exportExel = function(json) {
    const wb = XLSX.utils.book_new();
    for (const aba of json.abas) {
        const ws = XLSX.utils.json_to_sheet(aba.dados);
        XLSX.utils.book_append_sheet(wb, ws, aba.nome);
    }
    XLSX.writeFile(wb, `${json.arquivo}.xlsx`);
}

tools.exportExel.sample = function(){
    let model = `
        let dbPF = [
            {"nome": "Artur", "tipo": "PF"},
            {"nome": "Alemo", "tipo": "PF"}
        ]
        let dbPJ = [
            {"nome": "Art", "tipo": "PJ"},
            {"nome": "Tools", "tipo": "PJ"}
        ]

        let relatorio = {
            arquivo: "Relatorio",
            abas: [
                {nome: "PF", dados: dbPF},
                {nome: "PJ", dados: dbPJ}
            ]
        }

        tools.exportExel(relatorio)
    `
    console.log(model)
}

tools.random = {}
//Retorna um número aleatório entre 2 números
tools.random.between = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}
//Retorna um valor aleatório de um array
tools.random.from = function(array) {
    const randomIndex = this.between(0, array.length - 1)
    return array[randomIndex]
}

// tools.exporImage = function(json) {
//     //Obtém o elemento a ser capturado
//     const element = document.querySelector(json)

//     var width = element.offsetWidth;
//     var height = element.offsetHeight;

//     // Cria um canvas temporário
//     var canvas = document.createElement('canvas');
//     canvas.width = width*4;
//     canvas.height = height*4;

//     // Captura a div para o canvas
//     html2canvas(element, { canvas: canvas, allowTaint: true, scale: 4 })
//     .then(function (canvas) {
//         // Converte o canvas para uma imagem
//         var img = new Image();
        
//         img.src = canvas.toDataURL('image/png');

//         // Cria um link para download
//         var link = document.createElement('a');
//         link.href = img.src;
//         link.download = 'imagem.png';

//         // Dispara o evento de clique no link
//         link.click();
//     });

// }

tools.exportPDF = function(config) {

    //Configurações
    let quality = config.quality ? config.quality : 4
    let FileName = config.FileName ? config.FileName : "fileName.pdf"

    // Obtém o elemento a ser capturado
    const element = document.querySelector(config.id);

    var width = element.offsetWidth;
    var height = element.offsetHeight;

    // Cria um canvas temporário
    var canvas = document.createElement('canvas');
    canvas.width = width * quality;
    canvas.height = height * quality;

    // Captura a div para o canvas
    html2canvas(element, { canvas: canvas, allowTaint: true, scale: quality })
    .then(function (canvas) {
        // Converte o canvas para uma imagem
        var img = new Image();
        img.src = canvas.toDataURL('image/png');

        // Cria uma nova div para exibir a imagem no corpo do documento
        var imageDiv = document.createElement('div');
        imageDiv.id = "deleteme"
        imageDiv.style = "width: 100% !important; height: 100% !important; page-break-after: always !important;"
            img.id = "pedeefi"
            img.style = "position: absolute;"
        imageDiv.appendChild(img)

        // Adicione a nova div ao corpo do documento

        let existe = document.querySelector("#deleteme")

        if(existe) existe.remove()

        document.body.appendChild(imageDiv);

        let content = document.querySelector(`#pedeefi`)

            var opt = {
                margin: .05,
                filename: FileName,
                image: {
                    type: 'png',
                    quality: 99
                },
                html2canvas: {
                    scale: 1
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                }
            }
            
            html2pdf().from(content).set(opt).toPdf().get('pdf').then(function (pdf) {
            
                    let width = pdf.internal.pageSize.getWidth()
                    let height = pdf.internal.pageSize.getHeight()
            
                    let widthRatio = width / content.width
            
                    pdf.addImage(content, "png", 5, 0, width - 10, height - 10);
            
                })
                .save();
    });
}


tools.tableToJson = function (selector) {
    const table = document.querySelector(selector);
    const rows = table.getElementsByTagName("tr");

    const jsonData = [];

    // Loop pelas linhas da tabela, começando da segunda linha (índice 1)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cols = row.getElementsByTagName("td");
        const rowData = {};

        // Loop pelas colunas da linha atual
        for (let j = 0; j < cols.length; j++) {
            const col = cols[j];
            const headerText = table.rows[0].cells[j].textContent.trim();
            const cellData = col.textContent.trim();
            rowData[headerText] = cellData;
        }

        jsonData.push(rowData);
    }

    return jsonData;
}