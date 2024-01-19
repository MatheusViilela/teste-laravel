var idCliente;
function editar(rowIndex) {
    var data = $('#dataTableClientes').DataTable().row(rowIndex).data();

    $("#name").val(data.name);
    $("#email").val(data.email);
    $("#cpf").val(data.cpf);
    $("#date").val(data.birth_date);
    $("#gender").val(data.gender);
    $("#phone").val(data.phone);
    $("#cep").val(data.cep);
    $("#address").val(data.address);
    $("#number").val(data.address_number);
    $("#complement").val(data.address_complement);
    $("#district").val(data.neighborhood);
    $("#city").val(data.city);
    $("#state").val(data.state);

    $(".insert").hide();
    $(".edit").show();
    idCliente = data.id;


}
function deletar(clienteId) {
    let data = {
        'id': clienteId
    }
    if (confirm("Deseja realmente excluir o cliente?")) {
        fazerRequisicao(urlApi + '/client', 'DELETE', data, function (resposta) {
            if (resposta.error == false) {
                alert("Cliente excluído com sucesso!");
                window.location.href = 'home.html';
            } else {
                alert("Erro ao excluir cliente");
            }
        }, function (erro) {
            console.log(erro);
        });
    }
}
$(document).ready(function () {
    $('#dataTableClientes').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": urlApi + "/client",
            "type": "GET",
            "headers": {
                "Authorization": "Bearer " + token
            }
        },
        "columns": [
            { "data": "name" },
            { "data": "email" },
            { "data": "cpf" },
            { "data": "birth_date" },
            { "data": "gender" },
            { "data": "phone" },
            { "data": "cep" },
            { "data": "address" },
            { "data": "address_number" },
            { "data": "address_complement" },
            { "data": "neighborhood" },
            { "data": "city" },
            { "data": "state" },
            {
                "data": "id",
                "render": function (data, type, row, meta) {
                    return '<div class="btn-group" role="group">' +
                        '<button type="button" class="btn btn-primary" data-index="' + meta.row + '" onclick="editar(' + meta.row + ')" style="margin-right: 5px;">Editar</button>' +
                        '<button type="button" class="btn btn-danger" onclick="deletar(' + data + ')">Excluir</button>' +
                        '</div>';
                }
            }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Portuguese-Brasil.json"
        },
    });

    $("#edit").on("click", function (event) {
        let clienteData = {
            'id': idCliente,
            "name": $("#name").val(),
            "email": $("#email").val(),
            "cpf": $("#cpf").val(),
            "date": $("#date").val(),
            "gender": $("#gender").val(),
            "phone": $("#phone").val(),
            "cep": $("#cep").val(),
            "address": $("#address").val(),
            "number": $("#number").val(),
            "address_complement": $("#complement").val(),
            "neighborhood": $("#district").val(),
            "city": $("#city").val(),
            "state": $("#state").val()
        };
        fazerRequisicao(urlApi + '/client', 'PUT', clienteData, function (resposta) {
            if (resposta.error == false) {
                alert("Cliente editado com sucesso!");
                window.location.href = 'home.html';
            } else {
                alert("Erro ao editar cliente");
            }

        }, function (erro) {
            console.log(erro);
        });
    });

    $("#save").on("click", function (event) {
        let clienteData = {
            "name": $("#name").val(),
            "email": $("#email").val(),
            "cpf": $("#cpf").val(),
            "birth_date": $("#date").val(),
            "gender": $("#gender").val(),
            "phone": $("#phone").val(),
            "cep": $("#cep").val(),
            "address": $("#address").val(),
            "address_number": $("#number").val(),
            "address_complement": $("#complement").val(),
            "neighborhood": $("#district").val(),
            "city": $("#city").val(),
            "state": $("#state").val()
        };
        console.log(clienteData);
        fazerRequisicao(urlApi + '/client', 'POST', clienteData, function (resposta) {
            if (resposta.error == false) {
                alert("Cliente cadastrado com sucesso!");
                window.location.href = 'home.html';
            } else {
                alert("Erro ao cadastrar cliente");
            }

        }, function (erro) {
            alert(erro);
        });
    });
});


function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('address').value = (conteudo.logradouro);
        document.getElementById('district').value = (conteudo.bairro);
        document.getElementById('city').value = (conteudo.localidade);
        document.getElementById('state').value = (conteudo.uf);
    }
    else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('address').value = "...";
            document.getElementById('district').value = "...";
            document.getElementById('city').value = "...";
            document.getElementById('state').value = "...";
            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);

        }
        else {
            alert("Formato de CEP inválido.");
        }
    } else {
        alert("Formato de CEP inválido.");
    }
};
