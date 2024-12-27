import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    gender: "",
    names: [{ firstname: "", lastname: "" }],
  });

  const [passwordError, setPasswordError] = useState("");
  const navigate=useNavigate();

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,12}$)/;

  const handleChange = (event, index) => {
    const { name, value, type, checked } = event.target;

    if (type === "radio" || type === "checkbox") {
      setInputs({
        ...inputs,
        [name]: checked ? value : "",
      });
    } else if (name === "firstname" || name === "lastname") {
      const newNames = [...inputs.names];
      newNames[index] = {
        ...newNames[index],
        [name]: value,
      };
      setInputs({
        ...inputs,
        names: newNames,
      });
    } else if (name === "password") {
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be 8-12 characters, contain one uppercase letter and one special character."
        );
      } else {
        setPasswordError("");
      }

      setInputs({
        ...inputs,
        [name]: value,
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordError) {
      console.log("Password is invalid.");
      return;
    }
    setInputs({
      email: "",
      password: "",
      gender: "",
      names: [{ firstname: "", lastname: "" }],
    });
    // navigate("/success")
    navigate("/success", { state: { formData: inputs } });
    console.log(inputs);
  };

  const addNameField = () => {
    setInputs({
      ...inputs,
      names: [...inputs.names, { firstname: "", lastname: "" }],
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6"
      >
        <h4 className="text-2xl font-semibold text-center">Personal Details</h4>

        {inputs.names.map((_, index) => (
          <div key={index} className="pb-3 flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block">Firstname:</label>
              <input
                type="text"
                name="firstname"
                value={inputs.names[index].firstname}
                onChange={(event) => handleChange(event, index)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex-1 mt-4 md:mt-0">
              <label className="block">Lastname:</label>
              <input
                type="text"
                name="lastname"
                value={inputs.names[index].lastname}
                onChange={(event) => handleChange(event, index)}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}

        <div className="pb-3">
          <button
            type="button"
            onClick={addNameField}
            className="text-blue-500 hover:underline"
          >
            Add More
          </button>
        </div>

        <div className="pb-3">
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="pb-3">
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            minLength={8}
            maxLength={12}
            value={inputs.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>

        <div className="pb-3">
          <span>Gender:</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={inputs.gender === "male"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Male</label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={inputs.gender === "female"}
                onChange={handleChange}
                required
                className="mr-2"
              />
              <label>Female</label>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-3">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500  rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

