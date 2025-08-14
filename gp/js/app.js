var splide = new Splide('.splide', {
    arrows: true,
    pagination: false,
    perPage: 3,
    gap: "14px",

    breakpoints: {
        1024: {
            perPage: 2,
            gap: "14px",
            arrows: false,
        },
        768: {
            perPage: 1,
            arrows: false,
            gap: 0,
            pagination: true
        },
    }
});

splide.mount();


$(document).ready(function () {
    // Al hacer hover en .woki__card--front
    $(".woki__card--front").mouseenter(function () {
        var frontCard = $(this);
        var backCard = frontCard.siblings(".woki__card--back");

        if (!frontCard.hasClass("is-hovered")) {
            frontCard.addClass("is-hovered");
            frontCard.fadeOut(150, function () {
                backCard.fadeIn(150);
            });
        }
    });

    // Al hacer hover en .woki__card--back
    $(".woki__card--back").mouseleave(function () {
        var backCard = $(this);
        var frontCard = backCard.siblings(".woki__card--front");

        if (frontCard.hasClass("is-hovered")) {
            frontCard.removeClass("is-hovered");
            backCard.fadeOut(150, function () {
                frontCard.fadeIn(150);
            });
        }
    });


    $('select').niceSelect();

    var currentStep = 1;
    var totalSteps = $(".form-box1").length;

    function showStep(step) {
        $(".form-box").removeClass("active");
        $('.form-box[data-step="' + step + '"]').addClass("active");
        $(".form__progress li").removeClass("active");
        $('.form__progress li[data-step="' + step + '"]').addClass("active");

        // Añadir clase 'completed' a los pasos completados
        $(".form__progress li").each(function (index) {
            if (index < step - 1) {
                $(this).addClass("completed");
            } else {
                $(this).removeClass("completed");
            }
        });

        // Mostrar u ocultar botón "Atrás"
        if (step === 1) {
            $("#prevBtn").hide();
        } else {
            $("#prevBtn").show();
        }

        // Mostrar mensaje de éxito al completar el último paso
        if (step === totalSteps) {
            $(".col-form:first-child").hide(); // Oculta el primer col-form
            $(".col-form:last-child").show(); // Muestra el segundo col-form
        } else {
            $(".col-form:first-child").show(); // Muestra el primer col-form si no es el último paso
            $(".col-form:last-child").hide(); // Oculta el segundo col-form si no es el último paso
        }
    }

    $("#nextBtn").click(function (e) {
        if (currentStep == 1) {
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let emailAddress = $("#emailAddress").val();
            let documentNumber = $("#documentNumber").val();

            if (!firstName) {
                $("#error").removeClass("hidden");
                $("#error").html("El campo nombre es requerido.");
            } else if (!lastName) {
                $("#error").removeClass("hidden");
                $("#error").html("El campo apellido es requerido.");
            } else if (!emailAddress) {
                $("#error").removeClass("hidden");
                $("#error").html("El campo Correo electrónico requerido.");
            } else if (!documentNumber) {
                $("#error").removeClass("hidden");
                $("#error").html("El campo cédula es requerido.");
            }else {
                $("#error").addClass("hidden");
                $("#error").html("");

                e.preventDefault();
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        } else if (currentStep == 2) {
            let productDescription = $("#productDescription").val();
            let area = $("#area").val();
            let details = $("#details").val();

            if (!productDescription) {
                $("#error").removeClass("hidden");
                $("#error").html("El campo producto o servicio que desarrolla tu empresa es requerido.");
            } else {
                $("#error").addClass("hidden");
                $("#error").html("");

                e.preventDefault();
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        } else if (currentStep == 3) {
            let come = $("#start").val();
            let modality = $("#modality").val();

            if (!come) {
                $("#error").removeClass("hidden");
                $("#error").html("El campo cuándo quieres empezar el proyecto requerido.");
            } else if (!modality) {
                $("#error").removeClass("hidden");
                $("#error").html("El campo modalidad de la consultoria es requerido..");
            }  else {
                $("#error").addClass("hidden");
                $("#error").html("");

                e.preventDefault();
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                    sendForm();
                }
            }
        }
    });

    $("#prevBtn").click(function (e) {
        e.preventDefault();
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    showStep(currentStep);

});

AOS.init({
    duration: 1000
});


$('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
});

$(".request").click(function () {
    window.location.href = '#form';
    $('#form').removeClass('hidden');
});

$("#enter").click(function () {
    $('#loginModal').modal('show');
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#login').addEventListener('submit', function (event) {
        event.preventDefault();

        const csrfToken = document.querySelector('input[name="csrf_token"]').value;
        const login = document.querySelector('input[name="login"]').value;
        const password = document.querySelector('input[name="password"]').value;

        fetch('/web/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                csrf_token: csrfToken,
                login: login,
                password: password
            })
        })
            .then(response => response.text())
            .then(data => {
                if (data.includes("Cerrar sesión")) {
                    location.reload();
                } else {
                    $("#modal-error").removeClass("hidden");
                }
                console.log(data);
                document.getElementById('error').classList.remove('hidden');
                document.getElementById('error').innerText = "Iniciar sesión exitoso.";
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('error').classList.remove('hidden');
                document.getElementById('error').innerText = "Error al iniciar sesión.";
            });
    });
});


function sendForm() {
    let workersNumbers = $('input[name="inlineRadioOptions"]:checked').val();

    $.ajax({
        url: 'https://aventurafinancierabackend.azurewebsites.net/Consultorias/Consultorias',
        type: 'GET',
        data: {
            company: $('#companyName').val(),
            emailAddress: $('#emailAddress').val(),
            rnc: $('#rnc').val(),
            phoneNumber: $('#phoneNumber').val(),
            webSite: $('#webSite').val(),
            sector: $('#sector').val(),
            workersNumber: workersNumbers,
            productDescription: $('#productDescription').val(),
            serviceInterest: $('#serviceInterest').val(),
            area: $('#area').val(),
            details: $('#details').val(),
            come: $('#come').val(),
            start: $('#start').val(),
            modality: $('#modality').val(),
            budget: $('#budget').val(),
            financing: $('#financing').val(),
        },
        success: function() {
            console.log('Data saved successfully.');
        },
        error: function() {
            console.log('An error occurred while saving the data.');
        }
    });
    
}




