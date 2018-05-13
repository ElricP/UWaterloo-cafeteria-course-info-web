"use strict";
  $(document).ready(function(){
    $('#course').click(function(){
        localStorage.setItem("userName", document.getElementById("name").value);
        window.location.href = "index.html";
    });
    $('#food').click(function(){
            localStorage.setItem("userName", document.getElementById("name").value);
            window.location.href = "food.html";
        });

    });
