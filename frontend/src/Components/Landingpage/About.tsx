import arrowDownShort from 'assets/icons/arrow-down-short.svg'
import SVG from 'react-inlinesvg'

export const About = () => {
  return (
    <section className="flex flex-col items-center w-svw h-svh background">
      <div className="flex flex-col flex-1 justify-between items-center w-full h-full mt-80 px-20 max-w-[70vw]">
        <div className="flex flex-col justify-center items-center gap-10">
          <p className="font-drukSuper text-lg lg:text-4xl text-[#ebe7e7] z-10 text-center">
            Turn Solo Travel into Shared Adventures
          </p>
          <p className="poppins-medium text-base lg:text-xl text-[#dfdbdb] z-10 text-center">
            Discover events, meet like-minded travelers, and make plans instantly.
            <br />
            No endless chats—just real connections.
          </p>
        </div>
        <button
          onClick={() => {}} //TODO show a QR code
          className="poppins-semibold text-black lg:text-base cursor-pointer z-10 bg-[#ffa600] hover:bg-[#cf9b3a] px-11 py-4 rounded-full shadow-sm shadow-[#302e2e] mt-20 transition-colors ease-in-out duration-300"
        >
          Get the app
        </button>
        <div className="flex flex-col items-center gap-5 w-full">
          <a
            href="#jump-down"
            className="z-10 mb-5"
            onClick={(e) => {
              e.preventDefault()
              e.currentTarget.scrollIntoView({ behavior: 'auto', block: 'start' })
            }}
          >
            <SVG src={arrowDownShort} className="arrow-down z-30" />
          </a>
        </div>
      </div>
    </section>
  )
}
