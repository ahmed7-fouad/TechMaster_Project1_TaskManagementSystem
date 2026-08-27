import {
	ArrowRight,
	CalendarDays,
	Clock3,
	Mail,
	MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {

  return (
	<main className="relative flex flex-col min-h-screen w-full items-center justify-center overflow-hidden bg-gray-100 px-3 py-8 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
         
         {/* logo */}

        	<div  className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.04em]">
						<span className="grid h-7 w-7 grid-cols-2 gap-1"> 				
              			<span className="rounded-full bg-[#7C13ED]" />
							<span className="rounded-full bg-[#17181b]" /> 			
              				<span className="rounded-full bg-[#17181b]" />
							<span className="rounded-full bg-[#17181b]" />
						</span>
						<h1 className="text-[35px] font-bold ">Planora</h1>
					</div>

          {/* hero */}

		  <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute left-9 top-10  h-36 w-40 rotate-6 rounded-sm border border-[#f0dc73] bg-[#fff29a] p-5 shadow-[0_14px_18px_rgba(0,0,0,0.12)] sm:block">
 						<span className="absolute -top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#e24747] shadow-[0_1px_3px_rgba(0,0,0,0.35)]" />
						<p className="font-serif text-[12px] italic leading-[1.25] text-[#1d1d1d]">Take notes to keep track of crucial details, and accomplish more tasks with ease.</p>
 					</div>

 				

					<div className="absolute right-8 top-10 hidden w-44 rotate-[9deg] rounded-xl bg-white/90 p-4 shadow-[0_12px_25px_rgba(0,0,0,0.12)] dark:bg-gray-800 sm:block">
 						<p className="text-[13px] font-medium">Reminders</p>
 						<div className="mt-5 rounded-md border border-[#ececec] bg-[#f8f8f8] p-2.5">
							<p className="text-[10px] font-medium dark:text-[#111827]">Today's Meeting</p>
 							<p className="mt-1 text-[8px] text-gray-500">Call with marketing team</p>
 							<div className="mt-3 flex items-center gap-1 text-[8px] text-[#1689ed]"><Clock3 size={10} /> 10:00 - 13:45</div>
						</div>
				</div>

					

 					<section className="relative z-10 mx-auto flex max-w-[700px] flex-col items-center px-5 pt-28 text-center sm:pt-32">
						<div className="mb-6 grid h-16 w-16 grid-cols-2 gap-2 rounded-[18px] bg-white p-4 shadow-[0_12px_24px_rgba(0,0,0,0.12)] sm:mb-7">
 							<span className="rounded-full bg-[#7C13ED]" /><span className="rounded-full bg-[#27282c] dark:bg-[#fff]" />
							<span className="rounded-full bg-[#27282c] dark:bg-[#fff]" /><span className="rounded-full bg-[#27282c] dark:bg-[#fff]" />
 						</div>
						<h1 className="max-w-[680px] px-2 text-[clamp(2.5rem,8vw,4.625rem)] font-normal leading-[1.04] tracking-[-0.065em]">Think, plan, and track <span className="block text-[#a7a7a9]">all in one place</span></h1>
 						<p className="mt-7 text-[13px] text-[#48484d] sm:mt-8 sm:text-[14px] dark:text-[#fff]">Efficiently manage your tasks and boost productivity.</p>
            <Link to="/dashboard" className="cursor-pointer">
 						<button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1689ed] px-6 py-3.5 text-[12px] font-medium text-white shadow-[0_8px_15px_rgba(22,137,237,0.2)] transition hover:bg-[#0879dc]">Get free demo <ArrowRight size={14} /></button>
            </Link>
 					</section>

					<div className="absolute bottom-0 left-8  w-56 -rotate-3 rounded-xl border border-[#dce0e3] bg-[#f4f5f6] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.1)] dark:border-gray-700 dark:bg-gray-800 sm:block sm:bottom-12">
 						<p className="text-[11px] font-medium">Today's tasks</p>
 						<div className="mt-3 space-y-2.5">
							{["New ideas for campaign", "Design PPT #4"].map((task, index) => (
								<div key={task} className="rounded-md bg-white p-2">
									<div className="flex items-center gap-2 text-[8px]"><span className={`grid h-3 w-3 place-items-center rounded-sm text-white ${index ? "bg-[#12b978]" : "bg-[#f04b3d]"}`}>{index + 1}</span>{task}</div>
 									<div className="mt-2 h-1 rounded-full bg-[#e8eaec]"><div className={`h-1 rounded-full bg-[#10b9ef] ${index ? "w-3/4" : "w-1/2"}`} /></div>
								</div>
 							))}
						</div>
					</div>

					<div className="absolute bottom-10 right-8 hidden w-56 rotate-3 rounded-xl border border-[#dce0e3] bg-[#f4f5f6] p-4 shadow-[0_10px_22px_rgba(0,0,0,0.1)] dark:border-gray-700 dark:bg-gray-800 sm:block">
 						<p className="text-[11px] font-medium">100+ Integrations</p>
 						<div className="mt-5 flex items-center justify-center gap-1">
 							<span className="grid h-14 w-14 -rotate-6 place-items-center rounded-xl bg-white shadow-md"><Mail size={29} className="text-[#ea4335]" /></span>
 							<span className="grid h-14 w-14 place-items-center rounded-xl bg-white shadow-md"><MessageCircle size={29} className="text-[#18b88d]" /></span>
 							<span className="grid h-14 w-14 rotate-6 place-items-center rounded-xl bg-white shadow-md"><CalendarDays size={29} className="text-[#3478e5]" /></span>
						</div>
 					</div>
          </div>


 

    </main>
  )
}

export default Home;



