const firebaseConfig = {
    apiKey: "AIzaSyBh1z94oH4D8_oPWCK-0UcnNRQKesjsux4",
    authDomain: "testproject-81525.firebaseapp.com",
    databaseURL: "https://testproject-81525.firebaseio.com",
    projectId: "testproject-81525",
    storageBucket: "",
    messagingSenderId: "496108154065",
    appId: "1:496108154065:web:3c13873092c845e3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const trainData = firebase.database();

$("#addTrainBtn").on("click", function () {
    event.preventDefault()
    const trainName = $("#trainNameInput").val().trim(),
        destination = $("#destinationInput").val().trim(),
        firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("X"),
        frequency = $("#frequencyInput").val().trim()

    const newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    $("#trainNameInput").val("")
    $("#destinationInput").val("")
    $("#firstTrainInput").val("")
    $("#frequencyInput").val("")
    trainData.ref().push(newTrain);

    alert("--ALERT: Train was Added--")

});

trainData.ref().on("child_added", function (snapshot) {
   const name = snapshot.val().name,
        destination = snapshot.val().destination,
        frequency = snapshot.val().frequency,
        firstTrain = snapshot.val().firstTrain,
        remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency,
        minutes = frequency - remainder,
        arrival = moment().add(minutes,"m").format("hh:mm A");


   console.log(remainder);
   console.log(minutes);
   console.log(arrival);

$("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><tr>");
});

