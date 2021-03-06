var ws = null;

function setConnected(connected) {

    $("#connect").prop("disabled", connected);

    $("#disconnect").prop("disabled", !connected);

    if (connected) {

        $("#conversation").show();

    }

    else {

        $("#conversation").hide();

    }

    $("#userinfo").html("");

}

function connect() {
	ws = new WebSocket('ws://localhost:8080/socket');
	ws.onmessage = function(data){
		showGreeting(data.data);
	}
	 setConnected(true);
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    ws.send($("#name").val());
}

function showGreeting(message) {
    $("#greetings").append(" " + message + "");
}

$(function () {

    $("form").on('submit', function (e) {

        e.preventDefault();

    });

    $( "#connect" ).click(function() { connect(); });

    $( "#disconnect" ).click(function() { disconnect(); });

    $( "#send" ).click(function() { sendName(); });

});