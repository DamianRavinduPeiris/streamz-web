import { useSelector } from "react-redux";
export default function ProfilePic() {
  const user = useSelector((state: any) => state.user);

  return (
    <div>
      <div className="avatar m-5">
        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user.profilePic} />
        </div>
      </div>
    </div>
  );
}
