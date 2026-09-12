import React from 'react'

function Brand() {
  return (
      <section className="bg-black">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 py-10 sm:px-6 lg:flex-nowrap lg:justify-between lg:py-11">
          <span className="font-serif text-2xl font-bold tracking-[0.08em] text-white lg:text-[34px]">
            VERSACE
          </span>
          <span className="font-serif text-2xl tracking-tight text-white lg:text-[31px]">
            ZARA
          </span>
          <span className="font-serif text-2xl tracking-[0.06em] text-white lg:text-[33px]">
            GUCCI
          </span>
          <span className="font-serif text-2xl font-bold tracking-[0.02em] text-white lg:text-[33px]">
            PRADA
          </span>
          <span className="font-serif text-2xl font-light tracking-tight text-white lg:text-[31px]">
            Calvin Klein
          </span>
        </div>
      </section>
  )
}

export default Brand