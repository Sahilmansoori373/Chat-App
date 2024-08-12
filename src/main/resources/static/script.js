//var stompClient = null;
//
//function sendMessage() {
//    let JsonOb = {
//        name: localStorage.getItem("name"),
//        content: $("#message-value").val()
//    };
//    stompClient.send("/api/message", {}, JSON.stringify(JsonOb));
//}
//
//function connect() {
//    let socket = new SockJS("/server1");
//    stompClient = Stomp.over(socket);
//    stompClient.connect({}, function(frame) {
//
//        console.log("Connected:" + frame);
//        $("#name-from").addClass('d-none');
//        $("#chat-room").removeClass('d-none');
//
//        stompClient.subscribe("/to/return", function(response) {
//            showMessage(JSON.parse(response.body));
//        });
//
//    });
//}
//
//function showMessage(message) {
//    $("#message-container").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
//}
//
//$(document).ready((e) => {
//    $("#login").click(() => {
//        let name = $("#name-value").val();
//        localStorage.setItem("name", name);
//        connect();
//    });
//    $("#send-btn").click(() => {
//        sendMessage();
//    });
//});
var stompClient = null;
function sendMessage() {
    let JsonOb = {
        name: localStorage.getItem("name"),
        content: $("#message-value").val()
    };
    stompClient.send("/api/message", {}, JSON.stringify(JsonOb));
}

//function sendMessage() {
//    let content = $("#message-value").val();
//    let name = localStorage.getItem("name");
//
//    console.log("Name:", name); // Debugging log
//    console.log("Message Content:", content); // Debugging log
//
//    if (name && content) {  // Ensure both name and content are not undefined or empty
//        let JsonOb = {
//            name: name,
//            content: content
//        };
//        stompClient.send("/api/message", {}, JSON.stringify(JsonOb));
//        $("#message-value").val(''); // Clear the message input after sending
//    } else {
//        console.error("Name or content is missing.");
//    }
//}
//function showMessage(message) {
//    console.log("Raw Message Object:", message); // Log the entire message object to inspect its structure
//
//    // If message is not directly an object with `name` and `content`, extract them
//    if (message.name && message.content) {
//        $("#message-container").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
//    } else {
//        console.error("Message is incomplete:", message);
//
//        // Check if the message is nested within another object
//        if (message.payload) {
//            let decodedPayload = atob(message.payload);
//            let parsedMessage = JSON.parse(decodedPayload);
//            console.log("Decoded Payload:", parsedMessage);
//
//            if (parsedMessage.name && parsedMessage.content) {
//                $("#message-container").prepend(`<tr><td><b>${parsedMessage.name} :</b> ${parsedMessage.content}</td></tr>`);
//            } else {
//                console.error("Decoded message is still incomplete or missing expected fields.");
//            }
//        }
//    }
//}

function connect() {
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame) {

        console.log("Connected:" + frame);
        $("#name-from").addClass('d-none');
        $("#chat-room").removeClass('d-none');

        stompClient.subscribe("/to/return", function(response) {
            let message = JSON.parse(response.body);
            console.log("Received message:", message); // Debugging log
            showMessage(message);
        });

    });
}
//function showMessage(message) {
//    $("#message-container").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
//}

//function showMessage(message) {
//    if (message.name && message.content) {  // Ensure message object has valid name and content
//        $("#message-container").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
//    } else {
//        console.error("Message is incomplete:", message);
//    }
//}
function showMessage(message) {
    console.log("Raw Message Object:", message); // Log the entire message object to inspect its structure

    // If message is not directly an object with `name` and `content`, extract them
    if (message.name && message.content) {
        $("#message-container").prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
    } else {
        console.error("Message is incomplete:", message);

        // Check if the message is nested within another object
        if (message.payload) {
            let decodedPayload = atob(message.payload);
            let parsedMessage = JSON.parse(decodedPayload);
            console.log("Decoded Payload:", parsedMessage);

            if (parsedMessage.name && parsedMessage.content) {
                $("#message-container").prepend(`<tr><td><b>${parsedMessage.name} :</b> ${parsedMessage.content}</td></tr>`);
            } else {
                console.error("Decoded message is still incomplete or missing expected fields.");
            }
        }
    }
}
$(document).ready((e) => {
    $("#login").click(() => {
        let name = $("#name-value").val();
//        localStorage.setItem("name", name);
//        $("#name-title").html(`Welcome, <b>${name}</b>`);
//        connect();


        if (name) { // Ensure the name is not empty
            localStorage.setItem("name", name);
            $("#name-title").html(`Welcome, <b>${name}</b>`);
            connect();
        } else {
            console.error("Name is empty.");
        }
    });

    $("#send-btn").click(() => {
        sendMessage();
    });

    $("#logout").click(()=>{
        localStorage.removeItem("name")
        if(stompClient!==null){
            stompClient.disconnect()
                $("#name-from").removeClass('d-none');
                $("#chat-room").addClass('d-none');

        }
    })
});
