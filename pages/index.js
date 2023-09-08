//file system module from node.js
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log('RE - Generating ...');
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    //page will re-generate every 60 sec or slower
    //this only works on build, will not work on dev
    revalidate: 60,

    //this will force user visit 404 when visit this page
    //usually used when data fetch failed to redirect to 404
    //notFound: true

    //this will redirect user to custom routes
    //redirect: {
    //  destination: '/no-data'
    //}
  };
}
