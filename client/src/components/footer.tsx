

const links = [
    {
        title: 'Features',
        href: '#Features',
    },
    {
        title: 'Home',
        href: '#Home',
    },
      {
        title: 'Team',
        href: '#Team',
    },
  {
        title: 'About',
        href: '#About',
    },
]




export  function FooterSection() {
    return (
        <footer className="bg-muted py-16 w-full">
            <div className="mx-auto max-w-5xl px-6">
                <a
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                </a>

                <div className="my-8 flex flex-wrap justify-center gap-6">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </a>
                    ))}
                </div>
           
                <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} VisionSense, All rights reserved</span>
            </div>
        </footer>
    )
}