$(document).ready(function () {
    $('#desconto').mask('##0.00', { reverse: true });
});

fazerRequisicao(urlApi + '/client', 'GET', null, function (resposta) {
    if (resposta.error == false) {
        resposta.data.forEach(function (cliente) {
            $("#clientes").append('<option value="' + cliente.id + '">' + cliente.name + '</option>');
        });
    } else {
        alert("Erro ao carregar clientes");
    }
}, function (erro) {
    alert(erro);
});
fazerRequisicao(urlApi + '/product', 'GET', null, function (resposta) {
    if (resposta.error == false) {
        resposta.data.forEach(function (produto) {
            $("#produtos").append('<option value="' + produto.id + '">' + produto.name + " (R$ " + produto.price + ")" + '</option>');
        });
    } else {
        alert("Erro ao carregar produtos");
    }
}, function (erro) {
    alert(erro);
});

$("#produtos").on("change", function (event) {
    let produtoId = $("#produtos").val();
    fazerRequisicao(urlApi + '/product/' + produtoId, 'GET', null, function (resposta) {
        if (resposta.error == false) {
            $("#total").val(resposta.data.price);
            $("#totalAux").val(resposta.data.price);
        } else {
            alert("Erro ao carregar produtos");
        }
    }, function (erro) {
        alert(erro);
    });
});
$('#desconto').on('keyup', function () {
    let desconto = $('#desconto').val();
    let totalAux = $('#totalAux').val();
    let total1 = parseFloat(totalAux);

    let totalComDesconto = total1 - desconto;
    totalComDesconto = totalComDesconto.toFixed(2);
    $('#total').val(totalComDesconto);
});
$("#parcelas").on("change", function (event) {
    let parcelas = $("#parcelas").val();
    let total = $("#total").val();
    let total1 = parseFloat(total);
    let totalComDesconto = total1 / parcelas;
    totalComDesconto = totalComDesconto.toFixed(2);
    $("#vlr_parcela").val(totalComDesconto);
});




