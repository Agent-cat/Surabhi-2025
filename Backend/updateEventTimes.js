import mongoose from 'mongoose';
import Event from './models/events.model.js'; // Adjust the path as necessary

const updateEventTimes = async () => {
    await mongoose.connect('mongodb+srv://admin:vishnu%402005@cluster0.cnfu0ri.mongodb.net/surabhi', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const events = await Event.find();

    for (const category of events) {
        for (const evt of category.Events) {
            if (!evt.details.startTime) {
                evt.details.startTime = "09:00"; // Default start time
            }
            if (!evt.details.endTime) {
                evt.details.endTime = "17:00"; // Default end time
            }
        }
        await category.save();
    }

    console.log('Events updated successfully');
    mongoose.disconnect();
};

updateEventTimes().catch(err => console.error(err)); 