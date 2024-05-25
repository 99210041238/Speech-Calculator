<script>
        let recognition;

        function startSpeechRecognition() {
            document.getElementById('startButton').style.display = 'none';
            document.getElementById('speakButton').style.display = 'block';
            document.getElementById('result').textContent = 'Speak a mathematical expression.';
            document.getElementById('spokenCommand').textContent = '';

            recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';

            recognition.onresult = function (event) {
                const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
                console.log('Transcript:', transcript);

                document.getElementById('spokenCommand').textContent = `Spoken Command: ${transcript}`;

                // Display the result after printing the spoken command
                executeCommand();
            };

            recognition.onerror = function (event) {
                console.error('Speech recognition error:', event.error);
                document.getElementById('result').textContent = 'Speech recognition error. Please try again.';
            };

            recognition.onend = function () {
                console.log('Speech recognition ended.');
            };

            recognition.start();
        }

        function executeCommand() {
            recognition.stop();

            const transcript = document.getElementById('spokenCommand').textContent.replace('Spoken Command: ', '');

            if (transcript.includes('exit')) {
                document.getElementById('result').textContent = 'Exiting the calculator.';
                return;
            }

            // Replace spoken words with mathematical operators
            const expression = transcript
                .replace(/\badd\b/g, '+')
                .replace(/\bsubtract\b/g, '-')
                .replace(/\bmultiply\b/g, '*')
                .replace(/\binto\b/g, '*');

            try {
                const result = eval(expression);
                document.getElementById('result').textContent = `Result: ${result}`;
            } catch (error) {
                document.getElementById('result').textContent = `Error: ${error.message}`;
            }

            document.getElementById('startButton').style.display = 'block';
            document.getElementById('speakButton').style.display = 'none';
        }
    </script>
