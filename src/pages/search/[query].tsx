import { useEffect } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { trpc } from '@utils/trpc';
import { RootLayout } from '@components/layouts';
import { ProductCard } from '@components/ui';
// import { useRouter } from 'next/router';
// import { SearchContext } from '@context/context'
// import { useContext } from 'react'

const SearchPage: React.FC<InferSSR<typeof getServerSideProps>> = ({ query }) => {
  // const router = useRouter();
  const res = trpc.products.search.useQuery({ search: query })
  // const { search } = useContext(SearchContext);
  
  useEffect(() => {
    console.log(res.data);
  }, [res.data]);

  const isNotReady =
    !res.data ||
    res.isLoading ||
    // res.isFetching ||
    // res.isRefetching ||
    !res.isSuccess

  return (
    <RootLayout loading={isNotReady}>
      <div>
        <h1>Results</h1>
        <div className='grid grid-cols-4 container m-auto gap-5'>
          {res.data?.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </RootLayout>
  )
}

/* eslint-disable */
type InferSSR<T extends (...args: any[]) => any> = Awaited<Extract<Awaited<ReturnType<T>>, { props: any }>["props"]>
/* eslint-enable */

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

  const query = ctx.query.query as string;
  if (!query) return { redirect: { destination: '/search/results_0', permanent: false } };

  return {
    props: {
      query
    },
  }
}

export default SearchPage