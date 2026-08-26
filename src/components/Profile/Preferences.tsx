import useTheme from '../../hooks/useTheme'

const Preferences = () => {
  const [isDarkMode, setIsDarkMode] = useTheme()

  return (
    <section className="flex flex-col gap-3 w-full h-full mt-6">
      <h3 className="text-[18px] font-bold">Preferences</h3>

      <div className="w-full shadow-md rounded-lg p-4 sm:p-6 border-2 mt-6 flex flex-col items-center gap-4 dark:bg-gray-800 dark:border-gray-600">
        <div className={`flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center border-b-2 pb-3 w-full ${isDarkMode ? "border-gray-700" : "border-[#e5e7eb]"}`}>
          <p className={`text-[14px] ${isDarkMode ? "text-gray-200" : "text-[#6B7280]"}`}>Theme</p>
          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
            <input
              className="sr-only peer"
              checked={isDarkMode}
              type="checkbox"
              onChange={(event) => setIsDarkMode(event.target.checked)}
            />
            <div
              className="w-14 h-7 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-6 before:w-6 before:top-1/2 before:bg-white before:rounded-full before:left-0.5 before:-translate-y-1/2 before:transition-all before:duration-500 shadow-md shadow-gray-300 peer-checked:shadow-md peer-checked:shadow-gray-500 peer-checked:bg-[#383838] peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-0.5 after:right-0.5 after:translate-y-full after:w-6 after:h-6 after:opacity-0 after:transition-all after:duration-500 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
            ></div>
          </label>
        </div>

        {/* Notifications */}
        <div className={`flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center border-b-2 pb-3 w-full ${isDarkMode ? "border-gray-700" : "border-[#e5e7eb]"}`}>
          <p className={`text-[14px] ${isDarkMode ? "text-gray-200" : "text-[#6B7280]"}`}>Notifications</p>

          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
            <input className="sr-only peer" type="checkbox" />
            <div className="peer relative rounded-full outline-none duration-200 after:duration-300 w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 peer-checked:bg-sky-500 after:content-['OFF'] after:absolute after:outline-none after:rounded-full after:h-6 after:w-6 after:bg-white after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center after:text-[9px] after:text-sky-800 after:font-bold peer-checked:after:translate-x-7 peer-checked:after:content-['ON'] peer-checked:after:border-white"></div>
          </label>
        </div>
      </div>
    </section>
  )
}

export default Preferences
