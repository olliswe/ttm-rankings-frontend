import { useParams } from "react-router";

const PlayerDetailsPage = () => {
  const { playerIdentifier } = useParams<{ playerIdentifier: string }>();

  return <div>{playerIdentifier}</div>
};

export default PlayerDetailsPage;
