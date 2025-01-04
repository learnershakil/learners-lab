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
          Class Notes, Project  <br /> Doc&apos;s and More...
        </h1>
        <p className="sub-heading !max-w-3xl">
          Search for projects, notes, and more. Find what you need to get
          started. Explore projects and notes from Learner&apos;s Arc.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Projects & Notes"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StatupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No projects/Notes found</p>
          )}
        </ul>
      </section>
    </>
  )
}

export default page
