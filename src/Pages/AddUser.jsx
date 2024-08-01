import { useEffect, useState } from "react";
import { Endpoints } from "../apis/constants";
import { instance } from "../apis/request";
import Input from "../components/Input";

const AddUser = (props) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    if (props.editData) {
      setUserData(props.editData);
    }
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prv) => ({
      ...prv,
      [name]: value,
    }));
  };

  const addUser = () => {
    instance
      .post(Endpoints.PostUser, userData)
      .then((res) => {
        console.log("user added succesfully",res.data);
        setUserData("");
        props.closeDialog();
      })
      .catch((err) => console.log(err));
  };

  const updateUSer = (e) => {
    instance
      .put(Endpoints.PostUser+`/${e.id}`, userData)
      .then((res) => {
        console.log("user updated succesfully",res.data);
        setUserData("");
        props.closeDialog();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.editData) {
      updateUSer(props.editData);
    } else {
      addUser();
    }
  };

  return (
    <div>
      <h1 className="mb-3 text-center font-bold text-xl">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
        <Input
          type="text"
          value={userData.first_name}
          onChange={handleChange}
          name="first_name"
          placeholder="Enter Your First Name"
        />
        <Input
          type="text"
          value={userData.last_name}
          onChange={handleChange}
          name="last_name"
          placeholder="Enter Your Last Name"
        />
        <Input
          type="email"
          value={userData.email}
          onChange={handleChange}
          name="email"
          placeholder="Enter Your email"
        />

        <button
          aria-hidden={true}
          type="text"
          className="bg-sky-600 text-white w-64  rounded p-2 "
        >
          {props.editData ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
