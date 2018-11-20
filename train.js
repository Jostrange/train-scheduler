


var config = {
    apiKey: "AIzaSyDPQ7cxzr1NwNFbFr8GkPECwwY23LwrXoI",
    authDomain: "traintimeproject-4bf93.firebaseapp.com",
    databaseURL: "https://traintimeproject-4bf93.firebaseio.com",
    projectId: "traintimeproject-4bf93",
    storageBucket: "traintimeproject-4bf93.appspot.com",
    messagingSenderId: "1052808298487"
};

firebase.initializeApp(config);
var database = firebase.database();
console.log(firebase.database);
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var tMinutesTillTrain = "";


$("#submit").on("click", function (event) {
    event.preventDefault();
console.log("sendingValuesToDb");
    trainName = $("#train-name").val().trim();
    console.log(trainName);
    destination = $("#destination").val().trim();
    console.log(destination);
    frequency = $("#frequency").val().trim();
    console.log(frequency);
    firstTrainTime= $("#first-train-time").val().trim();
    console.log(firstTrainTime);
    
   

    // The .push pushes the data into the database without overwriting the existing data
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
    $("tMinutesTillTrain").val("");
});
//top display board
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot);
    console.log("database updated");

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().tMinutesTillTrain);
    
    // Assumptions
    var tFrequency = 15;

    // Time is 3:30 AM
    var firstTime = "12:00";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   

    $("#gen-train-name").append("<div id='filler''>" + childSnapshot.val().trainName + "</div>");
    $("#gen-destination").append("<div id='filler'>" + childSnapshot.val().destination + "</div>");
    $("#gen-frequency").append("<div id='filler'>" + childSnapshot.val().frequency + "</div>");
    $("#first-train-time").append("<div id='filler'>" + moment(nextTrain).format("hh:mm")+ "</div>");
    $("#gen-minutes-away").append("<div id='filler'>" + tMinutesTillTrain + "</div>");
  




})



