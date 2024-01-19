let VendaId


$('#desconto').mask('##0.00', { reverse: true });

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

$("#save").on("click", function (event) {
    let vendaData = {
        "client_id": $("#clientes").val(),
        "product_id": $("#produtos").val(),
        "discount": $("#desconto").val(),
        "payment_form": $("#flg_pgto").val(),
        "number_installments": $("#parcelas").val(),
        "installment_value": $("#vlr_parcela").val(),
        "total": $("#total").val(),
        "observation": $("#obs").val(),
        "sale_date": $("#dataVenda").val()
    };
    fazerRequisicao(urlApi + '/sale', 'POST', vendaData, function (resposta) {
        if (resposta.error == false) {
            alert("Venda cadastrada com sucesso!");
            window.location.href = 'vendas.html';
        } else {
            alert("Erro ao cadastrar venda");
        }

    }, function (erro) {
        alert(erro);
    });
});
$("#edit").on("click", function (event) {
    let vendaData = {
        "id": VendaId,
        "client_id": $("#clientes").val(),
        "product_id": $("#produtos").val(),
        "discount": $("#desconto").val(),
        "payment_form": $("#flg_pgto").val(),
        "number_installments": $("#parcelas").val(),
        "installment_value": $("#vlr_parcela").val(),
        "total": $("#total").val(),
        "observation": $("#obs").val(),
        "sale_date": $("#dataVenda").val()
    };
    fazerRequisicao(urlApi + '/sale', 'PUT', vendaData, function (resposta) {
        if (resposta.error == false) {
            alert("Venda editada com sucesso!");
            window.location.href = 'vendas.html';
        } else {
            alert("Erro ao editar venda");
        }

    }, function (erro) {
        alert(erro);
    });
});

function editar(rowIndex) {
    var data = $('#dataTableVendas').DataTable().row(rowIndex).data();
    $("#clientes").val(data.client.id);
    $("#produtos").val(data.product.id);
    $("#desconto").val(data.discount);
    $("#flg_pgto").val(data.payment_form);
    $("#parcelas").val(data.number_installments);
    $("#vlr_parcela").val(data.installment_value);
    $("#total").val(data.total);
    $("#obs").val(data.observation);
    VendaId = data.id;

    $(".insert").hide();
    $(".edit").show();
}
function deletar(idVenda) {
    let data = {
        'id': idVenda
    }
    if (confirm("Deseja realmente excluir essa venda?")) {
        fazerRequisicao(urlApi + '/sale', 'DELETE', data, function (resposta) {
            if (resposta.error == false) {
                alert("Venda excluído com sucesso!");
                window.location.href = 'vendas.html';
            } else {
                alert("Erro ao excluir venda");
            }
        }, function (erro) {
            alert(erro);
        });
    }
}



$(document).ready(function () {
    function getDataAtual() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        let mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
        let dia = hoje.getDate().toString().padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }
    $('#dataVenda').val(getDataAtual());


    $('#dataTableVendas').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": urlApi + "/sale",
            "type": "GET",
            "headers": {
                "Authorization": "Bearer " + token
            }
        },
        "columns": [
            { "data": "client.name" },
            { "data": "product.name" },
            { "data": "discount" },
            {
                "data": "payment_form",
                "render": function (data) {
                    switch (data) {
                        case "PP": return "Pix";
                        case "CC": return "Cartão de Crédito";
                        case "CD": return "Cartão de Débito";
                        case "DI": return "Dinheiro";
                        default: return data; // Mantenha o valor original se não for um dos códigos conhecidos
                    }
                }
            },
            { "data": "number_installments" },
            { "data": "installment_value" },
            { "data": "total" },
            { "data": "observation" },
            { "data": "sale_date" },
            {
                "data": "id",
                "render": function (data, type, row, meta) {
                    return '<button type="button" class="btn btn-primary" data-index="' + meta.row + '" onclick="editar(' + meta.row + ')">Editar</button> <button type="button" class="btn btn-danger" onclick="deletar(' + data + ')">Excluir</button>';
                }
            }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
        },
    });
});




