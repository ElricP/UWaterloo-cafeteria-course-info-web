/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *	Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 *  Updated 2017-07-12.
 */
	
"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = 'f9e8b65879d9ecf936f85a27141a1d0d';
var endpointUrl;

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this._observers = [];
			this._info = []
			this.subject = "";
			this.catalog_number = "";
			this.title ="";
			this.description = "";

			/*this.updateModel = function(subject, catalog_number,title,description) {
                            this.subject = subject;
                            this.catalog_number = catalog_number;
                            this.title = title;
                            this.description = description;
                            this.notify();
                            return null;
             }*/
		}

        // You can add attributes / functions here to store the data

        // Call this function to retrieve data from a UW API endpoint
        loadData() {
            var that = this;
            var apiPre = "https://api.uwaterloo.ca/v2/courses/";
            var subject =  document.getElementById('subject').value;
            var courseNumber =  document.getElementById('courseNumber').value;
           endpointUrl = apiPre + subject + "/" + courseNumber;
            $.getJSON(endpointUrl + ".json?key=" + apiKey,
                function (data) {
                    // Do something with the data; probably store it
                    // in the Model to be later read by the View.
                    // Use that (instead of this) to refer to the instance 
                    // of AppModel inside this function.

                    that.subject = data.data.subject;
                     that.catalog_number = data.data.catalog_number;
                     that.title = data.data.title;
                     that.description = data.data.description;
                    that.notify(); // Notify View(s)
                }
            );
        }


		//AddobserverfunctionalitytoAppModelobjects:
        //Addanobservertothelist
        addObserver(observer){
        this._observers.push(observer);
        observer.updateView(this,null);
        }

        //Notifyalltheobserversonthelist
        notify(args){
        _.forEach(this._observers,function(obs){
        obs.updateView(this,args);
        });
        }

    }


    /*
     * A view class.
     * model:  the model we're observing
     * div:  the HTML div where the content goes
     */
    class AppView {
		constructor(model, div) {
			this.model = model;
			this.div = div;
			model.addObserver(this); // Add this View as an Observer
		}
		
        updateView(obs, args) {
            // Add code here to update the View
            if(typeof this.model.subject === 'undefined'){
               $(this.div).html("<h2>Course not found</h2>");
            }else{
            $(this.div).html("<h2>Course Name: " + this.model.subject + this.model.catalog_number+"</h2>"
             +"<h2>Description: </h2><p>" + this.model.description + "</p>");
            }
        };        
    }


	/*
		Function that will be called to start the app.
		Complete it with any additional initialization.
	*/
    exports.startApp = function() {

        document.getElementById('spinner').style.display = 'block';
        var model = new AppModel();
        var view = new AppView(model, "div#viewContent");
        model.loadData();
        document.getElementById('spinner').style.display = 'none';
    }


})(window);

  $(document).ready(function(){
    $('#search').click(function(){
        startApp();
    });

    $('#back').click(function(){
            window.location.href = "login.html";
        });

    });
    $(function() {
        $("#userName").append("Hello! " + localStorage.getItem("userName"));
    });
