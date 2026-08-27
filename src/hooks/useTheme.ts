
import { useEffect } from "react"
import useLocalStorge from "./useLocalStorge"

function useTheme() {
  const [isDarkMode, setIsDarkMode] = useLocalStorge("darkMode", true)

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  return [isDarkMode, setIsDarkMode] as const
}

export default useTheme