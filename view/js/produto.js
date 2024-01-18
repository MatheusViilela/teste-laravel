let ProdutoId

function editar(idProduto) {
    var rowIndex = $('#dataTableClientes').DataTable().row('[data-index="' + idProduto + '"]').index();
    var data = $('#dataTableClientes').DataTable().row(rowIndex).data();
    $("#name").val(data.name);
    $("#desc").val(data.description);
    $("#categoria").val(data.category);
    $("#preco").val(data.price);
    ProdutoId = idProduto

    $(".insert").hide();
    $(".edit").show();
}
function deletar(ProdutoId) {
    let data = {
        'id': ProdutoId
    }
    if (confirm("Deseja realmente excluir o cliente?")) {
        fazerRequisicao(urlApi + '/product', 'DELETE', data, function (resposta) {
            if (resposta.error == false) {
                alert("Produto excluído com sucesso!");
                window.location.href = 'produtos.html';
            } else {
                alert("Erro ao excluir cliente");
            }
        }, function (erro) {
            alert(erro);
        });
    }
}

$(document).ready(function () {
    $('#preco').mask('##0.00', { reverse: true });

    $('#dataTableClientes').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": urlApi + "/product",
            "type": "GET",
            "headers": {
                "Authorization": "Bearer " + token
            }
        },
        "columns": [
            { "data": "name" },
            { "data": "description" },
            { "data": "category" },
            { "data": "price" },
            {
                "data": "id",
                "render": function (data, type, row, meta) {
                    return '<button type="button" class="btn btn-primary" data-index="' + meta.row + '" onclick="editar(' + data + ')">Editar</button> <button type="button" class="btn btn-danger" onclick="deletar(' + data + ')">Excluir</button>';
                }
            }
        ]
    });
    $("#save").on("click", function (event) {
        let clienteData = {
            'name': $("#name").val(),
            'description': $("#desc").val(),
            'category': $("#categoria").val(),
            'price': $("#preco").val(),
        };
        fazerRequisicao(urlApi + '/product', 'POST', clienteData, function (resposta) {
            if (resposta.error == false) {
                alert("Produto cadastrado com sucesso!");
                window.location.href = 'produtos.html';
            } else {
                alert("Erro ao cadastrar cliente");
            }

        }, function (erro) {
            alert(erro);
        });
    });
    $("#edit").on("click", function (event) {
        let clienteData = {
            'id': ProdutoId,
            'name': $("#name").val(),
            'description': $("#desc").val(),
            'category': $("#categoria").val(),
            'price': $("#preco").val(),
        };
        fazerRequisicao(urlApi + '/product', 'PUT', clienteData, function (resposta) {
            if (resposta.error == false) {
                alert("Produto editado com sucesso!");
                window.location.href = 'produtos.html';
            } else {
                alert("Erro ao editar cliente");
            }

        }, function (erro) {
            console.log(erro);
        });
    });
});