import EventsOnMap from 'assets/images/screenshots/events_on_map.jpeg'
import EventPage from 'assets/images/screenshots/event_page.jpeg'
import Dashboard from 'assets/images/screenshots/dashboard.jpeg'
import Create from 'assets/images/screenshots/create.png'

export default function Features() {
  return (
    <section className="flex flex-col w-svw gap-32 bg-[#dfe4e6] px-[80px] pt-40 h-[400vh]">
      <Card
        image={EventsOnMap}
        alt="Events on map"
        headline="Get straight to the action"
        text="We designed Roamies to make joining an event as effortless as possible — no groups, no unnecessary steps. Just scroll through the map, find what's happening near you, and jump right in."
      />
      <Card
        image={EventPage}
        alt="Event page"
        headline="We made it personal, not just social"
        text="No endless chats. No lost messages in a sea of conversations. Just direct, personal connections. Pick an event, join instantly, and meet people in real life—without the small talk holding you back."
      />
      <Card
        image={Dashboard}
        alt="Event page"
        headline="Plan Less, Do More"
        text="All your events and trips in one place—effortlessly managed, so you can focus on the experience, not the planning. Whether you're hosting or joining, everything stays clear and simple."
      />
      <Card
        image={Create}
        alt="Event page"
        headline="Create your own vibe"
        text="Pick a time, add the vibe, and you're set! We wanted Roamies to be more than just another event app. It's about giving you the freedom to shape your own experiences."
      />
    </section>
  )
}

const Card = ({
  image,
  alt,
  headline,
  text,
}: {
  image: string
  alt: string
  headline: string
  text: string
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 lg:p-10 bg-white shadow-xl rounded-2xl flex flex-col lg:flex-row items-center gap-8">
      <div className="w-full lg:w-1/3 flex justify-center">
        <img
          src={image}
          alt={alt}
          className="lg:h-[500px] lg:w-[260px] rounded-xl shadow-md object-cover"
        />
      </div>
      <div className="flex flex-col w-full lg:w-2/3 gap-4">
        <p className="poppins-semibold text-black text-2xl lg:text-3xl">{headline}</p>
        <p className="poppins-regular text-gray-700 text-lg lg:text-xl">{text}</p>
      </div>
    </div>
  )
}
