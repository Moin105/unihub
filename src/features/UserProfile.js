import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../thunks/profileThunk';

function UserProfile() {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state);
useEffect(() => {
 console.log("asdas",userProfileData)
}, [])

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (!userProfileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userProfileData.name}</h1>
      <p>{userProfileData.email}</p>
    </div>
  );
}

export default UserProfile;