const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", (req, res, next) => {
  console.log(req.body);
  res.send("hello world");
});

router.post("/subscribe", (req, res) => {
  // How the request body looks like
  /*
    {
      token: 'someToken',
      team_id: 'T019B94HE78',
      team_domain: 'whatever-qmv6296',
      channel_id: 'C01A7RWR02C',
      channel_name: 'general',
      user_id: 'U019EU35H37',
      user_name: 'yosefalnajjarofficial',
      command: '/subscribe',
      text: 'captur',
      api_app_id: 'A019J1BNN82',
      response_url: 'https://hooks.slack.com/commands/T019B94HE78/1330760643924/mgT9qyFXb131P10LPtoOhdzL',
      trigger_id: '1321488240149.1317310592246.2cdd2dfe4db6eba7ab568223c9296ba6'
    }  
  */
  const { text } = req.body;
  res.send({
    response_type: "in_channel", // to make message visible to everyone
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Success you have subscribed to ${text} notifications*`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "now you will receive notifications in this channel",
        },
      },
    ],
  });
});

router.get("/redirect", async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://slack.com/api/oauth.v2.access?code=" +
        req.query.code +
        "&client_id=" +
        process.env.CLIENT_ID +
        "&client_secret=" +
        process.env.CLIENT_SECRET +
        "&redirect_uri=" +
        process.env.REDIRECT_URI
    );
    res.send("Success!");
    // Successful JSON response
    /*
      {
        ok: true,
        app_id: 'A019J1BNN82',
        authed_user: { id: 'U019JUHLE75' },
        scope: 'chat:write,commands',
        token_type: 'bot',
        access_token: 'xoxb-whatever',
        bot_user_id: 'U019R3X0BEG',
        team: { id: 'T019FKXQ27P', name: 'idk' },
        enterprise: null
      }
    */
  } catch (error) {
    res
      .send("Error encountered: \n" + JSON.stringify(data))
      .status(200)
      .end();
  }
});

module.exports = router;
