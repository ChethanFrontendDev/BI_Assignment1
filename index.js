const Event = require("./models/event.models");
const Speakers = require("./models/speakers.models");
const express = require("express");
const app = express();
const { initializeDatabase } = require("./db/db.connect");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

initializeDatabase();

// {
//     "title": "Stand-Up Comedy",
//     "sessionStartDate": "2025-06-30T00:00:00.000Z",
//     "sessionEndDate": "2025-06-30T00:00:00.000Z",
//     "sessionStartTime": "10:00 AM",
//     "sessionEndTime": "2:00 PM",
//     "eventType": "Offline",
//     "image": "https://placehold.co/300x300",
//     "description": "This will be filled very soon.",
//     "host": "Chethan Gowda",
//     "speakers": [
//     {
//       "name": "Alice Johnson",
//       "profession": "Software Engineer"
//     },
//     {
//       "name": "Bob Smith",
//       "profession": "Product Designer"
//     }
//   ],
//     "venue": "2nd Floor, Goplan Arcade, Bengaluru, Karnataka",
//     "eventFee": "$100",
//     "dressCode": "Smart Casual",
//     "ageRestrictions": "18 and above 18+",
//     "eventTags": ["Story Telling", "Stage Fear"]
// }
async function createEvent(eventData) {
  try {
    const newEvent = new Event(eventData);
    const saveEvent = await newEvent.save();
    return saveEvent;
  } catch (error) {
    throw error;
  }
}

app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);

    if (savedEvent) {
      res
        .status(200)
        .json({ message: "Event added successfully", event: savedEvent });
    } else {
      res.status(400).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    // need to know where the error is, because of 500, then write code like error.message
  }
});



async function readAllEvents() {
  try {
    const events = await Event.find().populate("speakers");
    return events;
  } catch (error) {
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const readEvents = await readAllEvents();

    if (readEvents.length !== 0) {
      res.json(readEvents);
    } else {
      res.status(404).json({ error: "Event not found. " });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

async function readEventByQuery(eventQuery) {
  try {
    const readEvent = await Event.find({
      $or: [
        { title: { $regex: eventQuery, $options: "i" } },
        { eventTags: { $regex: eventQuery, $options: "i" } },
      ],
    });
    return readEvent;
  } catch (error) {
    throw error;
  }
}

app.get("/events/:query", async (req, res) => {
  try {
    const response = await readEventByQuery(req.params.query);
    if (response.length !== 0) {
      res.json(response);
    } else {
      res.status(404).json({ error: "Event not found. " });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function readEventsByEventType(eventType) {
  try {
    const readEvents = await Event.find({ eventType: eventType });
    return readEvents;
  } catch (error) {
    throw error;
  }
}

app.get("/events/eventType/:type", async (req, res) => {
  try {
    const response = await readEventsByEventType(req.params.type);
    if (response.length !== 0) {
      res.json(response);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event by event type." });
  }
});

async function readEventById(eventId) {
  try {
    const readEvent = await Event.findById(eventId);
    return readEvent;
  } catch (error) {
    throw error;
  }
}

app.get("/events/id/:eventId", async (req, res) => {
  try {
    const response = await readEventById(req.params.eventId);
    if (response.length !== 0) {
      res.json(response);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ Error: "Failed to fetch Event by Id." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
