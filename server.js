const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/feature-requests", (req, res) => {
  res.json({
    featureRequests: [
      {
        id: 1,
        title: "Voice-to-Text Note Taking",
        summary:
          "Enable users to create notes using voice-to-text functionality.",
        description:
          "Adding a voice-to-text feature would make it easier for users to quickly jot down their thoughts without needing to type. This would be especially useful for users who are on the go or prefer speaking over typing.",
        tag: "new",
        voteCount: 1,
        dateCreated: new Date("February 22, 2025").getTime(),
      },
    ],
  });
});

app.get("/api/feature-requests/:id", (req, res) => {
  res.json({
    featureRequests: [
      {
        id: 1,
        title: "Voice-to-Text Note Taking",
        summary:
          "Enable users to create notes using voice-to-text functionality.",
        description:
          "Adding a voice-to-text feature would make it easier for users to quickly jot down their thoughts without needing to type. This would be especially useful for users who are on the go or prefer speaking over typing.",
        tag: "new",
        voteCount: 1,
        dateCreated: new Date("February 22, 2025").getTime(),
      },
    ],
  });
});

app.put("/api/feature-requests/:id/upvote", (req, res) => {
  console.log("upvote");
  res.json({
    success: true,
    featureRequest: {
      id: 1,
      title: "Voice-to-Text Note Taking",
      summary:
        "Enable users to create notes using voice-to-text functionality.",
      description:
        "Adding a voice-to-text feature would make it easier for users to quickly jot down their thoughts without needing to type. This would be especially useful for users who are on the go or prefer speaking over typing.",
      tag: "new",
      voteCount: 2,
      dateCreated: new Date("February 22, 2025").getTime(),
    },
  });
});

app.put("/api/feature-requests/:id/downvote", (req, res) => {
  res.json({
    success: true,
    featureRequest: {
      id: 1,
      title: "Voice-to-Text Note Taking",
      summary:
        "Enable users to create notes using voice-to-text functionality.",
      description:
        "Adding a voice-to-text feature would make it easier for users to quickly jot down their thoughts without needing to type. This would be especially useful for users who are on the go or prefer speaking over typing.",
      tag: "new",
      voteCount: 0,
      dateCreated: new Date("February 22, 2025").getTime(),
    },
  });
});

app.post("/api/feature-requests", (req, res) => {
  res.json({
    success: true,
    "feature-request": req.body,
  });
});

app.delete("/api/feature-requests/:id", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
