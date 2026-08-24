
import { useEffect } from "react"
import useLocalStorge from "./useLocalStorge"

function useTheme() {
  const [isDarkMode, setIsDarkMode] = useLocalStorge("darkMode", false)

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  return [isDarkMode, setIsDarkMode] as const
}

export default useTheme