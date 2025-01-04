import { auth } from "@/auth"
import SearchForm from "@/components/SearchForm"
import StartupCard from "@/components/StartupCard"
import { sanityFetch } from "@/sanity/lib/live"
import { STARTUPS_QUERY } from "@/sanity/lib/queries"

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {
  const query = (await searchParams).query
  const params = { search: query || null }

  const session = await auth()

  console.log(session?.id)

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })

  // console.log(JSON.stringify(posts, null, 2))

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Project, <br /> Connect with Developers
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Projects, and Collaborate with Developers to
          bring your project to life.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Projects"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StatupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No projects found</p>
          )}
        </ul>
      </section>
    </>
  )
}

export default page
