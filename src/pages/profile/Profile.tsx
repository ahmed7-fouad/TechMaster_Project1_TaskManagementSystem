import AccountInformation from "../../components/Profile/AccountInformation"
import Preferences from "../../components/Profile/Preferences"
import Profilecard from "../../components/Profile/Profilecard"
import useLocalStorge from "../../hooks/useLocalStorge";

type User = {
  name: string
  position: string
  email: string
  postion?: string
  MemberSince: string

}

export const Profile = () => {
  const [storedUser, setUser] = useLocalStorge<User>("user", {
    name: "Ahmed Mohamed",
    position: "Project Manager",
    email: "ahmed@example.com",
    MemberSince: "May 1, 2025",
  })
  const user = {
    ...storedUser,
    position: storedUser.position || storedUser.postion || "Project Manager",
    MemberSince: storedUser.MemberSince || "May 1, 2025",
  }

  return (
    <section className="flex w-full min-h-screen bg-[#f3f4f6] dark:bg-[#111827]">

      <div className="w-full max-w-4xl mx-auto p-4 sm:p-5 lg:p-6 flex flex-col gap-4">

        <Profilecard
          user={user}
          onSave={(updatedUser) => setUser((currentUser) => ({ ...currentUser, ...updatedUser }))}
        />
        <AccountInformation user={user} />
        <Preferences />
      </div>
    </section>
  )
}
