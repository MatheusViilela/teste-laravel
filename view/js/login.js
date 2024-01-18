$("#submit").on("click", function (event) {
    var email = $("#email").val();
    var password = $("#password").val();
    fazerRequisicaoLogin(urlApi + '/login', 'POST', { email: email, password: password }, function (resposta) {
        let token = resposta.data;
        localStorage.setItem('token', token);
        window.location.href = 'home.html';
    }, function (erro) {
        console.log(erro);
    });
}); 
