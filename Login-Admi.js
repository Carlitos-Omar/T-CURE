document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        // Obtener los datos del administrador almacenados en localStorage
        var admins = JSON.parse(localStorage.getItem("admins")) || [];

        // Verificar si las credenciales coinciden con algún administrador registrado
        var loggedInAdmin = admins.find(function(admin) {
            return admin.username === username && admin.password === password;
        });

        if (loggedInAdmin) {
            alert("Inicio de sesión exitoso. ¡Bienvenido, " + loggedInAdmin.username + "!");
            window.location.href = "Administrar.html"; // Aquí podrías redirigir al usuario al panel de administración
        } else {
            alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    });
});
