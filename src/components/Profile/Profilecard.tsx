import { useState } from "react"
import avter from "../../assets/avter.png"

type User = {
  name: string
  position: string
  email: string
}

type ProfilecardProps = {
  user: User
  onSave: (user: User) => void
}

const Profilecard = ({ user, onSave }: ProfilecardProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draftUser, setDraftUser] = useState(user)

  const updateDraft = (field: keyof User, value: string) => {
    setDraftUser((currentUser) => ({ ...currentUser, [field]: value }))
  }

  const startEditing = () => {
    setDraftUser(user)
    setIsEditing(true)
  }

  const saveUser = () => {
    onSave(draftUser)
    setIsEditing(false)
  }

  return (
    <div className="w-full bg-white dark:bg-[#1f2937] shadow-md dark:shadow-black/30 rounded-lg p-4 sm:p-6 border-2 border-[#e5e7eb] dark:border-gray-700 mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      {/* image */}
      <figure className="relative border-2 border-[#e5e7eb] dark:border-gray-600 rounded-full p-1 w-24 h-24 sm:w-28 sm:h-28 shrink-0">
        <img src={avter} alt="Profile" className="w-full h-full rounded-full object-cover" />
        <div className="absolute right-0 bottom-0 bg-green-500 border-2 border-white rounded-full w-4 h-4"></div>
      </figure>

      <div className="flex flex-col gap-1 w-full min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {isEditing ? (
            <input
              value={draftUser.name}
              onChange={(event) => updateDraft("name", event.target.value)}
              className="border border-[#d1d5db] dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md px-2 py-1 text-[20px] font-bold w-full sm:w-auto"
              aria-label="Full name"
            />
          ) : (
            <h3 className="text-[20px] font-bold break-words">{user.name}</h3>
          )}
          <span className="bg-[#dcfce7] text-[12px] font-semibold rounded-md p-1.5 dark:text-black">Online</span>
        </div>

        {isEditing ? (
          <>
            <input
              value={draftUser.position}
              onChange={(event) => updateDraft("position", event.target.value)}
              className="border border-[#d1d5db] dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md px-2 py-1 text-[14px] w-full"
              aria-label="Position"
            />
            <input
              value={draftUser.email}
              onChange={(event) => updateDraft("email", event.target.value)}
              className="border border-[#d1d5db] dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md px-2 py-1 text-[14px] w-full"
              type="email"
              aria-label="Email address"
            />
          </>
        ) : (
          <>
            <p className="text-[#6B7280] dark:text-gray-400 text-[14px] break-words">{user.position}</p>
            <p className="text-[#6B7280] dark:text-gray-400 text-[14px] break-all">{user.email}</p>
          </>
        )}

        {isEditing ? (
          <div className="flex flex-wrap gap-2 mt-2">
            <button type="button" onClick={saveUser} className="bg-[#6366F1] text-white px-3 py-2 rounded-md hover:bg-[#6365f1a4] transition duration-300 cursor-pointer">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="border border-[#d1d5db] dark:border-gray-600 dark:text-gray-100 px-3 py-2 rounded-md hover:bg-[#f3f4f6] dark:hover:bg-gray-700 transition duration-300 cursor-pointer">Cancel</button>
          </div>
        ) : (
          <button type="button" onClick={startEditing} className="bg-[#6366F1] text-white px-3 py-2 rounded-md mt-2 hover:bg-[#6365f1a4] transition duration-300 cursor-pointer w-fit">Edit Profile</button>
        )}
      </div>
    </div>
  )
}

export default Profilecard
