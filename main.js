//CLASS 107
//It's fine if any predictions come wrong because this model is trained on limited happy, sad, and angry faces of limited humans, retry for 2-3 times


prediction_1 = ""//This variables will be used to store the result gets from the modal and will be passed to the system to speak out the results
prediction_2 = ""

Webcam.set({//for setting the webcam
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");//In the HTML Page we want to show the live view of the webcam and store it inside the variable.

Webcam.attach('#camera');//as the page loads, webcam should start

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {//Webcam.snap() is a predefined function of webcam.js used to take images
      //We will use this data_uri to display the image.

        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
        //to display captured image in the HTML Page.
    });
}

  console.log('ml5 version:', ml5.version);//we are checking that whether we are ready to ml5.js library.
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);
//we will give link of the model which is trained for these emotions i.e., Happy ,Sad and Angry and store it inside a variable classifier
//json - JavaScript Object Notation is an open standard file format that is used to hold data.

  function modelLoaded() {//once the model is loaded
    console.log('Model Loaded!');
  }
  
function speak(){
  var synth = window.speechSynthesis;//We will define an API and store it inside a variable for converting text to speech.
  //If we want the system to speak the same, we need to give that particular text to the system to speak. So for that -
  
  speak_data_1 = "The first prediction is " + prediction_1;//creating two variables
  speak_data_2 = "And the second prediction is " + prediction_2;
  
  //Now we will convert this text to speech.
var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
//utterThis - is a variable in which we will store the converted text to speech
//SpeechSynthesisUtterance - is the function of an API that will convert text to speech
//speak_data_1 - contains the text which is the result of the first prediction
//speak_data_2 - contains the text which is the result of the first prediction
  
synth.speak(utterThis);// synth is a variable where we have stored the API
  //speak() - speak() function is a predefined function of the API.
  //utterThis - has the converted value of text to speech that we want to the system to speak


}

//CLASS 108
  function check()
  {
    img = document.getElementById('captured_image');//we get the captured image, and store it inside a variable.

    classifier.classify(img, gotResult);//Comparing the Captured image of emotion with the emotion images which are present in the Model.
  }


function gotResult(error, results) {//if the user will not give any input, then it will throw an error
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    // HTML Document will get updated with the Emoji name and image ans shows the result in the form of array i.e., array[0] and array[1]
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "happy")//for first prediction.
    {
	    document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    if(results[0].label == "sad")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    if(results[0].label == "angry")
    {
	    document.getElementById("update_emoji").innerHTML = "&#128548;";
    }

    if(results[1].label == "happy")//for second prediction
    {
	    document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if(results[1].label == "sad")
    {
	    document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    if(results[1].label == "angry")
    {
	    document.getElementById("update_emoji2").innerHTML = "&#128548;";
    }
  }
}

