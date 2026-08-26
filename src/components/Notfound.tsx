import React from 'react'
import { Link } from 'react-router-dom'
export default function Notfound() {
  return (
    <section
      className="p-5 flex flex-col items-center  h-screen"
      style={{background:"radial-gradient(circle at 50% 30%, #2e1065 0%, #09090b 70%)"}}>
      <h1 className="text-[23rem] font-extrabold text-secondaryc">404</h1>
      <p className="uppercase text-muted-text text-white text-2xl mb-9">
        Opppps This Page is not found
      </p>
      <Link
        to="/"
        className="py-3 px-7 bg-secondaryc font-bold text-white text-xl capitalize rounded-full hover:bg-thirdc duration-150"
      >
        back to home
      </Link>
    </section>
  );
}
