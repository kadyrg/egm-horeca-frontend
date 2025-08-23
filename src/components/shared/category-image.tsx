import Image from "next/image";

function CategoryImage({image, name}:{image:string, name:string}) {
  return (
    <div className="relative bg-zinc-300 aspect-15/5 sm:aspect-15/4 md:aspect-15/3 rounded-md overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl whitespace-nowrap font-bold z-20">
        {name}
      </h1>
      <Image
        width={1920}
        height={384}
        src={image}
        className="aspect-15/5 sm:aspect-15/4 md:aspect-15/3 object-cover"
        alt={name}
      />
    </div>
  )
}
export {CategoryImage}