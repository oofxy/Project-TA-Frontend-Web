import Image from 'next/image';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
     <section className="flex flex-row w-full max-h-screen">
          <Image
            src="/vector.png"
            alt="Vector"
            width={500}
            height={500}
            className="hidden xl:flex w-fit h-screen"
          />
          {children}
        </section>
  )
}

export default layout