import Layout from "../components/Layout";
import AddToProfile from "../components/AddToProfile";

export default () => (
  <Layout>
    <div className="add">
      <AddToProfile />
    </div>
    <style jsx>
      {`
        .add {
          padding: 16px;
        }
      `}
    </style>
  </Layout>
);
