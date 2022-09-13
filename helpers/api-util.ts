export async function getAllEvents() {
  const reponse = await fetch(
    "https://udemy-nextjs-d0b35-default-rtdb.firebaseio.com/events.json"
  );

  const data = await reponse.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}