notes:

StoryEvent -- a story-related, 'triggered' event.
GameEvent -- an internal, 'game' event. aka InternalEvent? MechanicalEvent?
SystemEvent <<-- this is better than GameEvent.

NarrativeEvent vs. SystemEvent
StoryEvent vs. SystemEvent

vs.

all events are of the same type.
'Event'.
-> GameEvent is an implementation of it
-> SystemEvent is another implementation

Some are fired -- some are otherwise triggered.

does anything ~ever~ need to receive a story event?
other story events?