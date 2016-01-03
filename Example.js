  
//ADDING A NEW COLLECTION (SQL TABLE)
PlayersList = new Mongo.Collection('players');



if (Meteor.isClient) {


  // FROM DATABASE
  Template.people.helpers({
    CurrentClients: function(){
      return PlayersList.find({ old: "false"}, {sort: {createdAt: -1}})
    },
    OldClients: function(){
      return PlayersList.find({ old: "true"}, {sort: {createdAt: -1}})
    },
  }); 
    // FROM DATABASE
  Template.people2.helpers({
    CurrentClients: function(){
      return PlayersList.find({ old: "false"}, {sort: {createdAt: -1}})
    },
    OldClients: function(){
      return PlayersList.find({ old: "true"}, {sort: {createdAt: -1}})
    },
  });   

  // TEST/STATIC LIST HELPER ADDED 
  /*Template.list.helpers({
    tasks: [
      { text: "This is task 1" },
      { text: "This is task 2" },
      { text: "This is task 3" }
    ]
  });*/
Template.people.events({
   'click': function(){
      console.log("hello")
    }

});

Template.submitter.events({
    "submit .new-task": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;

      // Get description value from form element
      var desctext = event.target.desctext.value;

       // Get description value from form element
      var typetext = event.target.typetext.value;

      console.log(text.length)
   
      var blankSumbit = text.length;
      var checkSumbit = 0;

      if (blankSumbit == checkSumbit) {
        console.log("it is true")
      } else {
        // Insert a task into the collection
      PlayersList.insert({
        name: text,
        description: desctext,
        type: typetext,
        old: "false",
        createdAt: new Date(), // current time
      });
      }
 
      // Clear form
      event.target.text.value = "";
       // Clear form
      event.target.desctext.value = "";
       // Clear form
      event.target.typetext.value = "";
    }
  });


//BUTTON
Template.leaderboard.events({
    'click .time': function(){
    $('#birth').livestamp(new Date());
    document.getElementById("toggle").innerHTML="starting";
    var secondClick = "true";
    console.log("You clicked something");
    },
    'click .stoptime': function(){
    var savedTime = document.getElementById("birth").innerHTML;
    console.log(savedTime);
    $('#birth').livestamp('destroy');
    document.getElementById("saved").innerHTML= savedTime;
    }
});

/*Meteor.methods({
  

});*/


//NEWTIMERBUTTON
Template.counter.events({

    'click .count': function(){

          var h1 = document.getElementsByTagName('h3') [0];  
          var start = document.getElementById('start'); 
          var stop = document.getElementById('stop');
          var clear = document.getElementById('clear');
   
          var seconds = 0;
          var minutes = 0;
          var hours = 0;
          var t;
    

      function add() {
          // starting up counter and looping math
           seconds++;
         if (seconds >= 60) {
              seconds = 0;
              minutes++;
              if (minutes >= 60) {
                  minutes = 0;
                  hours++;
              }
          }
          //render to screen
          h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    
              function timer() {
                  // timeinterval
                  t = setTimeout(add, 1000);
                  v = t;
                  /*console.log(v);*/
              }  
              //now (repeat/loop) timeinterval 
              timer();
          }
    /*    function starter() {
            var start = document.getElementById('start');
            console.log(start);
            console.log(hours)
          }*/
    /*    starter();*/
        add();
    },    
    'click .stop': function(){
        var h1 = document.getElementsByTagName('h3') [0];  
        clearTimeout(v);
        console.log("You have stopped the time.")
        console.log(h1.textContent)
        //Time stopped and saved
        var TimeObject = h1.textContent;
        var numbutton = document.getElementsByTagName('BUTTON') [1];
        
        console.log(numbutton);


        var ok ="1"
        document.getElementById(ok).innerHTML= TimeObject;
        document.getElementById("2").innerHTML= TimeObject;

}
});


//TIMER (hiddenfornow)
/*Template.counter.events({
'click .count2': function(){
  console.log("butt");
  var OurList = PlayersList.find().fetch().length;
  console.log(OurList);
  }
});*/



//BUTTON FOR CLIENTS
Template.people.events({
    'click .client': function(){
   /* var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    /*console.log("You clicked something2");*/
    /*console.log(selectedPlayer);*/

    //find selected id
    //then update player old status on click
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
    console.log(selectedPlayer)
    return  PlayersList.update(selectedPlayer, {$set: {old: "true"} });

    },
     'click .Oldclient': function(){
   /* var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    /*console.log("You clicked something2");*/
    /*console.log(selectedPlayer);*/

    //find selected id
    //then update player old status on click
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
    console.log(selectedPlayer)
    var deleteUs = selectedPlayer;
    return  PlayersList.update(selectedPlayer, {$set: {old: "false"} });
    }, 
    'click .deleteMe': function(){
      var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
    console.log(selectedPlayer)
    var deleteUs = selectedPlayer;
    console.log("this player needs to be deleted " + deleteUs );
    PlayersList.remove(deleteUs);
    }, 
    'click .test': function(){
          var timer = new Timer()
    timer.on('time', function (time) {
      console.log('Current time: ' + time + 'ms')
    })
    timer.start()
    setInterval(timer.emitTime.bind(timer), 1000)
    }




    /*,*/
   /* 'click .readme': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');
      var url = "/admin/" + selectedPlayer 
      console.log("hello");
      window.open(url,'_blank')*/
      /*'toolbar=NO', 'scrollbars=yes', 'resizable=yes', 'top=500', 'left=500', 'width=400', 'height=400'*/
    /*}*/
}); 



Template.people.helpers({
    'player': function(){
      return PlayersList.find()
    },
    'selectedClass': function(){
      // code goes here
      /*var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');*/
      var playerAge = this.old 
      var Age = "true" 
        if(playerAge == Age){
        return "selected" 
        } 
     
    }
});





//BUTTON FOR CLIENTS
Template.people2.events({
    'click .client': function(){
   /* var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    /*console.log("You clicked something2");*/
    /*console.log(selectedPlayer);*/

    //find selected id
    //then update player old status on click
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
    console.log(selectedPlayer)
    return  PlayersList.update(selectedPlayer, {$set: {old: "true"} });

    },
     'click .Oldclient': function(){
   /* var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    /*console.log("You clicked something2");*/
    /*console.log(selectedPlayer);*/

    //find selected id
    //then update player old status on click
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
    console.log(selectedPlayer)
    var deleteUs = selectedPlayer;
    return  PlayersList.update(selectedPlayer, {$set: {old: "false"} });
    }, 
    'click .deleteMe': function(){
      var playerId = this._id;
    Session.set('selectedPlayer', playerId);
    var selectedPlayer = Session.get('selectedPlayer');
    console.log(selectedPlayer)
    var deleteUs = selectedPlayer;
    console.log("this player needs to be deleted " + deleteUs );
    PlayersList.remove(deleteUs);
    }, 
    'click .test': function(){
          var timer = new Timer()
    timer.on('time', function (time) {
      console.log('Current time: ' + time + 'ms')
    })
    timer.start()
    setInterval(timer.emitTime.bind(timer), 1000)
    }




    /*,*/
   /* 'click .readme': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');
      var url = "/admin/" + selectedPlayer 
      console.log("hello");
      window.open(url,'_blank')*/
      /*'toolbar=NO', 'scrollbars=yes', 'resizable=yes', 'top=500', 'left=500', 'width=400', 'height=400'*/
    /*}*/
}); 



Template.people2.helpers({
    'player': function(){
      return PlayersList.find()
    },
    'selectedClass': function(){
      // code goes here
      /*var playerId = this._id;
      Session.set('selectedPlayer', playerId);
      var selectedPlayer = Session.get('selectedPlayer');*/
      var playerAge = this.old 
      var Age = "true" 
        if(playerAge == Age){
        return "selected" 
        } 
     
    }
});


















}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup


    
  });
}





    //ROUTERS ADDED BELOW 

    Router.route('/', function () {
      this.render('home');
    });
     Router.route('/admin', function () {
      this.render('admin');
    });
     Router.route('/adminwp', function () {
      this.render('adminwp');
    });
      Router.route('/home', function () {
      this.render('home');
    });
     //CUSTOM PAGES BASED ON MONGO IDS 
     Router.route('/admin/:_id', function () {
      this.render('admin');
    });





