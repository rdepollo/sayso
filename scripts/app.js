$(document).ready(function() {
  $("#profilepage").hide();
  var loggedin = false;
  var isprofile = "off";
  $(document).on('click', '#close', function() {
    $(".popup").css("display", "none");
  });



    /// call your function here

  function checklogin(percentFor, percentOf) {
    if (loggedin == false) {
      //$(".no").css("visibility", "hidden");
      //$(".yes").css("visibility", "hidden");
    } else {
      $(".no").css("visibility", "visible");
      $(".yes").css("visibility", "visible");
    }
  }
window.setInterval(checklogin(), 300);
  var state = "recent";

  $(document).on('click', '.recent', function() {
    state= "recent";
    updatePosts();
    $('.popular').addClass("inactive");
    $('.recent').removeClass("inactive");
  });

  $(document).on('click', '.popular', function() {
    state= "popular";
    updatePosts();
    $('.popular').removeClass("inactive");
    $('.recent').addClass("inactive");
  });

  function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  var config = {
    apiKey: "apikey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId"
  };

  firebase.initializeApp(config);
  var posts = firebase.database().ref('posts');

  var categoryselection = $(".selection").text();

  $('.option').click(function() {
    var option = $(this).text();
    var holder = [categoryselection, option];
    $(".selection").text(holder[1]);
    $(this).text(holder[0]);
    categoryselection = $(".selection").text();
  })

  function getPercent(percentFor, percentOf) {
    var result = Math.floor(percentFor / percentOf * 100);
    if (result != result) {
      result = 0;
    }
    return result;
  }


  var updatePostsRecent = function() {
    posts.once('value', function(snapshot) {
      snapshot.forEach(function(myFirebaseItem) {

        // Access the child of the main branch
        var firebaseChild = myFirebaseItem.val();

        // Get the message metadata
        var postCategory = firebaseChild.category;

        // Get the username metadata
        var postContent = firebaseChild.content;
        var postID = firebaseChild.id;
        var postDate = firebaseChild.date;
        var yesVotes = parseInt(firebaseChild.yesvotesCount);
        var noVotes = parseInt(firebaseChild.novotesCount);
        var total = yesVotes + noVotes;
        var yespercent = getPercent(yesVotes, (yesVotes + noVotes));
        var nopercent = getPercent(noVotes, (yesVotes + noVotes));
        if (loggedin == true) {
          $(".no").css("visibility", "visible");
          $(".yes").css("visibility", "visible");
        }

        if (yespercent > 0) {
          var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black"><div id="myBar"style=" width:' + yespercent + '%;height:30px;background-color:black;color:white;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div></div>';
        } else {
          var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black;color:black;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div>';
        }
        var hello;

        hello = $('<div class="post" data-postId="' + postID + '"><span class="postcontent">Is it considered ' + postCategory + ' when ' + postContent + '</span><br><span class="yes" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">yes</span> <span class="no" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">no</span><br>' + wholebar + '<span class="yesvotes">yes: ' + yesVotes + '</span><span class="novotes">no: ' + noVotes + '</span><br><span class="postdate">' + postDate + '</span></div>');
        hellur = $('<div class="post" data-postId="' + postID + '"><span class="postcontent">Is it considered ' + postCategory + ' when ' + postContent + '</span><br><span class="yes nothidden" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">yes</span> <span class="no nothidden" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">no</span><br>' + wholebar + '<span class="yesvotes">yes: ' + yesVotes + '</span><span class="novotes">no: ' + noVotes + '</span><br><span class="postdate">' + postDate + '</span></div>');

        if (loggedin == true) {
        $('#posts').prepend(hellur);
      } else {
        $('#posts').prepend(hello);
      }


      });
    });
  }

  var updatePostsPopular = function() {
    posts.orderByChild("totalvotesCount").once('value', function(snapshot) {
      snapshot.forEach(function(myFirebaseItem) {

        // Access the child of the main branch
        var firebaseChild = myFirebaseItem.val();

        // Get the message metadata
        var postCategory = firebaseChild.category;

        // Get the username metadata
        var postContent = firebaseChild.content;
        var postID = firebaseChild.id;
        var postDate = firebaseChild.date;
        var yesVotes = parseInt(firebaseChild.yesvotesCount);
        var noVotes = parseInt(firebaseChild.novotesCount);
        var total = yesVotes + noVotes;
        var yespercent = getPercent(yesVotes, (yesVotes + noVotes));
        var nopercent = getPercent(noVotes, (yesVotes + noVotes));
        if (loggedin == true) {
          $(".no").css("visibility", "visible");
          $(".yes").css("visibility", "visible");
        }

        if (yespercent > 0) {
          var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black"><div id="myBar"style=" width:' + yespercent + '%;height:30px;background-color:black;color:white;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div></div>';
        } else {
          var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black;color:black;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div>';
        }
        var hello;

        hello = $('<div class="post" data-postId="' + postID + '"><span class="postcontent">Is it considered ' + postCategory + ' when ' + postContent + '</span><br><span class="yes" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">yes</span> <span class="no" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">no</span><br>' + wholebar + '<span class="yesvotes">yes: ' + yesVotes + '</span><span class="novotes">no: ' + noVotes + '</span><br><span class="postdate">' + postDate + '</span></div>');
        hellur = $('<div class="post" data-postId="' + postID + '"><span class="postcontent">Is it considered ' + postCategory + ' when ' + postContent + '</span><br><span class="yes nothidden" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">yes</span> <span class="no nothidden" data-total="' + total + '" data-yes="' + yesVotes + '" data-no="' + noVotes + '">no</span><br>' + wholebar + '<span class="yesvotes">yes: ' + yesVotes + '</span><span class="novotes">no: ' + noVotes + '</span><br><span class="postdate">' + postDate + '</span></div>');

        if (loggedin == true) {
        $('#posts').prepend(hellur);
      } else {
        $('#posts').prepend(hello);
      }


      });
    });
  }


  var updatePosts = function() {
    if (state == "recent") {
      $('#posts').children().remove();
      updatePostsRecent();
      if (loggedin == true) {
        $(".no").css("visibility", "visible");
        $(".yes").css("visibility", "visible");
      }
    } else if (state == "popular") {
      $('#posts').children().remove();
      updatePostsPopular();
      if (loggedin == true) {
        $(".no").css("visibility", "visible");
        $(".yes").css("visibility", "visible");
    }
  }
}


  updatePosts();

  var provider = new firebase.auth.GoogleAuthProvider();

  // USER BRANCH FROM THE DATABASE
  var userBranch = firebase.database().ref('users');


  // VARIABLES TO BE USED BELOW
  var userId, currentUser;

  $('#login').click(function() {
    // Initaliaze FB login system for Google users
    firebase.auth().signInWithPopup(provider).then(function(result) {
      loggedin = true;
      // Necessary User variables
      var token = result.credential.accessToken;
      var user = result.user;

      // Grab the current user's
      // Define the userId with the current user
      userId = result.user.uid;
      currentUser = firebase.database().ref('users').child(userId);
      $('#login').remove();
      $(".container").prepend( "<div id='myprofile'>profile</div>");
      $("#myprofile").hide();
      $(".fields").css("visibility", "visible");
      $(".fields").css("height", "auto");
      $(".fields").css("overflow", "visible");
      $(".feed").hide();
      currentUser.on('value', function(snapshot) {
        var profile = snapshot.val();
                if (profile.hasregistered == "yes") {
          $(".no").css("visibility", "visible");
          $(".yes").css("visibility", "visible");
          $(".fields").css("visibility", "hidden");
          $(".fields").css("height", "0px");
          $(".fields").css("overflow", "hidden");
          $(".feed").show();
          $('.newpost').show();
          $('#myprofile').show();
        }

        var myarr = [1,2,3,4];
        var otherarr = [];
        if (snapshot.hasChild("votes")) {
        myarr = (profile.votes);

        otherarr = Object.keys(myarr);
        var align = 0;
        otherarr.forEach(function(element) {

          var vote = myarr[element];
          firebase.database().ref('posts').child(element).once('value', function(snapshot) {
            var result = snapshot.val();
            var postCategory = result.category;

            // Get the username metadata
            var postContent = result.content;
            var postID = result.id;
            var postDate = result.date;
            var yesVotes = parseInt(result.yesvotesCount);
            var noVotes = parseInt(result.novotesCount);
            var total = yesVotes + noVotes;
            var yespercent = getPercent(yesVotes, (yesVotes + noVotes));
            var nopercent = getPercent(noVotes, (yesVotes + noVotes));
            if (yesVotes >= noVotes) {
              if (myarr[element] == "yes") {
                align++;
                var alignment = getPercent(align, otherarr.length);
              }
            } else {
              if (myarr[element] == "no") {
                align++;
                var alignment = getPercent(align, otherarr.length);
              }
            }

            if (yespercent > 0) {
              var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black"><div id="myBar"style=" width:' + yespercent + '%;height:30px;background-color:black;color:white;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div></div>';
            } else {
              var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black;color:black;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div>';
            }
            var hellur = $('<div class="post" data-postId="' + postID + '"><span class="postcontent">Is it considered ' + postCategory + ' when ' + postContent + '</span><br><span class="myvote">you voted <span class="big">' + vote + '</span></span>' + wholebar + '<span class="yesvotes">yes: ' + yesVotes + '</span><span class="novotes">no: ' + noVotes + '</span><br><span class="postdate">' + postDate + '</span></div>');
            $("#myposts").prepend(hellur);

            if (alignment > 0) {
              var wholealignbar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black"><div id="myBar"style=" width:' + alignment + '%;height:30px;background-color:black;color:white;text-align:center;">alignment: ' + alignment + '%</div></div>';
            } else {
              var wholealignbar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black;color:black;text-align:center;">alignment: ' + alignment + '%</div>';
            }
            $("#alignholder").html("");
            $("#alignholder").append(wholealignbar);

        });
      });
    }


      });


      // If there is an error
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  })

  // Define currentUser var to the child insde the User Branch
  //currentUser = firebase.database().ref('users').child(userId);

  $(document).on('click', '.send', function() {
    var date = new Date();
    var category = categoryselection;
    var content = $('.content').text();
    if (content.indexOf('?') > -1) {

      posts.push({
        category: category,
        content: content,
        author: userId,
        date: date.toDateString(),
        id: makeid(15),
        yesvotesCount: "0",
        novotesCount: "0",
        totalvotesCount: "0"

      });
      // Empty out the divs
      $('.content').text("...");
    } else {
      posts.push({
        category: category,
        content: content + "?",
        author: userId,
        date: date.toDateString(),
        id: makeid(15),
        yesvotesCount: "0",
        novotesCount: "0",
        totalvotesCount: "0"
      });
      // Empty out the divs
      $('.content').text("...");
    }
    updatePosts();
    $(".no").css("visibility", "visible");
    $(".yes").css("visibility", "visible");
    $(".fields").css("visibility", "hidden");
    $(".fields").css("height", "0px");
    $(".fields").css("overflow", "hidden");
    $('.newpost').show();
  })

  $(document).on('click', '.dropdown', function() {
      $(this).toggleClass('hover_effect');
  });

  $(document).on('click', '.no', function() {
    var selectedID = $(this).parent().attr('data-postId');
    posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        snapshot.forEach(function(data) {
          target = data.key
          return target
        });
        return target;
      });

      return target;
    });
    ///////////////////////////////
    posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        snapshot.forEach(function(data) {
          target = data.key
          return target
        });
        return target;
      });

      return target;
    });
    firebase.database().ref("users/" + userId + "/votes").once("value", function(snapshot) {
      if (snapshot.hasChild(target)) {
        $(".popup").css("display", "block");
        if (snapshot.child(target).val()== "yes") {
          $("#answer").text("yes");
        } else {
          $("#answer").text("no");
        }
      } else {
        var date = new Date();
        var voteLog = {};
        voteLog[userId] = date.toDateString();
        firebase.database().ref("posts/" + target + "/novotes").update(voteLog);
        var what = firebase.database().ref("posts").child(target).key;
        var who = firebase.database().ref("posts/" + what).child("novotesCount").key;
        firebase.database().ref('/posts/' + what).once('value', function(snapshot) {
          var holder = snapshot.child("novotesCount").val();
          var number = parseInt(holder) + 1;
          var novoteLog = {};
          var holder2 = snapshot.child("totalvotesCount").val();
          var numbers = parseInt(holder) + 1;
          var totalvoteLog = {};
          novoteLog["novotesCount"] = number.toString();
          totalvoteLog["totalvotesCount"] = numbers.toString();
          firebase.database().ref("posts/" + target).update(novoteLog);
          firebase.database().ref("posts/" + target).update(totalvoteLog);
        });
        var postLog = {};
        postLog[target] = "no";
        firebase.database().ref("users/" + userId + "/votes").update(postLog);
        updatePosts();
      }

    });
  });


  $(document).on('click', '.yes', function() {
    var selectedID = $(this).parent().attr('data-postId');
    posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        snapshot.forEach(function(data) {
          target = data.key
          return target
        });
        return target;
      });

      return target;
    });
    ///////////////////////////////
    posts.orderByChild('id').equalTo(selectedID).on("value", function(snapshot) {
      snapshot.forEach(function(data) {
        snapshot.forEach(function(data) {
          target = data.key
          return target
        });
        return target;
      });

      return target;
    });
    firebase.database().ref("users/" + userId + "/votes").once("value", function(snapshot) {
      if (snapshot.hasChild(target)) {
        $(".popup").css("display", "block");
        if (snapshot.child(target).val()== "yes") {
          $("#answer").text("yes");
        } else {
          $("#answer").text("no");
        }
      } else {
        var date = new Date();
        var voteLog = {};
        voteLog[userId] = date.toDateString();
        firebase.database().ref("posts/" + target + "/yesvotes").update(voteLog);
        var what = firebase.database().ref("posts").child(target).key;
        var who = firebase.database().ref("posts/" + what).child("novotesCount").key;
        firebase.database().ref('/posts/' + what).once('value', function(snapshot) {
          var holder = snapshot.child("yesvotesCount").val();
          var number = parseInt(holder) + 1;
          var yesvoteLog = {};
          var holder2 = snapshot.child("totalvotesCount").val();
          var numbers = parseInt(holder) + 1;
          var totalvoteLog = {};
          yesvoteLog["yesvotesCount"] = number.toString();
          totalvoteLog["totalvotesCount"] = numbers.toString();
          firebase.database().ref("posts/" + target).update(yesvoteLog);
          firebase.database().ref("posts/" + target).update(totalvoteLog);
        });
        var postLog = {};
        postLog[target] = "yes";
        firebase.database().ref("users/" + userId + "/votes").update(postLog);
        $('#posts').children().remove();
        updatePosts();
      }



    });
  });

  $(document).on('click', '#myprofile', function() {

    if (isprofile == "off") {

      isprofile = "on";
      $("#myprofile").text("< back");
      currentUser = firebase.database().ref('users').child(userId);
      currentUser.on('value', function(snapshot) {
        var profile = snapshot.val();
        var myarr = [1,2,3,4];
        var otherarr = [];
        if (snapshot.hasChild("votes")) {
        myarr = (profile.votes);

        otherarr = Object.keys(myarr);
        var align = 0;
        $("#myposts").children().remove();
        otherarr.forEach(function(element) {

          var vote = myarr[element];
          firebase.database().ref('posts').child(element).once('value', function(snapshot) {
            var result = snapshot.val();
            var postCategory = result.category;

            // Get the username metadata
            var postContent = result.content;
            var postID = result.id;
            var postDate = result.date;
            var yesVotes = parseInt(result.yesvotesCount);
            var noVotes = parseInt(result.novotesCount);
            var total = yesVotes + noVotes;
            var yespercent = getPercent(yesVotes, (yesVotes + noVotes));
            var nopercent = getPercent(noVotes, (yesVotes + noVotes));
            if (yesVotes >= noVotes) {
              if (myarr[element] == "yes") {
                align++;
                var alignment = getPercent(align, otherarr.length);
              }
            } else {
              if (myarr[element] == "no") {
                align++;
                var alignment = getPercent(align, otherarr.length);
              }
            }

            if (yespercent > 0) {
              var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black"><div id="myBar"style=" width:' + yespercent + '%;height:30px;background-color:black;color:white;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div></div>';
            } else {
              var wholebar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black;color:black;text-align:center;">' + yespercent + '% yes | ' + nopercent + '% no</div>';
            }
            var hellur = $('<div class="post" data-postId="' + postID + '"><span class="postcontent">Is it considered ' + postCategory + ' when ' + postContent + '</span><br><span class="myvote">you voted <span class="big">' + vote + '</span></span>' + wholebar + '<span class="yesvotes">yes: ' + yesVotes + '</span><span class="novotes">no: ' + noVotes + '</span><br><span class="postdate">' + postDate + '</span></div>');
            $("#myposts").prepend(hellur);

            if (alignment > 0) {
              var wholealignbar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black"><div id="myBar"style=" width:' + alignment + '%;height:30px;background-color:black;color:white;text-align:center;">alignment: ' + alignment + '%</div></div>';
            } else {
              var wholealignbar = '<div class="percentbar" style="width: 100%;background-color:white;border:1px solid black;color:black;text-align:center;">alignment: ' + alignment + '%</div>';
            }
            $("#alignholder").html("");
            $("#alignholder").append(wholealignbar);

        });
      });
    }



      });
    $("#everything").hide();
    $("#profilepage").show();
  } else if (isprofile == "on"){
  isprofile = "off";
  $("#myprofile").text("profile");
  $("#profilepage").hide();
  $("#everything").show();
}
  });

  // Save the User profile settings
  $('#save').click(function() {
    var survivor;
    var discrimination;
    if ($(".yesbutton").hasClass('activated')) {
      survivor = "yes"
    }
    if ($(".nobutton").hasClass('activated')) {
      survivor = "no"
    }
    if ($(".lastyesbutton").hasClass('activated')) {
      discrimination = "yes"
    }
    if ($(".lastnobutton").hasClass('activated')) {
      discrimination = "no"
    }
    // Set will create (if empty) or override the exisiting data
    currentUser.set({
      gender: $('.gender').val(),
      pronoun1: $('.pronoun1').val(),
      pronoun2: $('.pronoun2').val(),
      politicalAffiliation: $('.politicalAffiliation').val(),
      hasregistered: "yes",
      survivor: survivor,
      discrimination: discrimination
    })

    $(".no").css("visibility", "visible");
    $(".yes").css("visibility", "visible");
    $(".fields").css("visibility", "hidden");
    $(".fields").css("height", "0px");
    $(".fields").css("overflow", "hidden");
    $(".feed").show();
    $('#myprofile').show();
    $('.newpost').show();

  })



});
