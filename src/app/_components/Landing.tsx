
import Link from "next/link"

const Landing =  () => {
  return (
    <section className="bg-background lg:grid lg:h-[90vh] lg:place-content-center mb-0">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            You Can Find All
            <strong className="text-primary"> AI Tools </strong>
            Here
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            AI today&apos;s fast-paced digital world, AI tools are revolutionizing the way we work and live. By analyzing vast amounts of data and performing complex tasks with speed and precision, they save us time and effort across various fields—from healthcare to education and entertainment. These smart technologies are no longer a luxury but a necessity, simplifying daily life and unlocking new possibilities for creativity and efficiency. AI is not just the future; it&apos;s the present, making everything easier and smarter.
          </p>

          <div className="mt-4 flex justify-center flex-col sm:flex-row gap-4 sm:mt-6">
            <Link
              className="inline-block rounded border border-primary bg-primary/90 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary"
              href="/tools"
            >
              Get Started
            </Link>

            <Link
              className="inline-block rounded border border-accent px-5 py-3 font-medium text-foreground shadow-sm transition-colors hover:bg-secondary hover:text-gray-900"
              href="/about"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing