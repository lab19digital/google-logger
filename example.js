var log = Logger("Test", {
	id 		: "YOUR_FORM_ID",
	fields 	: {
		threadId : "entry.1156859430",
		level : "entry.1968857214",
		message : "entry.562314269",
		dump : "entry.281204599",
		userAgent : "entry.599629668"
	}
});


// Examples of usage
log.warn("Could not find user id");
log.error("User sent a form without asking");

// Info will log to the console as well
log.info("Just an info message");