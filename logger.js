window.Logger = ( function( $ ){

	"use strict";

	var Handler = function( unique, googleConfig ){
		var inst = new Cls();
		inst.construct( unique, googleConfig );
		return inst;
	}

	var Cls = function(){

		$.extend( this, {

			construct : function( unique, googleConfig ){
				this.store = {
					unique : unique,
					thread : Math.ceil( new Date().getTime() / 1000 ) + "-" + Math.ceil(Math.random() * 100),
					log : [],
					offset : new Date().getTimezoneOffset()
				};

				this.googleConfig = googleConfig;
				this.config();
			},	

			config : function(){
				var self = this;
				this.responseUrl = "https://docs.google.com/forms/d/" + this.googleConfig.id + "/formResponse?";

				this.buildQueryString = function( values ){
					var str = "";
					var y = 0;
					var fields = self.googleConfig.fields;
					for(var x in fields){
						if( y > 0 ){
							str += "&";
						}
						str += fields[x] + "=" + encodeURIComponent( values[x] );
						y++;
					}
					return str;
				}
			},

			log : function( msg, level ){
				this.store.log.push({
					message : msg,
					level : (level || "info").toUpperCase(),
					userAgent : window.navigator ? window.navigator.userAgent : "",
					threadId : this.store.thread,
					dump : ""
				});
				this.put();

				if( window.console && window.console.log && level == "info" ){
					console.log(  level.toUpperCase(), ":", msg );
				}

			},

			get : function(){
				return this.store;
			},

			getLogs : function(){
				return this.store.log;
			},

			error : function( msg ){
				this.log( msg, "error" ); 
			},

			warn : function( msg ){
				this.log( msg, "warn" ); 
			},

			info : function( msg ){
				this.log( msg, "info" ); 
			},

			put : function(){
				var obj = this.store.log[this.store.log.length - 1];
				var putUrl = this.responseUrl + this.buildQueryString( obj );
				var img = $("<img />").attr( "src", putUrl );
				$("body").append( img );
				setTimeout( function(){
					img.remove();
				}, 100 );
			}

		});

	}

	return Handler;


})( jQuery );