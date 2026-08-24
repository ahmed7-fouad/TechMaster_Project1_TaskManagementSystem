type AccountInformationProps = {
  user: {
    name: string
    position: string
    email: string
    MemberSince: string
  }
}
const AccountInformation = ({ user }: AccountInformationProps) => {

  return (
    <section className="w-full h-full mt-6">

      <h3 className="text-[18px] font-bold">Account Information</h3>

      <div className="w-full bg-white dark:bg-[#1f2937] shadow-md dark:shadow-black/30 rounded-lg p-6 border-2 border-[#e5e7eb] dark:border-gray-700 mt-6 flex items-center gap-4">

        <div className="flex flex-col gap-6 w-full">

          <div className="flex justify-between items-center border-b border-[#e5e7eb] dark:border-gray-700 pb-2">
            <p className="text-[#6B7280] dark:text-gray-400 text-[14px]">Full Name</p>
            <p className="text-[14px] font-semibold">{user.name}</p>
          </div>
          {/* email */}
          <div className="flex justify-between items-center border-b border-[#e5e7eb] dark:border-gray-700 pb-2">
            <p className="text-[#6B7280] dark:text-gray-400 text-[14px]">Email</p>
            <p className="text-[14px] font-semibold">{user.email}</p>
          </div>
          {/* position */}
          <div className="flex justify-between items-center border-b border-[#e5e7eb] dark:border-gray-700 pb-2">
            <p className="text-[#6B7280] dark:text-gray-400 text-[14px]">Position</p>
            <p className="text-[14px] font-semibold">{user.position}</p>
          </div>
          {/* Member Since */}
          <div className="flex justify-between items-center  pb-2">
            <p className="text-[#6B7280] dark:text-gray-400 text-[14px]">Member Since</p>
            <p className="text-[14px] font-semibold">{user.MemberSince}</p>
          </div>
          
            
        

        </div>
      </div>
      
    </section>
  )
}

export default AccountInformation
