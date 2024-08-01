// Variáveis constantes para cada serviço
const VALOR_CINEMA = 200;
const VALOR_SHOW = 0;
const VALOR_TEATRO = 200;
const VALOR_ESTADIO = 300;
const TAXA_SERVICO = 99.99;

function atualizarFormulario() {
    const servicoSelecionado = document.getElementById('service').value;
    const formularioDinamico = document.getElementById('formularioDinamico');

    // Limpar campos dinâmicos
    formularioDinamico.innerHTML = '';

    if (servicoSelecionado === 'cinema' || servicoSelecionado === 'teatro') {
        formularioDinamico.innerHTML =
            `<label for="budget">Número de cadeiras (mínimo 20):</label>
            <input type="number" id="budget" name="budget" min="20" required oninput="calcularOrcamento()" />
            <br />`;
    } else if (servicoSelecionado === 'estadio') {
        formularioDinamico.innerHTML =
            `<label for="totens">Número de totens:</label>
            <input type="number" id="totens" name="totens" required oninput="calcularOrcamento()" />
            <br />`;
    } else if (servicoSelecionado === 'show') {
        formularioDinamico.innerHTML =
            `<label for="rentalDays">Número de dias de aluguel:</label>
            <input type="number" id="rentalDays" name="rentalDays" required oninput="calcularOrcamento()" />
            <br />
            <label for="budget">Número de dias de cadeiras:</label>
            <input type="number" id="budget" name="budget" required oninput="calcularOrcamento()" />
            <br />
            <label for="totens">Número de dias de totens:</label>
            <input type="number" id="totens" name="totens" required oninput="calcularOrcamento()" />
            <br />`;
    }
}

function calcularOrcamento() {
    const servicoSelecionado = document.getElementById('service').value;
    let orcamentoEstimado = 0;

    if (servicoSelecionado === 'cinema' || servicoSelecionado === 'teatro') {
        const numeroDeCadeiras = parseInt(document.getElementById('budget').value);
        let valorPorCadeira = 0;
        let descontoPorCadeira = 0;

        if (numeroDeCadeiras >= 100 && numeroDeCadeiras <= 499) {
            descontoPorCadeira = valorPorCadeira - 5
        }
        else if (numeroDeCadeiras >= 500) {
            descontoPorCadeira = valorPorCadeira - 15
        }
        else {
            descontoPorCadeira = valorPorCadeira
        }
        orcamentoEstimado = (numeroDeCadeiras * descontoPorCadeira) + TAXA_SERVICO;

    } else if (servicoSelecionado === 'estadio') {
        const numeroDeTotens = parseInt(document.getElementById('totens').value);
        let valorTotem = 0;
        let descontoPorTotem = 0;

        if (valorTotem >= 100 && valorTotem <= 499) {
            descontoPorTotem = valorTotem - 5
        } 
        else if (numeroDeTotens >= 500) {
            descontoPorTotem = valorTotem - 15
        }
        else{
            descontoPorTotem = valorTotem
        }

        orcamentoEstimado = (numeroDeTotens * descontoPorTotem) + TAXA_SERVICO;

            
    } else if (servicoSelecionado === 'show') {
        const numeroDeDias = parseInt(document.getElementById('rentalDays').value);
        const numeroDeCadeiras = parseInt(document.getElementById('budget').value);
        const numeroDeTotens = parseInt(document.getElementById('totens').value);
        const valorPorCadeira = 200;
        const valorTotem = 180;
        const valorPorAluguel = 250;

        orcamentoEstimado = ((numeroDeDias * valorPorAluguel) + (numeroDeCadeiras * valorPorCadeira) + (numeroDeTotens * valorTotem)) + TAXA_SERVICO;
    }

    document.getElementById('estimatedBudget').value = `R$ ${orcamentoEstimado.toFixed(2)}`;
}

function validarCNPJ() {
    const cnpj = document.getElementById('CNPJ').value.replace(/[^\d]+/g, '');
    const cnpjError = document.getElementById('cnpj-error');

    if (cnpj.length !== 14 || !validarDigitosCNPJ(cnpj)) {
        cnpjError.style.display = 'block';
        desabilitarCampos();
    } else {
        cnpjError.style.display = 'none';
        habilitarCampos();
    }
}

function validarDigitosCNPJ(cnpj) {
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado == digitos.charAt(1);
}

function desabilitarCampos() {
    const campos = document.querySelectorAll('#formularioDinamico input');
    campos.forEach(campo => campo.disabled = true);
}

function habilitarCampos() {
    const campos = document.querySelectorAll('#formularioDinamico input');
    campos.forEach(campo => campo.disabled = false);
}
function updateCharCount() {
    const textarea = document.getElementById("comments");
    const charCount = textarea.value.length;
    const charCountElement = document.getElementById("charCount");
    const maxChars = 200;

    charCountElement.innerText = `${charCount}/${maxChars}`;

    if (charCount > maxChars) {
        document.getElementById("charLimitMessage").innerText = "Você atingiu o limite máximo de caracteres.";
    } else {
        document.getElementById("charLimitMessage").innerText = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("comments").addEventListener("input", updateCharCount);


});
