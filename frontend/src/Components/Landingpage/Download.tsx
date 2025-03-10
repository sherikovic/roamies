import downloadApp from 'assets/images/download-app.svg'

export default function Download() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
      <p className="poppins-semibold text-black text-center lg:text-4xl mb-4">
        Your next adventure starts here
      </p>
      <p className="poppins-regular text-gray-600 text-center lg:text-lg max-w-md">
        Plan, connect, and explore like never before. Download the app now.
      </p>
      <img
        src={downloadApp}
        alt="Download app"
        className="z-10 w-48 mt-6 cursor-pointer transition-transform hover:scale-105 active:scale-95"
        onClick={() =>
          window.open(
            'https://apps.apple.com/us/app/roamies-adventure-together/id6740840624',
            '_blank',
          )
        }
      />
    </div>
  )
}
