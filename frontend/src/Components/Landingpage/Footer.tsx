import SVG from 'react-inlinesvg'
import logo from 'assets/images/icon.svg'
import downloadApp from 'assets/images/download-app.svg'

export default function Footer() {
  return (
    <div className="relative px-32 py-10 bg-off-white flex justify-between items-center">
      <div className="flex gap-40">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-5">
            <SVG src={logo} id="logo-elem" className="logo-large" />
            <p className="poppins-semibold lg:text-lg text-black">2025 Roamies &copy;</p>
          </div>
          <p className="poppins-medium lg:text-base text-black">
            Made with &hearts; from the world
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="/privacy.html"
            className="poppins-medium text-black hover:text-blue-400 transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/privacy.html"
            className="poppins-medium text-black hover:text-blue-400 transition duration-300"
          >
            Terms Of Service
          </a>
          <a
            href="/privacy.html"
            className="poppins-medium text-black hover:text-blue-400 transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <p className="poppins-medium">Get the App</p>
        <img
          src={downloadApp}
          alt="download app"
          className="z-10 w-48 cursor-pointer"
          onClick={() =>
            window.open(
              'https://apps.apple.com/us/app/roamies-adventure-together/id6740840624',
              '_blank',
            )
          }
        />
      </div>
    </div>
  )
}
