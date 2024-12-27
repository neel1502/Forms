import { useLocation } from "react-router-dom";

const Show = () => {
  const location = useLocation();
  const { formData } = location.state || {}; // Get the form data from state

  if (!formData) {
    return <div>No data available.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Redirect Successful!</h2>
      <h3 className="mt-4 text-lg font-semibold">Form Data:</h3>
      <div className="mt-2">
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Password:</strong> {formData.password}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <div className="mt-2">
          <strong>Names:</strong>
          {formData.names.map((name, index) => (
            <div key={index}>
              <p>Firstname: {name.firstname}</p>
              <p>Lastname: {name.lastname}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Show;
