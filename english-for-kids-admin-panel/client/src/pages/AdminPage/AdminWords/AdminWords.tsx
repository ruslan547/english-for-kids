import { useParams } from 'react-router-dom';
import './AdminWords.scss';

function AdminWords(): JSX.Element {
  const { id } = useParams<{ [key: string]: string }>();
  return (
    <div className="admin-words">
      {id}
    </div>
  );
}

export default AdminWords;
