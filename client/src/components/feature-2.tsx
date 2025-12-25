interface Feature2Props {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
}

export const Feature2 = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  imageSrc = "https://shadcnblocks.com/images/block/placeholder-1.svg",
  imageAlt = "placeholder hero",
}: Feature2Props) => {
  return (
    <section className="py-32 px-10" id="About">
      <div className="w-full">
        <div className="flex lg:flex-row-reverse md:flex-col flex-col justify-between items-center gap-20">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-96  rounded-md object-cover"
          />
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl">
              {title}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
           
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
