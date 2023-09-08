import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

export default function productDetail(props) {
  const { loadedProduct } = props;

  //check if data loading finished for fallback pages
  //this is not needed if fallback set to 'blocking'
  //if (!loadedProduct) {
  //  return <p>Loading ...</p>;
  //}

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  //this 'params' is not a custom name
  const { params } = context;
  const productId = params.product_id;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  //get an array of id
  const ids = data.products.map((product) => product.id);
  //write ids into forms '{params: {product_id: id}}' so it can be use in paths
  const pathParams = ids.map((id) => ({ params: { product_id: id } }));

  return {
    paths: pathParams,

    //---when fallback set to false
    //server will only pre-rendering pages list in paths
    //other dynamic route pages will not work or have error
    //---when fallback set to true
    //server will render dynanmic route pages which not list in paths
    //when users visit them
    //Dynamic data loading takes time
    //visit pages that does not fully loaded will cause error
    //Solution: Check data loading bafore showing the page
    //see productDetail() above
    //---when fallback set to 'blocking'
    //it automaticlly block page rendering if data is still loading
    //this 'blocking' sometimes takes longer than if() checking
    //so use true or 'blocking' based on needs
    fallback: "blocking",
  };
}
