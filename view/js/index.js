const urlApi = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');


function fazerRequisicaoLogin(url, metodo, dados, callbackSucesso, callbackErro) {
    $.ajax({
        url: url,
        type: metodo,
        headers: {
            'Content-Type': 'application/json',
        },
        data: dados ? JSON.stringify(dados) : null,
        success: function (resposta) {
            if (callbackSucesso) {
                callbackSucesso(resposta);
            }
        },
        error: function (erro) {
            if (callbackErro) {
                callbackErro(erro.message);
            }
        }
    });
}

function fazerRequisicao(url, metodo, dados, callbackSucesso, callbackErro) {
    $.ajax({
        url: url,
        type: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        data: dados ? JSON.stringify(dados) : null,
        success: function (resposta) {
            if (callbackSucesso) {
                callbackSucesso(resposta);
            }
        },
        error: function (erro) {
            if (callbackErro) {
                alert(erro.responseJSON.message);
            }
        }
    });
}