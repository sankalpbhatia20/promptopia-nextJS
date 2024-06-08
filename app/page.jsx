import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
              CFA
            <span className="orange_gradient text-center">
              Connect
            </span>
        </h1>
        <p className="text-center desc">
          Volatile Returns? Maybe. Rock Solid Community. Absolutely!
        </p>

        <Feed />
    </section>
  )
}

export default Home