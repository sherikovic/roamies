import EventPage from 'assets/images/screenshots/event_page.jpeg'
import Dashboard from 'assets/images/screenshots/dashboard.jpeg'
import Comments from 'assets/images/screenshots/comments.jpeg'
import Create from 'assets/images/screenshots/create.png'

export default function Features() {
  return (
    <div className="flex flex-col w-svw gap-32 bg-white px-[80px]">
      <div className="relative flex justify-between items-center">
        <div className="w-full flex justify-center">
          <img src={EventPage} alt="Event page" className="lg:h-[700px] lg:w-[320px]" />
          <img src={Comments} alt="Event page" className="lg:h-[700px] lg:w-[320px]" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <p className="poppins-semibold text-black lg:text-3xl sm:text-lg">
            We made it personal, not just social
          </p>
          <p className="poppins-regular text-black lg:text-xl w-[75%]">
            No endless chats. No lost messages in a sea of conversations. Just direct, personal
            connections. Pick an event, join instantly, and meet people in real life—without the
            small talk holding you back.
          </p>
        </div>
      </div>
      <div className="relative flex justify-between items-center">
        <div className="w-full flex justify-center">
          <img src={Dashboard} alt="Event page" className="lg:h-[700px] lg:w-[320px]" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <p className="poppins-semibold text-black lg:text-3xl sm:text-lg">Plan Less, Do More</p>
          <p className="poppins-regular text-black lg:text-xl w-[75%]">
            All your events and trips in one place—effortlessly managed, so you can focus on the
            experience, not the planning. Whether you&apos;re hosting or joining, everything stays
            clear and simple.
          </p>
        </div>
      </div>
      <div className="relative flex justify-between items-center">
        <div className="w-full flex justify-center">
          <img src={Create} alt="Event page" className="lg:h-[700px]" />
        </div>
        <div className="flex flex-col w-full gap-5">
          <p className="poppins-semibold text-black lg:text-3xl sm:text-lg">
            Pick a time, add the vibe, and you&apos;re set!
          </p>
          <p className="poppins-regular text-black lg:text-xl w-[75%]">
            We wanted Roamies to be more than just another event app. It&apos;s about giving you the
            freedom to shape your own experiences. Whether it&apos;s setting the vibe, choosing the
            details, or deciding who joins in—you&apos;re in control. No rigid plans, no
            restrictions. Just effortless planning, made personal.
          </p>
        </div>
      </div>
    </div>
  )
}
