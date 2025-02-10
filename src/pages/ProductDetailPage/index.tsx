import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>{id} Product Detail</h1>
    </div>
  );
};

export default ProductDetailPage;
