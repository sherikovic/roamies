import { useUser } from "util/auth-context";

const ProfilePage: React.FC = () => {
  const user = useUser();
  console.log(user);
  return <button>C</button>;
};

export default ProfilePage;
