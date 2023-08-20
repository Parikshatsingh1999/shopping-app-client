import "./Admin-Profile.css"
import { useSelector } from "react-redux/es/hooks/useSelector"

const AdminProfile = () => {

  const { user } = useSelector(state => state.admin);

  return (
    <div className="profile">
      <form>
        <div className="form-element">
          <label> First Name : </label> <input value={user.firstName} onChange={e => { }} />
        </div>
        <div className="form-element">
          <label> Last Name : </label> <input value={user.lastName} onChange={e => { }} />
        </div>
        <div className="form-element">
          <label> Email : </label> <input disabled value={user.email} onChange={e => { }} />
        </div>
      </form>
    </div>
  )
}

export default AdminProfile
