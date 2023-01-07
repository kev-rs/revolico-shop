import { type NextPage } from "next";
import { trpc } from "@utils/trpc";
import { RootLayout } from "@layouts";
import { ProductCard, Loader } from "@ui";

const Home: NextPage = () => {
  const res = trpc.products.get.useQuery();

  const isNotReady =
    !res.data ||
    res.isLoading ||
    // res.isFetching ||
    // res.isRefetching ||
    !res.isSuccess

  return (
    <RootLayout loading={isNotReady}>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 container m-auto">
        {
          isNotReady
            ? <Loader amount={10} />
            : res.data.products.map(product => (
              <ProductCard product={product} key={product.id} />
            ))
        }
      </div>
    </RootLayout>
  );
};

export default Home;
