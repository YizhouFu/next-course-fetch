import path from "path";
//file system module from node.js
import fs from "fs/promises";

export default function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    //page will re-generate every 10 sec or slower
    //this only works on build, will not work on dev
    revalidate: 10
  };
}
