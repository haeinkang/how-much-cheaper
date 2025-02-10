import { useParams } from "react-router-dom";

const FavoritesPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="content">
      <h1>Favorites Page</h1>
    </div>
  );
};

export default FavoritesPage;
