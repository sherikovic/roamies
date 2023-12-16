import { useEffect } from "react";

export const useOutsideAlerter = (ref: any, handleClick: any) => {
    const handleClickOutside = (e: any) => {
        if (ref?.current && !ref.current.contains(e.target)) handleClick()
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })
}
