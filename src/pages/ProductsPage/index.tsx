import { useParams } from "react-router-dom";

const ProductsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <div className="sidebar">sidebar</div>
      <div className="content">content</div>
    </>
  );
};

export default ProductsPage;
