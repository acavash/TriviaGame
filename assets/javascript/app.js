$(document).ready(function() {
  var allow = false; // Boolean
  function main() {
    $("#choices").empty();
    //Variables declared
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var questions = [{
      question: "What is a shooting star?",
      choices: ["Dying Star", "Meteor", "Comet"],
      correctAnswer: 1
    }, {
      question: "How many percent of the people live North of the equator?",
      choices: ["70%",
        "90%", "80%", "60%"
      ],
      correctAnswer: 1
    }, {
      question: "What is the process called when milk turns into yogurt?",
      choices: ["Molecule Synthesis", "Bacteria fermentation", "Mold growth"],
      correctAnswer: 1
    }, {
      question: "What is the largest country by area that has only one time zone?",
      choices: ["Turkey", "Russia",
        "China"
      ],
      correctAnswer: 2
    }, {
      question: "What is the color of the stars in the flag of the United States of America?",
      choices: ["Gold", "Silver", "White",
        "Purple"
      ],
      correctAnswer: 2
    }, {
      question: "How many times heart beats in a day?",
      choices: ["100'000", "1000", "1'000'000", "10'000"],
      correctAnswer: 0
    }]
    //function to get a random object property

    function randomProperty(obj) {
      var keys = Object.keys(obj)
      return obj[keys[Math.floor(Math.random() * keys.length)]];
    }
    var randomQuestion = randomProperty(questions);
    var oldQuestions = [];
    oldQuestions.push(randomQuestion);
    //Appends the random question
    $("#question").append(randomQuestion.question + "<br>");
    var multipleChoice = randomQuestion.choices;
    //The for loop, loop throughs the choices array and add it to a list in order to display
    for (var i = 0; i < randomQuestion.choices.length; i++) {
      $("#choices").append('<button>' + randomQuestion.choices[
        i] + '</button>');
    }
    $("#choices button").on("click", function() {
      //To get user answer guess we use if and else statements
      var userAnswer = $(this).text();
      if (multipleChoice.indexOf(userAnswer) ==
        randomQuestion.correctAnswer) {
        correct++;
        console.log("Correct");
        allow = true;
        $("#question").empty();
        $("#choices").html("You are correct!")
        setTimeout(reset, 2000);
      } else {
        incorrect++;
        console.log("Incorrect");
        allow = true;
        $("#question").empty();
        $("#choices").html(
          "You are incorrect! The correct answer is: " +
          randomQuestion.choices[
            randomQuestion.correctAnswer])
        setTimeout(reset, 2000);
      }
    })
    // Countdown Timer
    var count = 30;
    var counter = setInterval(timer, 1000); //runs the counter
    function timer() {
      count = count - 1;
      $("#time").html("Time Left: " + count);
      if (count <= 0) {
        clearInterval(counter); //stops the counter
        unanswered++;
        console.log("Ran out of time")
        $("#choices").html(
          "You ran out of time! The correct answer is: " +
          randomQuestion.choices[randomQuestion.correctAnswer]
        )
        setTimeout(ending, 2000);
      }
      if (correct + incorrect + unanswered >= 5) {
        clearInterval(counter)
        return false;
      }
    }
    //Function that runs after all the questions have been answered

    function ending() {
      $("#time").empty();
      $("#question").empty();
      $("#choices").empty();
      console.log("End")
      var audio = new Audio(
        'https://p.scdn.co/mp3-preview/ed5a443bc86176135ebca8a114f66f4d814d4c90'
      );
      audio.play();
      $("#choices").html("All done, here is how you did!" +
        "<br>" + "Correct Answers: " + correct +
        "<br>" + "Incorrect Answers: " + incorrect +
        "<br>" + "Unanswered: " + unanswered);
      $("#correct").append(
        "<button id='startover'>Start Over?</button>"
      )
      $("#startover").on("click", function() {
        audio.pause();
        $("button").remove();
        main();
      })
    }

    function reset() {
      $("#time").empty();
      $("#question").empty();
      $("#choices").empty();
      count = 30;
      timer();
      //Ends the questions and displays the correct and incorrect answers
      if (correct + incorrect + unanswered === 5) {
        ending();
        return
      }
      //Remove the question that was displayed in order to avoid any duplicate questions
      for (var i = 0; i < oldQuestions.length; i++) {
        for (var j = 0; j < questions.length; j++) {
          if (oldQuestions[i] == questions[j]) {
            delete questions[j];
          }
        }
      }
      randomQuestion = randomProperty(questions);
      oldQuestions.push(randomQuestion);
      //Append the random question
      $("#question").append(randomQuestion.question +
        "<br>");
      var multipleChoice = randomQuestion.choices;
      //The for loop throughs the choices array and add it to a list in order to display
      for (var i = 0; i < randomQuestion.choices.length; i++) {
        $("#choices").append('<button>' +
          randomQuestion.choices[i] + '</button>'
        );
      }
      $("#choices button").on("click", function() {
        //Gets user answer guess
        var userAnswer = $(this).text();
        if (multipleChoice.indexOf(userAnswer) ==
          randomQuestion.correctAnswer) {
          correct++;
          console.log("Correct");
          allow = true;
          $("#question").empty();
          $("#choices").html(
            "You are correct!")
          setTimeout(reset, 2000);
        } else {
          incorrect++;
          console.log("Incorrect");
          allow = true;
          $("#question").empty();
          $("#choices").html(
            "You are wrong! The correct answer is: " +
            randomQuestion.choices[
              randomQuestion.correctAnswer
            ])
          setTimeout(reset, 2000);
        }
      })
    }

  }
  $(".btn").on("click", function() {
    //Remove start button
    $('#button').remove();
    $("p").empty();
    main();

  });

})
