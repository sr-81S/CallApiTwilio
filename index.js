const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require('twilio');
const cors = require('cors');

const router = require("./src/router");

// Create Express webapp
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(router);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 5000;


// just test for call logs data
const accountSid = 'AC9190dc423fd5c18383777fa9525652b6';
const authToken = '615dda233aba345c9a3a2f8c987a1973';
const client = twilio(accountSid, authToken);


app.get('/get-all-logs', async (req, res)=>{
  try {
    const callLogs = await client.calls.list(); // Fetch call logs from Twilio
    res.json( callLogs );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching call logs' });
  }
})





// get all call reccord from twilio

app.get('/get-call-recording', async (req, res) => {
  try {
    const recordings = await client.recordings.list();

    const recordingUrls = recordings.map(recording => {
      return recording.uri.replace('.json', '.mp3');
    });


    res.json(recordingUrls)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching call recordings' });
  }
});



app.get('/get-All-Call-Recording-And-Call-Logs',async(req, res)=>{
  try {
    // Fetch call logs and call recordings
    const callLogs = await client.calls.list();
    const callRecordings = await client.recordings.list();

    // Create a mapping of CallSid to call recordings
    const callRecordingsMap = {};
    callRecordings.forEach(recording => {
      callRecordingsMap[recording.callSid] = recording;
    });

    // Match call logs with their respective recordings
    const callsWithData = callLogs.map(call => {
      const recording = callRecordingsMap[call.parentCallSid] || "not Data";
      // recording.uri.replace('.json', '.mp3');
      return { call, recording };
    });

    res.json( callsWithData );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while extracting call recordings' });
  }
})


server.listen(port, function () {
  console.log("Express server running on *:" + port);
});
