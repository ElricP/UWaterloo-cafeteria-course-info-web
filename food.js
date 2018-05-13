
var endpointUrl ="https://api.uwaterloo.ca/v2/foodservices/locations.json?key=f9e8b65879d9ecf936f85a27141a1d0d";
//var subject =  document.getElementById('subject').value;
$(document).ready(function(){
    $('#search').click(function(){
        $("#viewContent").html("");
        $.getJSON(endpointUrl,function(d){
        var openOnly = document.getElementById("openOnly").checked;
        d.data.sort(function(a,b){
            return a.building.localeCompare(b.building);
        })
        if(openOnly){
            for(i=0; i<d.data.length; i++){
                if(d.data[i].is_open_now){
                $('#viewContent').append("<p>" +d.data[i].outlet_name + "---Location: " + d.data[i].building+ "</p>");
                }
            }
        }
        else{
            for(i=0; i<d.data.length; i++){
                $('#viewContent').append("<p>" +d.data[i].outlet_name + "---Location: " + d.data[i].building);
                if(d.data[i].is_open_now){
                    $('#viewContent').append(" open</p>");
                }else{
                    $('#viewContent').append(" closed</p>");
                }
            }
        }
        }
        )

    });

    $('#back').click(function(){
            window.location.href = "login.html";
        });

    });

    $(function() {
        $("#userName").append("Hello! " + localStorage.getItem("userName"));
    });