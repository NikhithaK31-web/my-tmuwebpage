window.onload = function() {
    var inputFields = document.querySelectorAll('input');
    inputFields.forEach(function(input) {
        input.setAttribute('autocomplete', 'off');
    });
};

$(function () {
    $("#login-btn").click(function (event) {
        event.preventDefault(); 
        var userName = $("#user-name").val().trim();
        var password = $("#password").val().trim();

        // Check if any field is empty
        if (userName === '' || password === '') {
            alert('Please fill in all fields.');
            return;
        }
        
        // Validate password length
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        var targetOrigin = '*'; // Replace this with your target origin

        window.parent.postMessage(JSON.stringify({
            event_code: 'ym-client-event',
            data: JSON.stringify({
                event: {
                    code: "userdetails",
                    data: {
                        username: userName,
                        password: password
                    }
                }
            })
        }), targetOrigin);

        // Disable input fields and buttons after submission
        $("input").prop('disabled', true);
        $("button").prop('disabled', true);

        // Show submission message
        $("#login-btn").fadeOut("slow", function () {
            $(".submission-message").fadeIn("slow");
        });
    });
});
