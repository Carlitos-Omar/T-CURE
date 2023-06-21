document.addEventListener("DOMContentLoaded", function() {
    var registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener los valores ingresados en el formulario
        var newName = document.getElementById("newName").value;
        var newUsername = document.getElementById("newUsername").value;
        var newPassword = document.getElementById("newPassword").value;

        // Obtener los administradores almacenados en localStorage
        var admins = JSON.parse(localStorage.getItem("admins")) || [];

        // Verificar si el correo electrónico ya está registrado
        var existingAdmin = admins.find(function(admin) {
            return admin.username === newUsername;
        });

        if (existingAdmin) {
            alert("El correo electrónico ya está registrado. Por favor, ingresa otro correo electrónico.");
        } else {
            // Agregar el nuevo administrador a la lista
            admins.push({
                name: newName,
                username: newUsername,
                password: newPassword
            });

            // Actualizar los datos de los administradores en localStorage
            localStorage.setItem("admins", JSON.stringify(admins));

            alert("Registro exitoso. Ahora puedes iniciar sesión con tu correo electrónico y contraseña.");

            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = "Login-Admi.html";
        }
    });
});
