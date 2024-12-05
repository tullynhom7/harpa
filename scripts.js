if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js")
		.then(serviceWorker => {
			console.log("Service Worker registered: ", serviceWorker);
		})
		.catch(error => {
			console.error("Error registering the Service Worker: ", error);
		});
}

// navigator.serviceWorker.onmessage = event => {
// 	const message = JSON.parse(event.data);

// 	// detect the type of message and refresh the view
// 	if(message && message.type.includes("/api/users")){
// 		console.log("List of attendees to date", message.data)
// 		renderAttendees(message.data)
// 	}
// };


// ***** Install PWA on device with button *****

let deferredPrompt;
const installButton = document.getElementById("install_button");

window.addEventListener("beforeinstallprompt", e => {
	console.log("beforeinstallprompt fired");
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Show the install button
	// installButton.hidden = false;
	installButton.style.display = "grid";
	installButton.addEventListener("click", installApp);
});

function installApp() {
	// Show the prompt
	deferredPrompt.prompt();
	installButton.disabled = true;

	// Wait for the user to respond to the prompt
	deferredPrompt.userChoice.then(choiceResult => {
		if (choiceResult.outcome === "accepted") {
			console.log("PWA setup accepted");
			// installButton.hidden = true;
			installButton.style.display = "none";
		} else {
			console.log("PWA setup rejected");
		}
		installButton.disabled = false;
		deferredPrompt = null;
	});
}

window.addEventListener("appinstalled", evt => {
	console.log("appinstalled fired", evt);
});


// ********* Background Sync *************

// Get Permissions
function registerNotification() {
	Notification.requestPermission(permission => {
		if (permission === 'granted') {
			registerBackgroundSync()
		} else console.error("Permission was not granted.")
	})
}

function registerBackgroundSync() {
	if (!navigator.serviceWorker) {
		return console.error("Service Worker not supported")
	}

	navigator.serviceWorker.ready
		.then(registration => registration.sync.register('syncAttendees'))
		.then(() => console.log("Registered background sync"))
		.catch(err => console.error("Error registering background sync", err))
}