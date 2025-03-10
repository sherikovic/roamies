import { useRef } from 'react'
import descImg3 from 'assets/images/alone-at-dawn.png'

export const Description = () => {
  const container1ref = useRef<HTMLDivElement>(null)
  const container2ref = useRef<HTMLDivElement>(null)
  const container3ref = useRef<HTMLDivElement>(null)
  const img1ref = useRef<HTMLImageElement>(null)
  const text1ref = useRef<HTMLParagraphElement>(null)
  const text2ref = useRef<HTMLParagraphElement>(null)
  const text3ref = useRef<HTMLParagraphElement>(null)

  return (
    <div id="about" className="bg-white py-5 lg:px-32 px-4">
      <div className="flex flex-col justify-center items-center py-4 lg:py-16 gap-4 lg:gap-32">
        <div ref={container1ref} className="relative w-full flex self-start items-center">
          {/* TODO add shadows to the images */}
          <img
            ref={img1ref}
            src={descImg3}
            alt="descImg1"
            className="lg:w-[50%] w-[50vw] h-[600px] rounded sepia-[0.25] brightness-[0.75]"
          />
          {/* TODO slow y translate down the text as you scroll down */}
          <p
            ref={text1ref}
            className="font-drukMedium absolute left-[550px] top-20 text-black text-xs lg:text-3xl w-[42%] z-10"
          >
            There’s a difference between choosing solitude… and feeling alone in a crowd of
            strangers.
          </p>
        </div>
        <div ref={container2ref} className="gap-4 lg:gap-20 flex justify-center items-center">
          <p
            ref={text2ref}
            className="font-drukMedium text-black text-xs lg:text-3xl w-[60%] text-justify"
          >
            Strangers cross paths, but opportunities slip away. You wish there was an easy way to
            find like-minded travelers nearby.
          </p>
          {/* <img ref={img2ref} src={descImg2} alt="descImg2" className="lg:w-full w-[50vw] rounded" /> */}
        </div>
        <div ref={container3ref} className="gap-4 lg:gap-20 flex justify-center items-center">
          <p ref={text3ref} className="font-drukMedium text-black text-xs lg:text-3xl text-center">
            So we created something that does exactly that. To help you find companions and{' '}
            <span className="font-drukSuper text-blue-800">share your journey.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
