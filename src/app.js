$(document).ready(function () {
	var assistant
	var assistantVisible = true
	var menuVisible = false
	var today = new Date()

	function bootstrap() {
		if (document.documentElement.clientWidth > 768) {
			setupClock()
			setupAssistant()
			setupTerminal('#terminal', 470)
			setupEventHandlers()
		} else {
			$('body').prepend('<div id="small-terminal"></div>')
			setupTerminal('#small-terminal', window.innerHeight)
		}
	}

	bootstrap()

	function setupClock() {
		var hours = today.getHours()
		var minutes = today.getMinutes()
		var ampm = "AM"

		// the hour '0' should be '12'
		hours === 0 ? hours = 12 : hours

		if (hours > 12) {
			ampm = "PM"
			hours = hours - 12
		}
		// add 0 when minutes less than 10
		minutes = minutes < 10 ? '0' + minutes : minutes

		$("#time-display").html(hours + ':' + minutes + ' ' + ampm)
	}

	function setupAssistant() {
		clippy.load('Clippy', function (agent) {
			assistant = agent
			assistant.show()
			assistant.speak('Hi, I\'m Andrew\'s assistant, Clippy! To get started, enter a command in the terminal!')
		})
	}

	function setupEventHandlers() {
		var resizeTimer
		// resize event
		$(window).resize(function () {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(function () {
				endClippy()
				$('#small-terminal').remove()
				bootstrap()
			}, 100)
		})

		// ensures start menu is closed
		$('body').on('click', function (e) {
			if (e.target.id !== 'start-btn') {
				$("#start-menu").hide()
				$("#start-btn").attr('src', 'assets/images/start.png')
				menuVisible = false
			}
		})

		// closes all windows
		$('.button-close').on('click', function (e) {
			$(this).parents('div.window').hide()
		})

		// shutdown
		$('#shutdown-btn').on('click', function (e) {
			window.location.href = 'http://google.com/'
		})

		// show command prompt
		$('#cmd-btn').on('click', function () {
			$('#terminal-window').show()
		})

		// show/hide start menu
		$('#start-btn').on('click', function () {
			if (menuVisible) {
				$(this).attr('src', 'assets/images/start.png')
				$("#start-menu").hide()
				menuVisible = false
			} else {
				$(this).attr('src', 'assets/images/startpressed.png')
				$("#start-menu").show()
				menuVisible = true
			}
		})

		// hide/show minesweeper
		$('#minesweeper-btn').on('click', function () {
			$('#minesweeper').show()
		})

		// hide clippy
		$('#hideClippy').on('click', function () {
			endClippy()
		})

		// show clippy
		$('#showClippy').on('click', function () {
			if (!assistantVisible) {
				setupAssistant()
			}
		})

		// Minesweeper events
		// Create IE + others compatible event handler
		var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
		var eventer = window[eventMethod]
		var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"
		eventer(messageEvent, function () {
			$("#minesweeper").hide()
		}, false)

		function endClippy() {
			assistant.stop()
			assistant.closeBalloon()
			assistant.hide()
			assistantVisible = false
		}
	}

	function setupTerminal(el, height) {
		$(el).terminal({
			about: function () {
				this.echo(' ')
				this.echo('Andrew Schneider is a Web Developer, Bitcoin Enthusiast, Music Snob, Aspiring Musician, Photographer, and Dork.')
				this.echo(' ')
				this.echo('<b>Summary</b>', {raw: true})
				this.echo('I\'m a skilled JavaScript developer, proficient in a wide variety of front end frameworks and build systems. My deepest passion lies in building modern, scalable web apps which are beautifully responsive down to that last pixel.')
				this.echo(' ')
				this.echo('I am fascinated with technologies of the future such as blockchain based cryptocurrencies, autonomous transportation and IoT (Internet of Things).')
				this.echo(' ')
				this.echo('Although I possess strong problem solving skills, I firmly believe problems need not always be solved alone. The ability to know who can help you reach a solution, and how they can do it, is one of my greatest skills.')
				this.echo(' ')
				this.echo(' ')
				this.echo('<b>Skills:</b>', {raw: true})
				this.echo(' * <b>Front end</b>: JavaScript, Angular, React', {raw: true})
				this.echo(' * <b>Back end</b>: C#, Java, Node.js', {raw: true})
				this.echo(' * <b>Cloud</b>: Docker, AWS', {raw: true})
				this.echo(' ')
				this.echo(' ')
				this.echo('<h3><a href="../docs/Andrew%20Schneider%20Resume.pdf" target="_blank">Resume</a></h3>', {raw: true})
				this.echo(' ')
			},

			color: function (a) {
				if (a == 'normal') {
					$('#terminal, .cmd').css("background-color", '#000000')
				} else {
					$('#terminal, .cmd').css("background-color", a)
				}
			},

			contact: function () {
				this.echo(' ')
				this.echo('Let\'s connect:')
				this.echo(' ')
				this.echo('LinkedIn: linkedin.com/in/andrewmarkschneider')
				this.echo('Email: andrew.mark.schneider@gmail.com')
				this.echo(' ')
			},

			education: function () {
				this.echo(' ')
				this.echo('I have bachelors degree in Information Systems and a minor in Business Administration from Minnesota State University, Mankato in Mankato, Minnesota.')
				this.echo(' ')
			},

			github: function () {
				window.open('https://github.com/schnogz', '_blank')
			},

			help: function () {
				this.echo(' ')
				this.echo('Available commands:')
				this.echo(' ')
				this.echo('\tabout                    Information about Andrew Schneider')
				this.echo('\tbandcamp                 I support independent music')
				this.echo('\tbitcoin                  Gets the current Bitcoin price')
				this.echo('\tclear                    Clears the terminal')
				this.echo('\tcolor <color>            Change the background color of this terminal')
				this.echo('\tcontact                  Displays ways to contact me')
				this.echo('\teducation                We don\'t need no...')
				this.echo('\tgithub                   My GitHub profile')
				this.echo('\tgoto <url>               Go to a website')
				this.echo('\thelp                     Shows available commands')
				this.echo('\tlastfm                   My last.fm profile')
				this.echo('\tlinkedin                 My LinkedIn profile')
				this.echo('\tprojects                 View my personal projects')
				this.echo(' ')
			},

			goto: function (url) {
				if (typeof url !== "string") {
					this.echo('Invalid url detected. Please try again.')
				} else {
					if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
						window.open(url, '_blank')
					} else {
						window.open('https://' + url, '_blank')
					}
				}
			},

			bandcamp: function () {
				window.open('http://bandcamp.com/andrewmarkschneider', '_blank')
			},

			lastfm: function () {
				window.open('http://www.last.fm/user/aschneid84', '_blank')
			},

			linkedin: function () {
				window.open('http://linkedin.com/in/andrewmarkschneider', '_blank')
			},

			bitcoin: function () {
				var that = this

				function setHeader(xhr) {
					xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
					xhr.setRequestHeader('Content-Type', 'text/plain')
					xhr.setRequestHeader('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT')
					xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description')
				}

				$.ajax({
					url: 'https://api.coinbase.com/v2/prices/BTC-USD/spot',
					type: 'GET',
					dataType: 'json',
					success: function (data) {
						that.echo(' ')
						that.echo('$' + data.data.amount + ' (via coinbase.com)')
						that.echo(' ')
					},
					error: function () {
						that.echo(' ')
						that.echo('Error retrieving price')
						that.echo(' ')
					},
					beforeSend: setHeader
				})
			},

			projects: function () {
				window.open('http://theonist.com/projects/', '_blank')
			}
		}, {
			greetings: [
				'Microsoft(R) Windows DOS',
				'(C) Copyright Andrew Schneider ' + today.getFullYear(),
				'Enter `help` for a list of commands.'
			],
			height: height,
			prompt: 'C:\\> '
		})
	}
})
